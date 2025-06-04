import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import FormErrorMessage from "@/components/FormErrorMessage"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  pattern?: string
  error?: string
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormField = React.memo(({
  id,
  name,
  label,
  type = "text",
  required = false,
  disabled = false,
  placeholder,
  pattern,
  error,
  className,
  value,
  onChange
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id} 
        className="text-gold-300 font-medium text-base block mb-2"
      >
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-accent",
          "placeholder:text-gray-500 h-12 text-base transition-all duration-200",
          "hover:border-gold-500 focus:ring-2 focus:ring-gold-400/20",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
          className
        )}
      />
      {error && (
        <FormErrorMessage
          message={error}
          type="error"
        />
      )}
    </div>
  )
})

FormField.displayName = 'FormField' 