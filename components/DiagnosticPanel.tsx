"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, RefreshCw, Bug, ExternalLink } from "lucide-react"
import Link from "next/link"

interface HealthCheck {
  status: string
  timestamp: string
  environment: string
  checks: {
    environmentVariables: {
      status: boolean
      details: {
        required: number
        configured: number
        missing: string[]
      }
    }
    dependencies: {
      status: boolean
      details: string
    }
    configuration: {
      status: boolean
      details: string | string[]
    }
  }
}

export default function DiagnosticPanel() {
  const [healthData, setHealthData] = useState<HealthCheck | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/health-check")
      const data = await response.json()
      setHealthData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run diagnostics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-5 w-5 text-green-400" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-400" />
    )
  }

  const getStatusColor = (status: boolean) => {
    return status ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-gold-600/30">
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-gold-400" />
          <span className="ml-2 text-gold-300">Running diagnostics...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-red-600/30">
        <CardContent className="py-8">
          <Alert className="border-red-500 bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              <div className="flex justify-between items-center">
                <span>Diagnostic check failed: {error}</span>
                <Button onClick={runDiagnostics} size="sm" variant="outline" className="border-red-500 text-red-400">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!healthData) return null

  const allHealthy = Object.values(healthData.checks).every((check) => check.status)

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900 border-gold-600/30">
      <CardHeader>
        <CardTitle className="text-gold-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5" />
            System Diagnostics
          </div>
          <Button
            onClick={runDiagnostics}
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
          Comprehensive system health check and configuration validation.
          <span className="block text-sm text-gold-500 mt-1">
            Last checked: {new Date(healthData.timestamp).toLocaleString()}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Status */}
        <Alert className={allHealthy ? "border-green-500 bg-green-900/20" : "border-yellow-500 bg-yellow-900/20"}>
          {allHealthy ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          )}
          <AlertDescription className={allHealthy ? "text-green-300" : "text-yellow-300"}>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {allHealthy ? "All systems operational" : "Issues detected - see details below"}
              </span>
              <span className="text-sm">Environment: {healthData.environment}</span>
            </div>
          </AlertDescription>
        </Alert>

        {/* Environment Variables Check */}
        <div>
          <h3 className="text-lg font-semibold text-gold-300 mb-3">Environment Variables</h3>
          <Alert className={getStatusColor(healthData.checks.environmentVariables.status)}>
            {getStatusIcon(healthData.checks.environmentVariables.status)}
            <AlertDescription className="text-white">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Configuration Status</span>
                  <span className="text-sm">
                    {healthData.checks.environmentVariables.details.configured}/
                    {healthData.checks.environmentVariables.details.required} configured
                  </span>
                </div>
                {healthData.checks.environmentVariables.details.missing.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Missing variables:</p>
                    <ul className="text-sm list-disc list-inside ml-4">
                      {healthData.checks.environmentVariables.details.missing.map((variable) => (
                        <li key={variable}>{variable}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Dependencies Check */}
        <div>
          <h3 className="text-lg font-semibold text-gold-300 mb-3">Dependencies</h3>
          <Alert className={getStatusColor(healthData.checks.dependencies.status)}>
            {getStatusIcon(healthData.checks.dependencies.status)}
            <AlertDescription className="text-white">
              <div className="flex justify-between items-center">
                <span className="font-medium">Dependency Status</span>
                <span className="text-sm">{healthData.checks.dependencies.details}</span>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Configuration Check */}
        <div>
          <h3 className="text-lg font-semibold text-gold-300 mb-3">Configuration</h3>
          <Alert className={getStatusColor(healthData.checks.configuration.status)}>
            {getStatusIcon(healthData.checks.configuration.status)}
            <AlertDescription className="text-white">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Configuration Validation</span>
                </div>
                {Array.isArray(healthData.checks.configuration.details) ? (
                  <ul className="text-sm list-disc list-inside">
                    {healthData.checks.configuration.details.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">{healthData.checks.configuration.details}</p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gold-600/30 pt-6">
          <h3 className="text-lg font-semibold text-gold-300 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button asChild className="bg-gold-600 hover:bg-gold-700 text-black">
              <Link href="/verify-setup">
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Setup Verification
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-900/20">
              <Link href="/api/test-sheets" target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Test Google Sheets
              </Link>
            </Button>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        {!allHealthy && (
          <div className="bg-gold-900/20 border border-gold-600/50 rounded-lg p-4">
            <h4 className="font-semibold text-gold-300 mb-3">🔧 Troubleshooting Tips</h4>
            <ul className="text-sm text-gold-200 space-y-2">
              <li>• Ensure .env.local file is in the project root (not in app/ folder)</li>
              <li>• Verify all environment variables are properly formatted</li>
              <li>• Check that Google Sheets service account has access to your spreadsheet</li>
              <li>• Restart your development server after changing environment variables</li>
              <li>• For Vercel deployments, ensure environment variables are set in project settings</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
