# Post-Deployment Verification Guide

Now that your environment variables have been added to Vercel, follow these steps to verify everything is working correctly.

## 🚀 Immediate Steps

### 1. Trigger a New Deployment
Since environment variables were just added, you need to trigger a new deployment for them to take effect:

\`\`\`bash
# Option 1: Push a small change
git commit --allow-empty -m "trigger deployment for env vars"
git push origin main

# Option 2: Redeploy from Vercel Dashboard
# Go to Vercel Dashboard > Deployments > Click "Redeploy" on latest deployment
\`\`\`

### 2. Access the Verification Page
Once the new deployment is complete:
1. Go to your preview URL
2. Navigate to `/verify-setup` (or use the link in the footer)
3. Check the environment variable status

## 🔍 Verification Checklist

### ✅ Environment Variables
- [ ] All three variables show as "configured"
- [ ] Private key format is valid
- [ ] Client email is: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com
- [ ] Spreadsheet ID is properly set

### ✅ Google Sheets Integration
- [ ] "Test Google Sheets Connection" passes
- [ ] Sheets are created automatically
- [ ] Headers are set up correctly
- [ ] No permission errors

### ✅ Form Functionality
- [ ] Donation form submits successfully
- [ ] Application form submits successfully
- [ ] Success messages appear
- [ ] No JavaScript errors in console

### ✅ Data Verification
- [ ] Data appears in Google Sheets
- [ ] All form fields are captured
- [ ] Timestamps are correct
- [ ] IP addresses are recorded

## 🐛 Common Issues and Solutions

### Issue: Environment Variables Show as "Missing"
**Solution:**
1. Verify variables are set in Vercel Dashboard
2. Ensure they're enabled for "Preview" environment
3. Trigger a new deployment
4. Wait 2-3 minutes for propagation

### Issue: Google Sheets Test Fails
**Possible Causes:**
- Service account doesn't have access to the spreadsheet
- Private key format is incorrect
- Spreadsheet ID is wrong
- Wrong service account email

**Solution:**
1. Share your Google Sheet with the service account email: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com
2. Give it "Editor" permissions
3. Verify the private key includes `\n` line breaks
4. Double-check the spreadsheet ID from the URL
5. Ensure the client email environment variable matches exactly: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com

### Issue: Forms Submit but No Data in Sheets
**Solution:**
1. Check browser console for errors
2. Verify the spreadsheet has "Donations" and "Applications" sheets
3. Test the Google Sheets connection first
4. Check Vercel function logs for errors

## 📊 Testing Procedure

### 1. Environment Check
\`\`\`bash
# Visit your preview URL
https://your-preview-url.vercel.app/verify-setup

# Check that all environment variables show as "configured"
\`\`\`

### 2. Google Sheets Test
\`\`\`bash
# Click "Test Google Sheets Connection"
# Should see: "Google Sheets integration is working correctly"
\`\`\`

### 3. Form Testing
\`\`\`bash
# Test donation form with sample data:
Name: Test Donor
Email: test@example.com
Sponsorship: Bronze Sponsor

# Test application form with sample data:
Full Name: Test Applicant
Email: test@example.com
Phone: (555) 123-4567
# ... fill other required fields
\`\`\`

### 4. Data Verification
\`\`\`bash
# Check your Google Spreadsheet
# Should see new rows in "Donations" and "Applications" sheets
# Verify all data is captured correctly
\`\`\`

## 🔧 Troubleshooting Commands

### Check Deployment Status
\`\`\`bash
# In Vercel Dashboard
1. Go to your project
2. Click on latest deployment
3. Check "Build Logs" for any errors
4. Check "Function Logs" for runtime errors
\`\`\`

### Test Locally (if needed)
\`\`\`bash
# Pull latest environment variables
vercel env pull .env.local

# Test locally
npm run dev
# Visit http://localhost:3000/verify-setup
\`\`\`

### Force Redeploy
\`\`\`bash
# If environment variables aren't taking effect
git commit --allow-empty -m "force redeploy"
git push origin main
\`\`\`

## 📈 Success Indicators

You'll know everything is working when:
- ✅ All environment variables show as "configured"
- ✅ Google Sheets test passes
- ✅ Forms submit without errors
- ✅ Data appears in your Google Spreadsheet
- ✅ No console errors in browser
- ✅ Preview URL loads correctly

## 🆘 Getting Help

If you encounter issues:

1. **Check the verification page** at `/verify-setup`
2. **Review Vercel deployment logs** for specific errors
3. **Test locally** with pulled environment variables
4. **Verify Google Sheets permissions** and sharing settings
5. **Check browser console** for JavaScript errors

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs/concepts/projects/environment-variables
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Next.js Server Actions**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions

Remember: Environment variables may take a few minutes to propagate after being added to Vercel. If tests fail immediately, wait 2-3 minutes and try again.
