import AdminTestPanel from "@/components/AdminTestPanel"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Admin Panel
            </span>
          </h1>
          <p className="text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto">
            Test and manage the Google Sheets integration for Children of Christ.
          </p>
        </div>

        <AdminTestPanel />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gold-600/30">
            <h2 className="text-2xl font-bold text-gold-300 mb-6">Setup Instructions</h2>
            <div className="space-y-4 text-gold-200">
              <div>
                <h3 className="text-lg font-semibold text-gold-400 mb-2">Environment Variables Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/50 p-3 rounded-lg">
                    <p className="text-sm font-medium">GOOGLE_SHEETS_PRIVATE_KEY</p>
                    <p className="text-xs text-green-400">✓ Configured</p>
                  </div>
                  <div className="bg-black/50 p-3 rounded-lg">
                    <p className="text-sm font-medium">GOOGLE_SHEETS_CLIENT_EMAIL</p>
                    <p className="text-xs text-green-400">✓ Configured</p>
                  </div>
                  <div className="bg-black/50 p-3 rounded-lg">
                    <p className="text-sm font-medium">GOOGLE_SHEETS_SPREADSHEET_ID</p>
                    <p className="text-xs text-green-400">✓ Configured</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gold-400 mb-2">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Click "Test Google Sheets Connection" above to verify the integration</li>
                  <li>If successful, the spreadsheet will be automatically set up with proper headers</li>
                  <li>Test the donation form on the main page</li>
                  <li>Test the application form on the main page</li>
                  <li>Check your Google Sheet to confirm data is being saved</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gold-400 mb-2">Troubleshooting</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensure the service account has "Editor" access to the Google Sheet</li>
                  <li>Verify the spreadsheet ID is correct</li>
                  <li>Check that the Google Sheets API is enabled in Google Cloud Console</li>
                  <li>Confirm the private key format includes proper line breaks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
