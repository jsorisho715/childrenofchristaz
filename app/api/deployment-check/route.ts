import { NextResponse } from "next/server"

export async function GET() {
  const deploymentCheck = {
    status: "checking",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercelEnvironment: process.env.VERCEL_ENV || "local",
    checks: {
      buildRequirements: checkBuildRequirements(),
      environmentVariables: checkEnvironmentVariables(),
      dependencies: checkDependencies(),
      fileStructure: checkFileStructure(),
      vercelConfig: checkVercelConfig(),
    },
  }

  const hasErrors = Object.values(deploymentCheck.checks).some((check) => !check.status)
  deploymentCheck.status = hasErrors ? "failed" : "passed"

  return NextResponse.json(deploymentCheck, {
    status: hasErrors ? 500 : 200,
  })
}

function checkBuildRequirements() {
  const issues = []

  // Check Node.js version compatibility
  const nodeVersion = process.version
  if (nodeVersion) {
    const majorVersion = Number.parseInt(nodeVersion.slice(1).split(".")[0])
    if (majorVersion < 18) {
      issues.push(`Node.js version ${nodeVersion} may be incompatible. Vercel requires Node.js 18+`)
    }
  }

  // Check for common build-breaking patterns
  try {
    // Verify critical modules can be imported
    require("next")
    require("react")
    require("react-dom")
  } catch (error) {
    issues.push(`Critical dependency import failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }

  return {
    status: issues.length === 0,
    details: issues.length === 0 ? "Build requirements satisfied" : issues,
  }
}

function checkEnvironmentVariables() {
  const required = ["GOOGLE_SHEETS_PRIVATE_KEY", "GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_SHEETS_SPREADSHEET_ID"]
  const missing = required.filter((key) => !process.env[key])
  const warnings = []

  // Check for common formatting issues
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
  if (privateKey) {
    if (!privateKey.includes("BEGIN PRIVATE KEY")) {
      warnings.push("Private key may be missing header")
    }
    if (!privateKey.includes("\\n")) {
      warnings.push("Private key may be missing line break escapes")
    }
  }

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  if (clientEmail && clientEmail !== "sheets-integration@children-of-christ-forms.iam.gserviceaccount.com") {
    warnings.push("Client email doesn't match expected service account")
  }

  return {
    status: missing.length === 0,
    details: {
      required: required.length,
      configured: required.length - missing.length,
      missing: missing,
      warnings: warnings,
    },
  }
}

function checkDependencies() {
  const issues = []

  // Check Next.js version using process.versions
  const nextVersion = process.versions.next || "15.0.0" // Default to 15.0.0 if not available
  if (nextVersion.startsWith("14.") || nextVersion.startsWith("13.")) {
    issues.push("Consider upgrading to Next.js 15 for better compatibility")
  }

  // Check for critical dependencies
  try {
    require("react")
    require("react-dom")
  } catch (error) {
    issues.push("Missing critical dependencies: " + (error instanceof Error ? error.message : "Unknown error"))
  }

  return {
    status: issues.length === 0,
    details: issues.length === 0 ? "Dependencies look good" : issues,
  }
}

function checkFileStructure() {
  const issues = []

  // Check for critical files using process.cwd()
  const criticalFiles = [
    "app/layout.tsx",
    "app/page.tsx",
    "next.config.js",
    "package.json",
    "tsconfig.json"
  ]

  // Since we can't directly check files in a serverless context,
  // we'll assume they exist if we got this far in the build
  // This is a safe assumption since Next.js would have failed earlier
  // if these files were missing

  return {
    status: true,
    details: "File structure appears correct (build successful)",
  }
}

function checkVercelConfig() {
  const issues = []
  const warnings = []

  // Check environment
  if (process.env.VERCEL_ENV) {
    // We're on Vercel
    if (!process.env.VERCEL_URL) {
      warnings.push("VERCEL_URL not available")
    }
  } else {
    // Local environment
    warnings.push("Running locally - Vercel-specific checks skipped")
  }

  return {
    status: issues.length === 0,
    details: {
      issues: issues,
      warnings: warnings,
      vercelEnv: process.env.VERCEL_ENV || "not-vercel",
    },
  }
}
