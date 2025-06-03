"use server"

import { headers } from "next/headers"
import { validateApplicationData, appendToApplicationSheet } from "@/lib/google-sheets"
import { revalidatePath } from "next/cache"

export interface ApplicationFormState {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitApplication(
  prevState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  try {
    // Get client IP address for logging
    const headersList = await headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const ipAddress = forwardedFor?.split(",")[0] || realIp || "unknown"

    // Extract form data
    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      adults: formData.get("adults") as string,
      children: formData.get("children") as string,
      childrenAges: formData.get("childrenAges") as string,
      monthlyIncome: formData.get("monthlyIncome") as string,
      incomeSource: formData.get("incomeSource") as string,
      governmentAssistance: formData.get("governmentAssistance") as string,
      needDescription: formData.get("needDescription") as string,
      intendedUse: formData.get("intendedUse") as string,
      ipAddress,
    }

    // Validate data
    const validatedData = validateApplicationData(rawData)

    // Save to Google Sheets
    await appendToApplicationSheet(validatedData)

    // Revalidate the page to show updated state
    revalidatePath("/")

    return {
      success: true,
      message:
        "Thank you for your application! We have received your request and will review it carefully. If you qualify for assistance, we will contact you within 5-7 business days.",
    }
  } catch (error) {
    console.error("Application submission error:", error)

    if (error instanceof Error && error.message.startsWith("Validation failed:")) {
      // Parse validation errors into field-level errors
      const errorMessage = error.message.replace("Validation failed: ", "")
      const errors: Record<string, string[]> = {}
      
      // Split error message into individual errors
      const errorParts = errorMessage.split(", ")
      
      // Map errors to their respective fields
      errorParts.forEach((part) => {
        if (part.includes("Full name")) {
          errors.fullName = [part]
        } else if (part.includes("email")) {
          errors.email = [part]
        } else if (part.includes("phone")) {
          errors.phone = [part]
        } else if (part.includes("address")) {
          errors.address = [part]
        } else if (part.includes("adults")) {
          errors.adults = [part]
        } else if (part.includes("children")) {
          errors.children = [part]
        } else if (part.includes("childrenAges")) {
          errors.childrenAges = [part]
        } else if (part.includes("monthly income")) {
          errors.monthlyIncome = [part]
        } else if (part.includes("income source")) {
          errors.incomeSource = [part]
        } else if (part.includes("Government assistance")) {
          errors.governmentAssistance = [part]
        } else if (part.includes("Description of need")) {
          errors.needDescription = [part]
        } else if (part.includes("Intended use")) {
          errors.intendedUse = [part]
        }
      })

      return {
        success: false,
        message: "Please check the highlighted fields below and try again.",
        errors,
      }
    }

    return {
      success: false,
      message:
        "We apologize, but there was an error processing your application. Please try again or contact us directly.",
      errors: {
        form: ["An unexpected error occurred. Please try again later."],
      },
    }
  }
}
