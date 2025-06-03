import DiagnosticPanel from "@/components/DiagnosticPanel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              System Diagnostics
            </span>
          </h1>
          <p className="text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto mb-6">
            Comprehensive system health check and troubleshooting tools for the Children of Christ website.
          </p>
          <Button asChild variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-900/20">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <DiagnosticPanel />

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gold-600/30">
            <h2 className="text-2xl font-bold text-gold-300 mb-6">Common Issues and Solutions</h2>
            <div className="space-y-6 text-gold-200">
              <div>
                <h3 className="text-lg font-semibold text-gold-400 mb-3">Environment Variables Not Loading</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Ensure .env.local is in the project root directory (not in app/ folder)</li>
                  <li>Restart your development server after making changes</li>
                  <li>Check for typos in variable names</li>
                  <li>Verify private key format includes proper line breaks (\n)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gold-400 mb-3">Google Sheets Integration Failing</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Share your spreadsheet with the service account email</li>
                  <li>Give the service account "Editor" permissions</li>
                  <li>Verify the spreadsheet ID is correct</li>
                  <li>Check that Google Sheets API is enabled in Google Cloud Console</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gold-400 mb-3">Preview/Build Failures</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Run `npm run build` locally to identify build errors</li>
                  <li>Check Vercel deployment logs for specific error messages</li>
                  <li>Ensure all environment variables are set in Vercel project settings</li>
                  <li>Verify all imports and file paths are correct</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
