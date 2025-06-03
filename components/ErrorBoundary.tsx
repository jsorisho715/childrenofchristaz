"use client"

import React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; retry: () => void }> },
  ErrorBoundaryState
> {
  constructor(props: {
    children: React.ReactNode
    fallback?: React.ComponentType<{ error: Error; retry: () => void }>
  }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} retry={this.retry} />
      }

      return <DefaultErrorFallback error={this.state.error!} retry={this.retry} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert className="border-red-500 bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Something went wrong</h3>
                <p className="text-sm">{error.message}</p>
              </div>

              <div className="space-y-2">
                <Button onClick={retry} className="w-full bg-red-600 hover:bg-red-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full border-red-500 text-red-400 hover:bg-red-900/20"
                >
                  Reload Page
                </Button>
              </div>

              {process.env.NODE_ENV === "development" && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-red-400">Technical Details</summary>
                  <pre className="mt-2 p-2 bg-black/50 rounded text-red-300 overflow-auto">{error.stack}</pre>
                </details>
              )}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
