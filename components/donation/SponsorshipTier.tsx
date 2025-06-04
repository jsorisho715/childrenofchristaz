import React from 'react'
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface SponsorshipTierProps {
  id: string
  name: string
  value: string
  label: string
  description: string
  selected: boolean
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SponsorshipTier = React.memo(({
  id,
  name,
  value,
  label,
  description,
  selected,
  disabled = false,
  onChange
}: SponsorshipTierProps) => {
  return (
    <div 
      className={cn(
        "flex items-start space-x-3 p-4 rounded-lg border border-gold-600/30",
        "hover:bg-gold-900/20 transition-colors bg-black/50",
        "cursor-pointer select-none",
        selected && "ring-2 ring-gold-400 bg-gold-900/30 shadow-gold-400/30 shadow-lg"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        disabled={disabled}
        checked={selected}
        onChange={onChange}
        className={cn(
          "h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400",
          "transition-all accent-gold-500 hover:scale-110 bg-white",
          "checked:bg-gold-500 checked:border-gold-400",
          "checked:shadow-gold-400/50 checked:shadow-lg",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />
      <div className="flex-1">
        <Label 
          htmlFor={id} 
          className="font-semibold text-gold-400 cursor-pointer text-base block"
        >
          {label}
        </Label>
        <p className="text-sm text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  )
})

SponsorshipTier.displayName = 'SponsorshipTier' 