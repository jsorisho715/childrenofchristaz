import EnvironmentStatus from "@/components/EnvironmentStatus"
import AdminTestPanel from "@/components/AdminTestPanel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function VerifySetupPage() {
  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Setup Verification
            </span>
          </h1>
          <p className="text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto mb-6">
            Verify that your environment variables are properly configured and test the Google Sheets integration.
          </p>
          <Button asChild variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-900/20">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          {/* Environment Variables Status */}
          <EnvironmentStatus />

          {/* Google Sheets Test Panel */}
          <AdminTestPanel />

          {/* Setup Instructions */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gold-600/30">
              <h2 className="text-2xl font-bold text-gold-300 mb-6">Next Steps</h2>
              <div className="space-y-6 text-gold-200">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-3">1. Verify Environment Variables</h3>
                  <p className="mb-3">
                    Check that all environment variables show as "configured" above. If any are missing or invalid:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Go to your Vercel project dashboard</li>
                    <li>Navigate to Settings → Environment Variables</li>
                    <li>Ensure all variables are set for Preview, Development, and Production</li>
                    <li>Check that the private key includes proper line breaks (\n)</li>
                    <li>Verify client email is: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-3">2. Test Google Sheets Integration</h3>
                  <p className="mb-3">
                    Use the "Test Google Sheets Connection" button above to verify the integration works. This will:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Test the connection to Google Sheets API</li>
                    <li>Create the necessary sheets if they don't exist</li>
                    <li>Set up proper column headers</li>
                    <li>Confirm write permissions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-3">3. Test Form Submissions</h3>
                  <p className="mb-3">Once the Google Sheets test passes, test the actual forms:</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-gold-600 hover:bg-gold-700 text-black">
                      <Link href="/#donate">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Test Donation Form
                      </Link>
                    </Button>
                    <Button asChild className="bg-gold-600 hover:bg-gold-700 text-black">
                      <Link href="/#apply">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Test Application Form
                      </Link>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-3">4. Verify Data in Google Sheets</h3>
                  <p className="mb-3">After testing forms, check your Google Spreadsheet to confirm:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Data appears in the "Donations" and "Applications" sheets</li>
                    <li>All form fields are properly captured</li>
                    <li>Timestamps and IP addresses are recorded</li>
                    <li>No data is missing or corrupted</li>
                  </ul>
                </div>

                <div className="bg-gold-900/20 border border-gold-600/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gold-300 mb-2">🔧 Troubleshooting Tips</h4>
                  <ul className="text-sm space-y-1">
                    <li>• If environment variables show as "missing", redeploy your Vercel project</li>
                    <li>• If Google Sheets test fails, check the service account permissions</li>
                    <li>• If forms don't submit, check the browser console for JavaScript errors</li>
                    <li>• If data doesn't appear in sheets, verify the spreadsheet ID is correct</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
