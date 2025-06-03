"use server"

import { headers } from "next/headers"
import { validateDonationData, appendToDonationSheet } from "@/lib/google-sheets"
import { revalidatePath } from "next/cache"

export interface DonationFormState {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitDonation(prevState: DonationFormState, formData: FormData): Promise<DonationFormState> {
  try {
    // Get client IP address for logging
    const headersList = headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const ipAddress = forwardedFor?.split(",")[0] || realIp || "unknown"

    // Extract form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      sponsorshipTier: formData.get("sponsorshipTier") as string,
      otherAmount: formData.get("otherAmount") as string,
      monthlySponsorship: formData.get("monthlySponsorship") === "true",
      ipAddress,
    }

    // Validate data
    const validatedData = validateDonationData(rawData)

    // Save to Google Sheets
    await appendToDonationSheet(validatedData)

    // Revalidate the page to show updated state
    revalidatePath("/")

    return {
      success: true,
      message:
        "Thank you for your generous donation! You will receive a confirmation email shortly. Your contribution helps us serve families in need.",
    }
  } catch (error) {
    console.error("Donation submission error:", error)

    if (error instanceof Error && error.message.startsWith("Validation failed:")) {
      return {
        success: false,
        message: "Please check your information and try again.",
        errors: {
          form: [error.message.replace("Validation failed: ", "")],
        },
      }
    }

    return {
      success: false,
      message:
        "We apologize, but there was an error processing your donation. Please try again or contact us directly.",
      errors: {
        form: ["An unexpected error occurred. Please try again later."],
      },
    }
  }
}
