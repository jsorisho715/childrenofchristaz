# Website Preview Troubleshooting Guide

This comprehensive guide will help you diagnose and resolve website preview issues for the Children of Christ nonprofit website.

## 🔍 Initial Diagnosis Steps

### 1. Check Build Status
First, verify if the build is completing successfully:

\`\`\`bash
# Check build logs in terminal
npm run build

# Look for these common error patterns:
# - TypeScript errors
# - Missing dependencies
# - Environment variable issues
# - Import/export errors
\`\`\`

### 2. Verify Development Server
Test the local development environment:

\`\`\`bash
# Start development server
npm run dev

# Check if server starts on http://localhost:3000
# Look for console errors in browser developer tools
\`\`\`

### 3. Environment Variables Check
Verify all required environment variables are properly configured:

\`\`\`bash
# Check if environment variables are loaded
node -e "console.log(process.env.GOOGLE_SHEETS_PRIVATE_KEY ? 'PRIVATE_KEY: Set' : 'PRIVATE_KEY: Missing')"
node -e "console.log(process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? 'CLIENT_EMAIL: Set' : 'CLIENT_EMAIL: Missing')"
node -e "console.log(process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? 'SPREADSHEET_ID: Set' : 'SPREADSHEET_ID: Missing')"
\`\`\`

## 🚨 Common Issues and Solutions

### Issue 1: Build Failures

#### Symptoms:
- Preview fails to load
- Build process stops with errors
- TypeScript compilation errors

#### Diagnosis:
\`\`\`bash
# Run build with verbose output
npm run build -- --verbose

# Check for specific error types:
# 1. TypeScript errors
# 2. Missing imports
# 3. Syntax errors
# 4. Dependency issues
\`\`\`

#### Solutions:
\`\`\`bash
# Fix TypeScript errors
npx tsc --noEmit

# Update dependencies
npm update

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for unused imports
npx eslint . --fix
\`\`\`

### Issue 2: Environment Variable Problems

#### Symptoms:
- Google Sheets integration fails
- Server actions return errors
- Missing configuration warnings

#### Diagnosis:
Create a diagnostic script:

\`\`\`javascript
// scripts/check-env.js
console.log('Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GOOGLE_SHEETS_PRIVATE_KEY:', process.env.GOOGLE_SHEETS_PRIVATE_KEY ? 'Set (length: ' + process.env.GOOGLE_SHEETS_PRIVATE_KEY.length + ')' : 'Missing');
console.log('GOOGLE_SHEETS_CLIENT_EMAIL:', process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? 'Set' : 'Missing');
console.log('GOOGLE_SHEETS_SPREADSHEET_ID:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? 'Set' : 'Missing');

// Test Google Sheets connection
if (process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
  console.log('✅ Google Sheets credentials appear to be configured');
} else {
  console.log('❌ Google Sheets credentials are missing');
}
\`\`\`

Run with: `node scripts/check-env.js`

#### Solutions:
1. **Local Environment (.env.local)**:
\`\`\`env
# Ensure proper formatting
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_private_key_here\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
\`\`\`

2. **Vercel Environment Variables**:
   - Go to Vercel Dashboard > Project > Settings > Environment Variables
   - Ensure all variables are set for Preview, Development, and Production
   - Check that private key includes proper line breaks (\n)

### Issue 3: Import/Export Errors

#### Symptoms:
- Module not found errors
- Cannot resolve module errors
- Unexpected token errors

#### Diagnosis:
\`\`\`bash
# Check import paths
grep -r "from.*@/" . --include="*.tsx" --include="*.ts"

# Verify all imports exist
find . -name "*.tsx" -o -name "*.ts" | xargs grep -l "import.*from" | head -10
\`\`\`

#### Solutions:
\`\`\`typescript
// Fix common import issues

// ❌ Incorrect
import { Button } from "components/ui/button"

// ✅ Correct
import { Button } from "@/components/ui/button"

// ❌ Missing file extension in dynamic imports
const Component = await import("./Component")

// ✅ Correct
const Component = await import("./Component.tsx")
\`\`\`

### Issue 4: Next.js Configuration Issues

#### Symptoms:
- Routing problems
- Static file serving issues
- API route failures

#### Diagnosis:
Check Next.js configuration:

\`\`\`javascript
// next.config.js validation
const nextConfig = {
  // Ensure proper configuration
  experimental: {
    serverActions: true, // Required for server actions
  },
  images: {
    domains: [], // Add any external image domains
  },
}

module.exports = nextConfig
\`\`\`

## 🔧 Vercel-Specific Troubleshooting

### 1. Deployment Logs Analysis

#### Accessing Logs:
1. Go to Vercel Dashboard
2. Select your project
3. Click on the failed deployment
4. Review "Build Logs" and "Function Logs"

#### Common Log Patterns:
\`\`\`bash
# Build failure patterns to look for:
"Error: Cannot find module"
"TypeError: Cannot read property"
"SyntaxError: Unexpected token"
"Error: Environment variable ... is not defined"

# Success patterns:
"✓ Compiled successfully"
"✓ Static pages built"
"✓ Serverless functions built"
\`\`\`

### 2. Preview Environment Configuration

#### Check Preview Settings:
\`\`\`bash
# Verify preview branch settings
# In Vercel Dashboard > Settings > Git
# Ensure preview deployments are enabled
# Check branch protection rules
\`\`\`

#### Environment Variable Scope:
- Ensure variables are set for "Preview" environment
- Check variable names match exactly (case-sensitive)
- Verify no extra spaces in variable names or values

### 3. Function Timeout Issues

#### Symptoms:
- Server actions timeout
- API routes fail with 504 errors
- Google Sheets operations fail

#### Solutions:
\`\`\`javascript
// Add timeout handling to server actions
export async function submitDonation(prevState, formData) {
  try {
    // Add timeout wrapper
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Operation timeout')), 25000)
    );
    
    const operationPromise = appendToDonationSheet(validatedData);
    
    await Promise.race([operationPromise, timeoutPromise]);
    
    return { success: true, message: "Donation submitted successfully" };
  } catch (error) {
    console.error("Donation submission error:", error);
    return { success: false, message: "Submission failed" };
  }
}
\`\`\`

## 🧪 Testing and Validation

### 1. Local Testing Checklist
\`\`\`bash
# Complete local testing sequence
npm run dev          # Start development server
npm run build        # Test production build
npm run start        # Test production server
npm run lint         # Check for linting errors
npm run type-check   # Verify TypeScript
\`\`\`

### 2. Preview Testing Steps
1. **Create Test Branch**:
\`\`\`bash
git checkout -b preview-test
git push origin preview-test
\`\`\`

2. **Monitor Deployment**:
   - Watch Vercel dashboard for deployment status
   - Check build logs for any warnings or errors
   - Verify environment variables are loaded

3. **Functional Testing**:
   - Test navigation on mobile and desktop
   - Submit test forms (donation and application)
   - Verify Google Sheets integration
   - Check image loading and optimization

### 3. Debug Mode Activation
\`\`\`javascript
// Add debug logging to components
const DEBUG = process.env.NODE_ENV === 'development';

export default function DonateSection() {
  if (DEBUG) {
    console.log('DonateSection rendered');
    console.log('Environment:', process.env.NODE_ENV);
  }
  
  // Component code...
}
\`\`\`

## 🛠️ Advanced Troubleshooting

### 1. Network Connectivity Issues

#### Test External Services:
\`\`\`javascript
// Test Google Sheets API connectivity
async function testGoogleSheetsConnection() {
  try {
    const response = await fetch('/api/test-sheets');
    const result = await response.json();
    console.log('Google Sheets test:', result);
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}
\`\`\`

### 2. Memory and Performance Issues

#### Monitor Resource Usage:
\`\`\`javascript
// Add performance monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
  });
}
\`\`\`

### 3. Browser Compatibility Issues

#### Test Across Browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Prevention Strategies

### 1. Pre-deployment Checklist
\`\`\`markdown
- [ ] All environment variables configured
- [ ] Build completes without errors
- [ ] TypeScript compilation successful
- [ ] All tests passing
- [ ] No console errors in development
- [ ] Forms submit successfully
- [ ] Images load correctly
- [ ] Mobile responsiveness verified
\`\`\`

### 2. Automated Testing Setup
\`\`\`javascript
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "npm run type-check && npm run lint && npm run build",
    "preview-test": "npm run test && echo 'Ready for preview deployment'"
  }
}
\`\`\`

### 3. Monitoring and Alerts
- Set up Vercel deployment notifications
- Monitor error rates in production
- Regular health checks for external integrations
- Performance monitoring with Core Web Vitals

## 🆘 Emergency Recovery Steps

If preview is completely broken:

1. **Rollback to Last Working Version**:
\`\`\`bash
git log --oneline -10  # Find last working commit
git checkout <working-commit-hash>
git push origin main --force  # Use with caution
\`\`\`

2. **Create Minimal Test Version**:
\`\`\`bash
# Create a minimal version to test basic functionality
git checkout -b minimal-test
# Remove complex features temporarily
# Test basic page rendering
\`\`\`

3. **Contact Support**:
- Vercel Support: https://vercel.com/help
- Include deployment URL, error messages, and steps to reproduce
- Provide build logs and environment variable configuration (without sensitive data)

## 📞 Getting Help

### Internal Team Communication
- Document all issues and solutions
- Share debugging steps with team members
- Maintain a troubleshooting log

### External Resources
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Google Sheets API Documentation: https://developers.google.com/sheets/api

Remember: Always test changes in a preview environment before deploying to production!
