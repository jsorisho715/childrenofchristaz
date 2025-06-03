#!/bin/bash

echo "🔍 Pre-Deployment Health Check"
echo "=============================="

# Check if .env.local exists in the right place
if [ -f ".env.local" ]; then
    echo "✅ .env.local found in project root"
else
    echo "❌ .env.local not found in project root"
    if [ -f "app/.env.local" ]; then
        echo "⚠️  Found .env.local in app/ folder - this is incorrect!"
        echo "   Moving to project root..."
        mv app/.env.local .env.local
        echo "✅ Moved .env.local to correct location"
    else
        echo "❌ No .env.local file found anywhere"
        exit 1
    fi
fi

# Check environment variables
echo ""
echo "🔧 Checking Environment Variables..."
if grep -q "GOOGLE_SHEETS_SPREADSHEET_ID" .env.local; then
    echo "✅ GOOGLE_SHEETS_SPREADSHEET_ID found"
else
    echo "❌ GOOGLE_SHEETS_SPREADSHEET_ID missing"
fi

if grep -q "GOOGLE_SHEETS_CLIENT_EMAIL" .env.local; then
    echo "✅ GOOGLE_SHEETS_CLIENT_EMAIL found"
else
    echo "❌ GOOGLE_SHEETS_CLIENT_EMAIL missing"
fi

if grep -q "GOOGLE_SHEETS_PRIVATE_KEY" .env.local; then
    echo "✅ GOOGLE_SHEETS_PRIVATE_KEY found"
else
    echo "❌ GOOGLE_SHEETS_PRIVATE_KEY missing"
fi

# Test build
echo ""
echo "🏗️  Testing Build..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 Pre-deployment check completed successfully!"
echo "💡 Next steps:"
echo "   1. Test locally with 'npm run dev'"
echo "   2. Visit /diagnostics to run full system check"
echo "   3. Deploy to Vercel"
