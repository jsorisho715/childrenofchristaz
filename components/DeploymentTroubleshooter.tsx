"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, RefreshCw, Upload, ExternalLink, Copy } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface DeploymentCheck {
  status: string
  timestamp: string
  environment: string
  vercelEnvironment: string
  checks: {
    buildRequirements: {
      status: boolean
      details: string | string[]
    }
    environmentVariables: {
      status: boolean
      details: {
        required: number
        configured: number
        missing: string[]
        warnings: string[]
      }
    }
    dependencies: {
      status: boolean
      details: string | string[]
    }
    fileStructure: {
      status: boolean
      details: string | string[]
    }
    vercelConfig: {
      status: boolean
      details: {
        issues: string[]
        warnings: string[]
        vercelEnv: string
      }
    }
  }
}

export default function DeploymentTroubleshooter() {
  const [checkData, setCheckData] = useState<DeploymentCheck | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const runDeploymentCheck = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/deployment-check")
      const data = await response.json()
      setCheckData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run deployment check")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDeploymentCheck()
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateVercelEnvCommands = () => {
    if (!checkData) return ""

    const commands = [
      `# Set environment variables for Vercel deployment`,
      `vercel env add GOOGLE_SHEETS_SPREADSHEET_ID`,
      `# When prompted, enter: 19bWpsxOY_b5hyUo1YugRUOMrNVTQtDICby6fHMvzHog`,
      ``,
      `vercel env add GOOGLE_SHEETS_CLIENT_EMAIL`,
      `# When prompted, enter: sheets-integration@children-of-christ-forms.iam.gserviceaccount.com`,
      ``,
      `vercel env add GOOGLE_SHEETS_PRIVATE_KEY`,
      `# When prompted, paste your private key (including quotes and \\n characters)`,
    ]

    return commands.join("\n")
  }

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gray-900 border-gold-600/30">
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-gold-400" />
          <span className="ml-2 text-gold-300">Running deployment diagnostics...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gray-900 border-red-600/30">
        <CardContent className="py-8">
          <Alert className="border-red-500 bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              <div className="flex justify-between items-center">
                <span>Deployment check failed: {error}</span>
                <Button
                  onClick={runDeploymentCheck}
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-400"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!checkData) return null

  const allPassed = Object.values(checkData.checks).every((check) => check.status)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="bg-gray-900 border-gold-600/30">
        <CardHeader>
          <CardTitle className="text-gold-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Deployment Troubleshooter
            </div>
            <Button
              onClick={runDeploymentCheck}
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
            Comprehensive deployment readiness check for Vercel.
            <span className="block text-sm text-gold-500 mt-1">
              Environment: {checkData.vercelEnvironment} | Last checked:{" "}
              {new Date(checkData.timestamp).toLocaleString()}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Status */}
          <Alert className={allPassed ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"}>
            {allPassed ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400" />
            )}
            <AlertDescription className={allPassed ? "text-green-300" : "text-red-300"}>
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {allPassed ? "✅ Ready for deployment!" : "❌ Deployment issues detected"}
                </span>
                <span className="text-sm">Status: {checkData.status}</span>
              </div>
            </AlertDescription>
          </Alert>

          {/* Build Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-gold-300 mb-3">Build Requirements</h3>
            <Alert className={getStatusColor(checkData.checks.buildRequirements.status)}>
              {getStatusIcon(checkData.checks.buildRequirements.status)}
              <AlertDescription className="text-white">
                <div>
                  <div className="font-medium mb-2">Build Environment Check</div>
                  {Array.isArray(checkData.checks.buildRequirements.details) ? (
                    <ul className="text-sm list-disc list-inside">
                      {checkData.checks.buildRequirements.details.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">{checkData.checks.buildRequirements.details}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>

          {/* Environment Variables */}
          <div>
            <h3 className="text-lg font-semibold text-gold-300 mb-3">Environment Variables</h3>
            <Alert className={getStatusColor(checkData.checks.environmentVariables.status)}>
              {getStatusIcon(checkData.checks.environmentVariables.status)}
              <AlertDescription className="text-white">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Variable Configuration</span>
                    <span className="text-sm">
                      {checkData.checks.environmentVariables.details.configured}/
                      {checkData.checks.environmentVariables.details.required} configured
                    </span>
                  </div>
                  {checkData.checks.environmentVariables.details.missing.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-red-300">Missing variables:</p>
                      <ul className="text-sm list-disc list-inside ml-4">
                        {checkData.checks.environmentVariables.details.missing.map((variable) => (
                          <li key={variable}>{variable}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {checkData.checks.environmentVariables.details.warnings.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-yellow-300">Warnings:</p>
                      <ul className="text-sm list-disc list-inside ml-4">
                        {checkData.checks.environmentVariables.details.warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>

          {/* Dependencies */}
          <div>
            <h3 className="text-lg font-semibold text-gold-300 mb-3">Dependencies</h3>
            <Alert className={getStatusColor(checkData.checks.dependencies.status)}>
              {getStatusIcon(checkData.checks.dependencies.status)}
              <AlertDescription className="text-white">
                <div>
                  <div className="font-medium mb-2">Dependency Analysis</div>
                  {Array.isArray(checkData.checks.dependencies.details) ? (
                    <ul className="text-sm list-disc list-inside">
                      {checkData.checks.dependencies.details.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">{checkData.checks.dependencies.details}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>

          {/* File Structure */}
          <div>
            <h3 className="text-lg font-semibold text-gold-300 mb-3">File Structure</h3>
            <Alert className={getStatusColor(checkData.checks.fileStructure.status)}>
              {getStatusIcon(checkData.checks.fileStructure.status)}
              <AlertDescription className="text-white">
                <div>
                  <div className="font-medium mb-2">File Structure Validation</div>
                  {Array.isArray(checkData.checks.fileStructure.details) ? (
                    <ul className="text-sm list-disc list-inside">
                      {checkData.checks.fileStructure.details.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">{checkData.checks.fileStructure.details}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Solutions */}
      <Card className="bg-gray-900 border-gold-600/30">
        <CardHeader>
          <CardTitle className="text-gold-300">🚀 Deployment Solutions</CardTitle>
          <CardDescription className="text-gold-400">Step-by-step solutions to fix deployment issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Environment Variables Setup */}
          <div>
            <h3 className="text-lg font-semibold text-gold-400 mb-3">1. Set Up Environment Variables in Vercel</h3>
            <div className="space-y-3">
              <p className="text-gold-200 text-sm">Add these environment variables to your Vercel project:</p>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gold-300 font-medium">Vercel CLI Commands</span>
                  <Button
                    onClick={() => copyToClipboard(generateVercelEnvCommands())}
                    size="sm"
                    variant="outline"
                    className="border-gold-500 text-gold-400"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={generateVercelEnvCommands()}
                  readOnly
                  className="bg-transparent border-none text-gold-200 text-sm font-mono resize-none"
                  rows={8}
                />
              </div>
              <p className="text-gold-400 text-sm">
                Or add them manually in Vercel Dashboard → Project → Settings → Environment Variables
              </p>
            </div>
          </div>

          {/* Manual Deployment Steps */}
          <div>
            <h3 className="text-lg font-semibold text-gold-400 mb-3">2. Manual Deployment Steps</h3>
            <div className="space-y-2 text-gold-200 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gold-500 font-bold">1.</span>
                <span>
                  Go to{" "}
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:underline"
                  >
                    Vercel Dashboard
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold-500 font-bold">2.</span>
                <span>Click "Add New..." → "Project"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold-500 font-bold">3.</span>
                <span>Import your GitHub repository</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold-500 font-bold">4.</span>
                <span>Before deploying, click "Environment Variables"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold-500 font-bold">5.</span>
                <span>Add all three environment variables (see above)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold-500 font-bold">6.</span>
                <span>Click "Deploy"</span>
              </div>
            </div>
          </div>

          {/* Common Error Solutions */}
          <div>
            <h3 className="text-lg font-semibold text-gold-400 mb-3">3. Common Error Solutions</h3>
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2">Build Failed</h4>
                <ul className="text-red-200 text-sm list-disc list-inside space-y-1">
                  <li>Check for TypeScript errors: run `npm run build` locally</li>
                  <li>Ensure all imports are correct</li>
                  <li>Verify all dependencies are in package.json</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-2">Environment Variables Not Working</h4>
                <ul className="text-yellow-200 text-sm list-disc list-inside space-y-1">
                  <li>Ensure variables are set for all environments (Production, Preview, Development)</li>
                  <li>Check that private key includes proper escaping (\n for line breaks)</li>
                  <li>Verify no extra spaces in variable names or values</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">Function Timeout</h4>
                <ul className="text-blue-200 text-sm list-disc list-inside space-y-1">
                  <li>Google Sheets operations may be slow - this is normal for first deployment</li>
                  <li>Subsequent requests will be faster</li>
                  <li>Consider upgrading to Vercel Pro for longer function timeouts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gold-600/30 pt-6">
            <h3 className="text-lg font-semibold text-gold-300 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button asChild className="bg-gold-600 hover:bg-gold-700 text-black">
                <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Deploy to Vercel
                </a>
              </Button>
              <Button asChild variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-900/20">
                <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Vercel Dashboard
                </a>
              </Button>
              <Button
                onClick={() => copyToClipboard(generateVercelEnvCommands())}
                variant="outline"
                className="border-gold-500 text-gold-400 hover:bg-gold-900/20"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Env Commands
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
