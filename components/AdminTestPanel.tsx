"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, TestTube } from "lucide-react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function AdminTestPanel() {
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
    error?: string
  } | null>(null)
  const [testing, setTesting] = useState(false)

  const testGoogleSheetsConnection = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-sheets")
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: "Failed to test Google Sheets connection",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-gold-600/30">
      <div className="mb-4 text-center">
        <Button asChild variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-900/20">
          <Link href="/verify-setup">
            <ExternalLink className="w-4 h-4 mr-2" />
            Go to Setup Verification Page
          </Link>
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-gold-300 flex items-center gap-2">
          <TestTube className="w-5 h-5" />
          Google Sheets Integration Test
        </CardTitle>
        <CardDescription className="text-gold-400">
          Test the connection to Google Sheets and initialize the spreadsheet structure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={testGoogleSheetsConnection}
          disabled={testing}
          className="w-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-black font-bold"
        >
          {testing ? "Testing Connection..." : "Test Google Sheets Connection"}
        </Button>

        {testResult && (
          <Alert
            className={`${testResult.success ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"}`}
          >
            {testResult.success ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400" />
            )}
            <AlertDescription className={testResult.success ? "text-green-300" : "text-red-300"}>
              <div>
                <p className="font-medium">{testResult.message}</p>
                {testResult.error && <p className="text-sm mt-1">Error: {testResult.error}</p>}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-gold-400 space-y-2">
          <p>
            <strong>What this test does:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Verifies Google Sheets API connection</li>
            <li>Creates "Donations" and "Applications" sheets if they don't exist</li>
            <li>Sets up proper column headers</li>
            <li>Confirms write permissions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
