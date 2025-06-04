import React from 'react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DonationAlertProps {
  message: string
  type: 'success' | 'error'
  className?: string
}

export const DonationAlert = React.memo(({
  message,
  type,
  className
}: DonationAlertProps) => {
  if (!message) return null

  return (
    <Alert
      className={cn(
        "mb-6 transition-all duration-200",
        type === 'success' 
          ? "border-green-500 bg-green-900/20" 
          : "border-red-500 bg-red-900/20",
        className
      )}
    >
      {type === 'success' ? (
        <CheckCircle className="h-4 w-4 text-green-400" />
      ) : (
        <AlertCircle className="h-4 w-4 text-red-400" />
      )}
      <AlertDescription 
        className={type === 'success' ? "text-green-300" : "text-red-300"}
      >
        {message}
      </AlertDescription>
    </Alert>
  )
})

DonationAlert.displayName = 'DonationAlert' 