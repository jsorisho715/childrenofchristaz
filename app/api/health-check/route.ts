import { NextResponse } from "next/server"

export async function GET() {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {
      environmentVariables: checkEnvironmentVariables(),
      dependencies: checkDependencies(),
      configuration: checkConfiguration(),
    },
  }

  const hasErrors = Object.values(healthCheck.checks).some((check) => !check.status)

  return NextResponse.json(healthCheck, {
    status: hasErrors ? 500 : 200,
  })
}

function checkEnvironmentVariables() {
  const required = ["GOOGLE_SHEETS_PRIVATE_KEY", "GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_SHEETS_SPREADSHEET_ID"]
  const missing = required.filter((key) => !process.env[key])

  return {
    status: missing.length === 0,
    details: {
      required: required.length,
      configured: required.length - missing.length,
      missing: missing,
    },
  }
}

function checkDependencies() {
  try {
    // Check if critical modules can be imported
    require("googleapis")
    require("next")
    require("react")
    return {
      status: true,
      details: "All critical dependencies available",
    }
  } catch (error) {
    return {
      status: false,
      details: `Dependency error: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

function checkConfiguration() {
  const issues = []

  // Check if we're in the right environment
  if (!process.env.NODE_ENV) {
    issues.push("NODE_ENV not set")
  }

  // Check Google Sheets configuration format
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
  if (privateKey && !privateKey.includes("BEGIN PRIVATE KEY")) {
    issues.push("Private key format appears invalid")
  }

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  if (clientEmail && !clientEmail.includes("@") && !clientEmail.includes(".iam.gserviceaccount.com")) {
    issues.push("Client email format appears invalid")
  }

  return {
    status: issues.length === 0,
    details: issues.length === 0 ? "Configuration appears valid" : issues,
  }
}
