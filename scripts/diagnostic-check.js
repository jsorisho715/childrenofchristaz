#!/usr/bin/env node

/**
 * Comprehensive diagnostic script for Children of Christ website
 * Run with: node scripts/diagnostic-check.js
 */

const fs = require("fs")
const path = require("path")

console.log("🔍 Children of Christ Website Diagnostic Check\n")

// Check 1: Environment Variables
console.log("1. Environment Variables Check:")
const requiredEnvVars = ["GOOGLE_SHEETS_PRIVATE_KEY", "GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_SHEETS_SPREADSHEET_ID"]

let envIssues = 0
requiredEnvVars.forEach((varName) => {
  const value = process.env[varName]
  if (value) {
    console.log(`   ✅ ${varName}: Set (${value.length} characters)`)
  } else {
    console.log(`   ❌ ${varName}: Missing`)
    envIssues++
  }
})

if (envIssues === 0) {
  console.log("   🎉 All environment variables are configured!\n")
} else {
  console.log(`   ⚠️  ${envIssues} environment variable(s) missing\n`)
}

// Check 2: File Structure
console.log("2. File Structure Check:")
const criticalFiles = [
  "package.json",
  "next.config.mjs",
  "tailwind.config.js",
  "app/layout.tsx",
  "app/page.tsx",
  "app/globals.css",
  "components/Navigation.tsx",
  "components/HeroSection.tsx",
  "components/DonateSection.tsx",
  "components/ApplySection.tsx",
  "lib/google-sheets.ts",
]

let fileIssues = 0
criticalFiles.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${filePath}: Found`)
  } else {
    console.log(`   ❌ ${filePath}: Missing`)
    fileIssues++
  }
})

if (fileIssues === 0) {
  console.log("   🎉 All critical files are present!\n")
} else {
  console.log(`   ⚠️  ${fileIssues} critical file(s) missing\n`)
}

// Check 3: Package.json Dependencies
console.log("3. Dependencies Check:")
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
  const requiredDeps = ["next", "react", "react-dom", "tailwindcss", "googleapis", "lucide-react"]

  let depIssues = 0
  requiredDeps.forEach((dep) => {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      console.log(`   ✅ ${dep}: Installed`)
    } else {
      console.log(`   ❌ ${dep}: Missing`)
      depIssues++
    }
  })

  if (depIssues === 0) {
    console.log("   🎉 All required dependencies are installed!\n")
  } else {
    console.log(`   ⚠️  ${depIssues} required dependencies missing\n`)
  }
} catch (error) {
  console.log("   ❌ Error reading package.json:", error.message, "\n")
}

// Check 4: TypeScript Configuration
console.log("4. TypeScript Configuration Check:")
try {
  if (fs.existsSync("tsconfig.json")) {
    const tsConfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"))
    console.log("   ✅ tsconfig.json: Found")

    // Check for important compiler options
    const compilerOptions = tsConfig.compilerOptions || {}
    const importantOptions = ["strict", "esModuleInterop", "skipLibCheck"]

    importantOptions.forEach((option) => {
      if (compilerOptions[option]) {
        console.log(`   ✅ ${option}: Enabled`)
      } else {
        console.log(`   ⚠️  ${option}: Not set`)
      }
    })
  } else {
    console.log("   ❌ tsconfig.json: Missing")
  }
  console.log("")
} catch (error) {
  console.log("   ❌ Error reading tsconfig.json:", error.message, "\n")
}

// Check 5: Next.js Configuration
console.log("5. Next.js Configuration Check:")
try {
  if (fs.existsSync("next.config.mjs")) {
    console.log("   ✅ next.config.mjs: Found")
  } else if (fs.existsSync("next.config.js")) {
    console.log("   ✅ next.config.js: Found")
  } else {
    console.log("   ⚠️  next.config: Using defaults")
  }
  console.log("")
} catch (error) {
  console.log("   ❌ Error checking Next.js config:", error.message, "\n")
}

// Check 6: Public Assets
console.log("6. Public Assets Check:")
const requiredAssets = [
  "public/background_jesus_gold.jpg",
  "public/btc_donation_qr.png",
  "public/assistance-application-form.pdf",
]

let assetIssues = 0
requiredAssets.forEach((assetPath) => {
  if (fs.existsSync(assetPath)) {
    const stats = fs.statSync(assetPath)
    console.log(`   ✅ ${assetPath}: Found (${Math.round(stats.size / 1024)}KB)`)
  } else {
    console.log(`   ❌ ${assetPath}: Missing`)
    assetIssues++
  }
})

if (assetIssues === 0) {
  console.log("   🎉 All required assets are present!\n")
} else {
  console.log(`   ⚠️  ${assetIssues} required asset(s) missing\n`)
}

// Summary
console.log("📊 Diagnostic Summary:")
const totalIssues = envIssues + fileIssues + assetIssues

if (totalIssues === 0) {
  console.log("   🎉 No issues detected! Your project should preview correctly.")
  console.log("   💡 If you're still having preview issues, check:")
  console.log("      - Vercel deployment logs")
  console.log("      - Browser console for JavaScript errors")
  console.log("      - Network connectivity to external services")
} else {
  console.log(`   ⚠️  ${totalIssues} issue(s) detected that may prevent preview from working.`)
  console.log("   🔧 Please address the issues above and run this diagnostic again.")
}

console.log("\n🚀 Next Steps:")
console.log("   1. Fix any issues identified above")
console.log('   2. Run "npm run build" to test local build')
console.log('   3. Run "npm run dev" to test development server')
console.log("   4. Deploy to Vercel and check deployment logs")
console.log("   5. Test preview URL functionality")

// Test Google Sheets connection if environment variables are present
if (envIssues === 0) {
  console.log("\n🔗 Testing Google Sheets Connection...")
  testGoogleSheetsConnection()
}

async function testGoogleSheetsConnection() {
  try {
    // Basic validation of Google Sheets credentials
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (privateKey && privateKey.includes("BEGIN PRIVATE KEY")) {
      console.log("   ✅ Private key format appears correct")
    } else {
      console.log("   ❌ Private key format may be incorrect")
    }

    if (clientEmail && clientEmail === "sheets-integration@children-of-christ-forms.iam.gserviceaccount.com") {
      console.log("   ✅ Client email matches expected service account")
    } else if (clientEmail && clientEmail.includes("@") && clientEmail.includes(".iam.gserviceaccount.com")) {
      console.log("   ⚠️  Client email format appears correct but doesn't match expected service account")
      console.log(`   Expected: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com`)
      console.log(`   Found: ${clientEmail}`)
    } else {
      console.log("   ❌ Client email format may be incorrect")
      console.log("   Expected: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com")
    }

    if (spreadsheetId && spreadsheetId.length > 20) {
      console.log("   ✅ Spreadsheet ID format appears correct")
    } else {
      console.log("   ❌ Spreadsheet ID format may be incorrect")
    }

    console.log("   💡 Run the admin panel test for full Google Sheets validation")
  } catch (error) {
    console.log("   ❌ Error testing Google Sheets connection:", error.message)
  }
}
