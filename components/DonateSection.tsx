"use client"

import React, { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField } from "@/components/ui/form/FormField"
import { SponsorshipTier } from "@/components/donation/SponsorshipTier"
import { DonationAlert } from "@/components/donation/DonationAlert"
import { submitDonation } from "@/app/actions/donation"
import { SPONSORSHIP_TIERS } from "@/lib/types/donation"
import { validateDonationForm, formatPhoneNumber } from "@/lib/utils/validation"
import type { DonationState, DonationFormData } from "@/lib/types/donation"

const initialState: DonationState = {
  success: false,
  message: "",
  errors: {},
}

export default function DonateSection() {
  const [state, setState] = useState<DonationState>(initialState)
  const [pending, setPending] = useState(false)
  const [selectedSponsorship, setSelectedSponsorship] = useState<string>("")
  const [isMonthly, setIsMonthly] = useState(false)
  const [formData, setFormData] = useState<DonationFormData>({
    name: "",
    email: "",
    phone: "",
    sponsorshipTier: "",
    monthlySponsorship: false,
  })

  const handleRadioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSponsorship(e.target.value)
    setFormData(prev => ({ ...prev, sponsorshipTier: e.target.value }))
  }, [])

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsMonthly(checked)
    setFormData(prev => ({ ...prev, monthlySponsorship: checked }))
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData(prev => ({ ...prev, phone: formatted }))
  }, [])

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setState(initialState)

    const errors = validateDonationForm(formData)
    if (Object.keys(errors).length > 0) {
      setState({
        success: false,
        message: "Please correct the errors in the form",
        errors,
      })
      setPending(false)
      return
    }

    const result = await submitDonation(initialState, new FormData(event.currentTarget))
    setState({
      ...result,
      errors: result.errors ?? {},
    })
    setPending(false)
  }, [formData])

  const getFieldError = useCallback((fieldName: string) => {
    return state.errors?.[fieldName]?.[0] || ""
  }, [state.errors])

  const hasFieldError = useCallback((fieldName: string) => {
    return !!state.errors?.[fieldName]?.[0]
  }, [state.errors])

  return (
    <section
      id="donate"
      className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 heading-accent">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Donate
            </span>
          </h2>
          <p className="text-base md:text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto">
            Your donation supports our mission to deliver essential goods to families in need. All donations are
            tax-deductible and help subsidize the distribution of donated merchandise to people who have applied and
            qualified through our needs-based program.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 md:gap-12 items-start">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-5 sm:p-8 border border-gold-600/30 golden-pulse border-accent">
            <DonationAlert
              message={state.message}
              type={state.success ? 'success' : 'error'}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  id="name"
                  name="name"
                  label="Name"
                  required
                  disabled={pending}
                  error={getFieldError("name")}
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <FormField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  required
                  disabled={pending}
                  error={getFieldError("email")}
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <FormField
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  required
                  pattern="[0-9\-() ]{10,}"
                  placeholder="Enter your phone number"
                  disabled={pending}
                  error={getFieldError("phone")}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="space-y-4">
                <label className="text-gold-300 font-medium block text-base mb-3">
                  Sponsorship Tier
                </label>
                <div className="space-y-4">
                  {SPONSORSHIP_TIERS.map((tier) => (
                    <SponsorshipTier
                      key={tier.id}
                      id={tier.id}
                      name="sponsorshipTier"
                      value={tier.value}
                      label={tier.label}
                      description={tier.description}
                      selected={selectedSponsorship === tier.value}
                      disabled={pending}
                      onChange={handleRadioChange}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="monthly"
                  name="monthlySponsorship"
                  checked={isMonthly}
                  disabled={pending}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setIsMonthly(checked)
                    setFormData(prev => ({ ...prev, monthlySponsorship: checked }))
                  }}
                  className="border-gold-500 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-400"
                />
                <label
                  htmlFor="monthly"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gold-300"
                >
                  Make this a monthly donation
                </label>
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? "Processing..." : "Donate Now"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
