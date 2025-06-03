#!/bin/bash

echo "🚀 Vercel Deployment Helper"
echo "=========================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your environment variables first."
    exit 1
fi

echo "🔍 Pre-deployment checks..."

# Run build test
echo "Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Check environment variables
echo "🔧 Checking environment variables..."
if grep -q "GOOGLE_SHEETS_SPREADSHEET_ID=19bWpsxOY_b5hyUo1YugRUOMrNVTQtDICby6fHMvzHog" .env.local; then
    echo "✅ Spreadsheet ID configured"
else
    echo "⚠️  Spreadsheet ID may not be configured correctly"
fi

if grep -q "GOOGLE_SHEETS_CLIENT_EMAIL=sheets-integration@children-of-christ-forms.iam.gserviceaccount.com" .env.local; then
    echo "✅ Client email configured"
else
    echo "⚠️  Client email may not be configured correctly"
fi

if grep -q "GOOGLE_SHEETS_PRIVATE_KEY" .env.local; then
    echo "✅ Private key found"
else
    echo "❌ Private key not found"
fi

echo ""
echo "🎯 Next steps for Vercel deployment:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Add environment variables:"
echo "   - GOOGLE_SHEETS_SPREADSHEET_ID: 19bWpsxOY_b5hyUo1YugRUOMrNVTQtDICby6fHMvzHog"
echo "   - GOOGLE_SHEETS_CLIENT_EMAIL: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com"
echo "   - GOOGLE_SHEETS_PRIVATE_KEY: [your private key from .env.local]"
echo "4. Deploy!"
echo ""
echo "💡 Or use Vercel CLI:"
echo "   vercel --prod"
echo ""
echo "🔗 Helpful links:"
echo "   - Vercel Dashboard: https://vercel.com/dashboard"
echo "   - Environment Variables Guide: https://vercel.com/docs/concepts/projects/environment-variables"
