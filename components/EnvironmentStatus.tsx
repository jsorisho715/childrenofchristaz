"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EnvStatus {
  name: string
  status: "configured" | "missing" | "invalid"
  details?: string
}

export default function EnvironmentStatus() {
  const [envStatuses, setEnvStatuses] = useState<EnvStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkEnvironmentVariables = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/check-environment")
      const data = await response.json()
      setEnvStatuses(data.statuses)
      setLastChecked(new Date())
    } catch (error) {
      console.error("Failed to check environment variables:", error)
      setEnvStatuses([
        { name: "GOOGLE_SHEETS_PRIVATE_KEY", status: "missing", details: "Unable to verify" },
        { name: "GOOGLE_SHEETS_CLIENT_EMAIL", status: "missing", details: "Unable to verify" },
        { name: "GOOGLE_SHEETS_SPREADSHEET_ID", status: "missing", details: "Unable to verify" },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkEnvironmentVariables()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "configured":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "missing":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      case "invalid":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "configured":
        return "border-green-500 bg-green-900/20"
      case "missing":
        return "border-red-500 bg-red-900/20"
      case "invalid":
        return "border-yellow-500 bg-yellow-900/20"
      default:
        return "border-gray-500 bg-gray-900/20"
    }
  }

  const allConfigured = envStatuses.every((env) => env.status === "configured")

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-gold-600/30">
      <CardHeader>
        <CardTitle className="text-gold-300 flex items-center justify-between">
          Environment Variables Status
          <Button
            onClick={checkEnvironmentVariables}
            disabled={loading}
            variant="outline"
            size="sm"
            className="border-gold-500 text-gold-400 hover:bg-gold-900/20"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
        </CardTitle>
        <CardDescription className="text-gold-400">
          Current status of required environment variables for Google Sheets integration.
          {lastChecked && (
            <span className="block text-sm text-gold-500 mt-1">Last checked: {lastChecked.toLocaleTimeString()}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-gold-400" />
            <span className="ml-2 text-gold-300">Checking environment variables...</span>
          </div>
        ) : (
          <>
            {envStatuses.map((env) => (
              <Alert key={env.name} className={getStatusColor(env.status)}>
                {getStatusIcon(env.status)}
                <AlertDescription className="text-white">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{env.name}</span>
                    <span className="text-sm capitalize">{env.status}</span>
                  </div>
                  {env.details && <p className="text-sm mt-1 opacity-80">{env.details}</p>}
                </AlertDescription>
              </Alert>
            ))}

            <div className="mt-6 p-4 rounded-lg bg-black/50 border border-gold-600/30">
              {allConfigured ? (
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-green-300 mb-2">All Set! 🎉</h3>
                  <p className="text-green-200 text-sm">
                    All environment variables are properly configured. Your Google Sheets integration should work
                    correctly.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-yellow-300 mb-2">Configuration Needed</h3>
                  <p className="text-yellow-200 text-sm">
                    Some environment variables need attention. Please check the Vercel project settings and ensure all
                    variables are properly configured.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
