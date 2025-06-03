#!/bin/bash

# Quick Fix Script for Common Preview Issues
# Run with: chmod +x scripts/quick-fix.sh && ./scripts/quick-fix.sh

echo "🔧 Children of Christ Website Quick Fix Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "1. Clearing cache and reinstalling dependencies..."
rm -rf node_modules
rm -f package-lock.json
npm install

echo "2. Checking for TypeScript errors..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found. Please fix them before proceeding."
    exit 1
fi

echo "3. Running linter..."
npx eslint . --fix

echo "4. Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "5. Checking environment variables..."
if [ -f ".env.local" ]; then
    echo "✅ .env.local file found"
else
    echo "⚠️  .env.local file not found. Creating template..."
    cat > .env.local << EOF
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_CLIENT_EMAIL=sheets-integration@children-of-christ-forms.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_private_key_here\n-----END PRIVATE KEY-----"
EOF
    echo "📝 Please update .env.local with your actual values"
    echo "📧 Service account email should be: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com"
fi

echo "6. Testing development server..."
timeout 10s npm run dev &
DEV_PID=$!
sleep 5

if kill -0 $DEV_PID 2>/dev/null; then
    echo "✅ Development server started successfully"
    kill $DEV_PID
else
    echo "❌ Development server failed to start"
fi

echo ""
echo "🎉 Quick fix completed!"
echo "📋 Next steps:"
echo "   1. Update .env.local with your actual environment variables"
echo "   2. Run 'npm run dev' to test locally"
echo "   3. Deploy to Vercel and check deployment logs"
echo "   4. Test the preview URL"
