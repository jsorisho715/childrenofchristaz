# Vercel Deployment Checklist

Use this checklist before each deployment to ensure successful preview functionality.

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved (`npx tsc --noEmit`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors in development mode
- [ ] All imports/exports are correct

### ✅ Environment Variables
- [ ] All required environment variables are set in Vercel
- [ ] Variables are configured for Preview, Development, and Production
- [ ] Private key format is correct (includes \n line breaks)
- [ ] Client email is set to: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com
- [ ] No trailing spaces in variable names or values
- [ ] Test connection works (`/api/test-sheets`)

### ✅ Assets and Files
- [ ] All required images are present in `/public`
- [ ] PDF files are accessible
- [ ] No missing file references
- [ ] Image sizes are optimized for web

### ✅ Functionality Testing
- [ ] Navigation works on mobile and desktop
- [ ] Forms submit successfully
- [ ] Google Sheets integration works
- [ ] All links are functional
- [ ] Responsive design works across devices

## Deployment Steps

### 1. Local Testing
\`\`\`bash
# Run full test suite
npm run build
npm run start
# Test on http://localhost:3000
\`\`\`

### 2. Push to Repository
\`\`\`bash
git add .
git commit -m "feat: description of changes"
git push origin main
\`\`\`

### 3. Monitor Vercel Deployment
1. Go to Vercel Dashboard
2. Watch deployment progress
3. Check build logs for warnings/errors
4. Verify deployment completes successfully

### 4. Test Preview URL
- [ ] Page loads without errors
- [ ] All sections render correctly
- [ ] Forms are functional
- [ ] Mobile responsiveness works
- [ ] Performance is acceptable

## Troubleshooting Failed Deployments

### Build Failures
1. Check build logs in Vercel dashboard
2. Look for specific error messages
3. Test build locally: `npm run build`
4. Fix errors and redeploy

### Runtime Errors
1. Check function logs in Vercel
2. Test server actions locally
3. Verify environment variables
4. Check external service connectivity

### Performance Issues
1. Run Lighthouse audit
2. Check Core Web Vitals
3. Optimize images if needed
4. Review bundle size

## Post-Deployment Verification

### ✅ Functional Testing
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Donation form submits
- [ ] Application form submits
- [ ] Google Sheets receives data
- [ ] All images display properly

### ✅ Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Mobile performance is good
- [ ] No JavaScript errors in console
- [ ] Forms respond quickly

### ✅ Cross-Browser Testing
- [ ] Chrome (desktop and mobile)
- [ ] Firefox
- [ ] Safari (desktop and mobile)
- [ ] Edge

## Emergency Rollback Procedure

If deployment fails and breaks the site:

1. **Immediate Rollback**:
   - Go to Vercel Dashboard > Deployments
   - Find last working deployment
   - Click "Promote to Production"

2. **Fix and Redeploy**:
   - Identify and fix the issue
   - Test thoroughly locally
   - Deploy again

3. **Communication**:
   - Notify team of the issue
   - Document the problem and solution
   - Update this checklist if needed

## Monitoring and Maintenance

### Daily Checks
- [ ] Site is accessible
- [ ] Forms are working
- [ ] No error alerts from Vercel

### Weekly Checks
- [ ] Performance metrics
- [ ] Google Sheets data integrity
- [ ] Security updates needed

### Monthly Checks
- [ ] Dependency updates
- [ ] Performance optimization
- [ ] Backup verification
- [ ] Analytics review

Remember: Always test in preview before promoting to production!
