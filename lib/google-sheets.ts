import { google } from "googleapis"

// Google Sheets configuration
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n")
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

// Validate environment variables
if (!GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_SPREADSHEET_ID) {
  console.error("Missing required Google Sheets environment variables")
  console.error(
    "Expected GOOGLE_SHEETS_CLIENT_EMAIL: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com",
  )
}

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: GOOGLE_SHEETS_PRIVATE_KEY,
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const sheets = google.sheets({ version: "v4", auth })

// Data validation schemas
export interface DonationData {
  name: string
  email: string
  sponsorshipTier: string
  otherAmount?: string
  monthlySponsorship: boolean
  timestamp: string
  ipAddress?: string
}

export interface ApplicationData {
  fullName: string
  email: string
  phone: string
  address: string
  adults: string
  children: string
  childrenAges: string
  monthlyIncome: string
  incomeSource: string
  governmentAssistance: string
  needDescription: string
  intendedUse: string
  timestamp: string
  ipAddress?: string
}

// Validation functions
export function validateDonationData(data: any): DonationData {
  const errors: string[] = []

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long")
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email address is required")
  }

  if (!data.sponsorshipTier || typeof data.sponsorshipTier !== "string") {
    errors.push("Sponsorship tier is required")
  }

  if (
    data.sponsorshipTier === "other" &&
    (!data.otherAmount || isNaN(Number(data.otherAmount)) || Number(data.otherAmount) <= 0)
  ) {
    errors.push("Valid donation amount is required for other amount")
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`)
  }

  return {
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    sponsorshipTier: data.sponsorshipTier,
    otherAmount: data.otherAmount || "",
    monthlySponsorship: Boolean(data.monthlySponsorship),
    timestamp: new Date().toISOString(),
    ipAddress: data.ipAddress || "",
  }
}

export function validateApplicationData(data: any): ApplicationData {
  const errors: string[] = []

  if (!data.fullName || typeof data.fullName !== "string" || data.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long")
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email address is required")
  }

  if (!data.phone || typeof data.phone !== "string" || data.phone.trim().length < 10) {
    errors.push("Valid phone number is required")
  }

  if (!data.address || typeof data.address !== "string" || data.address.trim().length < 5) {
    errors.push("Complete address is required")
  }

  if (!data.adults || isNaN(Number(data.adults)) || Number(data.adults) < 1) {
    errors.push("Number of adults must be at least 1")
  }

  if (!data.monthlyIncome || typeof data.monthlyIncome !== "string" || data.monthlyIncome.trim().length < 1) {
    errors.push("Monthly income is required")
  }

  if (!data.incomeSource || typeof data.incomeSource !== "string" || data.incomeSource.trim().length < 2) {
    errors.push("Income source is required")
  }

  if (!data.governmentAssistance || !["yes", "no"].includes(data.governmentAssistance)) {
    errors.push("Government assistance status is required")
  }

  if (!data.needDescription || typeof data.needDescription !== "string" || data.needDescription.trim().length < 10) {
    errors.push("Description of need must be at least 10 characters long")
  }

  if (!data.intendedUse || typeof data.intendedUse !== "string" || data.intendedUse.trim().length < 10) {
    errors.push("Intended use description must be at least 10 characters long")
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`)
  }

  return {
    fullName: data.fullName.trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    address: data.address.trim(),
    adults: data.adults,
    children: data.children || "0",
    childrenAges: data.childrenAges?.trim() || "",
    monthlyIncome: data.monthlyIncome.trim(),
    incomeSource: data.incomeSource.trim(),
    governmentAssistance: data.governmentAssistance,
    needDescription: data.needDescription.trim(),
    intendedUse: data.intendedUse.trim(),
    timestamp: new Date().toISOString(),
    ipAddress: data.ipAddress || "",
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Google Sheets operations
export async function appendToDonationSheet(data: DonationData): Promise<void> {
  try {
    if (!GOOGLE_SHEETS_SPREADSHEET_ID) {
      throw new Error("Google Sheets configuration is missing")
    }

    const values = [
      [
        data.timestamp,
        data.name,
        data.email,
        data.sponsorshipTier,
        data.otherAmount,
        data.monthlySponsorship ? "Yes" : "No",
        data.ipAddress,
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Donations!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    console.log("Successfully saved donation to Google Sheets")
  } catch (error) {
    console.error("Error appending to donation sheet:", error)
    throw new Error("Failed to save donation data")
  }
}

export async function appendToApplicationSheet(data: ApplicationData): Promise<void> {
  try {
    if (!GOOGLE_SHEETS_SPREADSHEET_ID) {
      throw new Error("Google Sheets configuration is missing")
    }

    const values = [
      [
        data.timestamp,
        data.fullName,
        data.email,
        data.phone,
        data.address,
        data.adults,
        data.children,
        data.childrenAges,
        data.monthlyIncome,
        data.incomeSource,
        data.governmentAssistance,
        data.needDescription,
        data.intendedUse,
        data.ipAddress,
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Applications!A:N",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    console.log("Successfully saved application to Google Sheets")
  } catch (error) {
    console.error("Error appending to application sheet:", error)
    throw new Error("Failed to save application data")
  }
}

// Initialize spreadsheet with headers
export async function initializeSpreadsheet(): Promise<void> {
  try {
    if (!GOOGLE_SHEETS_SPREADSHEET_ID) {
      throw new Error("Google Sheets configuration is missing")
    }

    console.log("Initializing Google Sheets...")

    // Check if sheets exist and create headers if needed
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
    })

    const sheetNames = spreadsheet.data.sheets?.map((sheet) => sheet.properties?.title) || []
    console.log("Existing sheets:", sheetNames)

    // Create Donations sheet if it doesn't exist
    if (!sheetNames.includes("Donations")) {
      console.log("Creating Donations sheet...")
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "Donations",
                },
              },
            },
          ],
        },
      })

      // Add headers to Donations sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: "Donations!A1:G1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            ["Timestamp", "Name", "Email", "Sponsorship Tier", "Other Amount", "Monthly Sponsorship", "IP Address"],
          ],
        },
      })
      console.log("Donations sheet created with headers")
    }

    // Create Applications sheet if it doesn't exist
    if (!sheetNames.includes("Applications")) {
      console.log("Creating Applications sheet...")
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "Applications",
                },
              },
            },
          ],
        },
      })

      // Add headers to Applications sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: "Applications!A1:N1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              "Timestamp",
              "Full Name",
              "Email",
              "Phone",
              "Address",
              "Adults",
              "Children",
              "Children Ages",
              "Monthly Income",
              "Income Source",
              "Government Assistance",
              "Need Description",
              "Intended Use",
              "IP Address",
            ],
          ],
        },
      })
      console.log("Applications sheet created with headers")
    }

    console.log("Google Sheets initialization completed successfully")
  } catch (error) {
    console.error("Error initializing spreadsheet:", error)
    throw new Error(`Failed to initialize spreadsheet: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
