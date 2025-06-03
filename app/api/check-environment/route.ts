import { NextResponse } from "next/server"

export async function GET() {
  try {
    const statuses = [
      {
        name: "GOOGLE_SHEETS_PRIVATE_KEY",
        status: checkPrivateKey(),
        details: getPrivateKeyDetails(),
      },
      {
        name: "GOOGLE_SHEETS_CLIENT_EMAIL",
        status: checkClientEmail(),
        details: getClientEmailDetails(),
      },
      {
        name: "GOOGLE_SHEETS_SPREADSHEET_ID",
        status: checkSpreadsheetId(),
        details: getSpreadsheetIdDetails(),
      },
    ]

    return NextResponse.json({
      success: true,
      statuses,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Environment check error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check environment variables",
        statuses: [],
      },
      { status: 500 },
    )
  }
}

function checkPrivateKey(): "configured" | "missing" | "invalid" {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
  if (!privateKey) return "missing"
  if (!privateKey.includes("BEGIN PRIVATE KEY") || !privateKey.includes("END PRIVATE KEY")) {
    return "invalid"
  }
  return "configured"
}

function getPrivateKeyDetails(): string {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
  if (!privateKey) return "Environment variable not set"
  if (!privateKey.includes("BEGIN PRIVATE KEY")) {
    return "Invalid format - missing BEGIN PRIVATE KEY header"
  }
  if (!privateKey.includes("END PRIVATE KEY")) {
    return "Invalid format - missing END PRIVATE KEY footer"
  }
  return `Configured (${privateKey.length} characters)`
}

function checkClientEmail(): "configured" | "missing" | "invalid" {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  if (!clientEmail) return "missing"

  // Check for the specific expected service account email
  if (clientEmail === "sheets-integration@children-of-christ-forms.iam.gserviceaccount.com") {
    return "configured"
  }

  // Check for general service account format
  if (!clientEmail.includes("@") || !clientEmail.includes(".iam.gserviceaccount.com")) {
    return "invalid"
  }

  return "configured"
}

function getClientEmailDetails(): string {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  if (!clientEmail) return "Environment variable not set"

  if (clientEmail === "sheets-integration@children-of-christ-forms.iam.gserviceaccount.com") {
    return `Configured: ${clientEmail} ✅`
  }

  if (!clientEmail.includes("@")) {
    return "Invalid format - missing @ symbol"
  }
  if (!clientEmail.includes(".iam.gserviceaccount.com")) {
    return "Invalid format - should end with .iam.gserviceaccount.com"
  }

  return `Configured: ${clientEmail} (Note: Expected sheets-integration@children-of-christ-forms.iam.gserviceaccount.com)`
}

function checkSpreadsheetId(): "configured" | "missing" | "invalid" {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  if (!spreadsheetId) return "missing"
  if (spreadsheetId.length < 20) {
    return "invalid"
  }
  return "configured"
}

function getSpreadsheetIdDetails(): string {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  if (!spreadsheetId) return "Environment variable not set"
  if (spreadsheetId.length < 20) {
    return "Invalid format - ID too short"
  }
  return `Configured (${spreadsheetId.length} characters)`
}
