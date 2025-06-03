"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { submitDonation } from "@/app/actions/donation"
import React, { useState } from "react"

const initialState = {
  success: false,
  message: "",
}

export default function DonateSection() {
  const [state, formAction, pending] = useActionState(submitDonation, initialState)
  const [selectedSponsorship, setSelectedSponsorship] = useState<string>("")
  const [isMonthly, setIsMonthly] = useState(false)

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSponsorship(e.target.value)
  }
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMonthly(e.target.checked)
  }

  return (
    <section
      id="donate"
      className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 heading-accent">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Donate</span>
          </h2>
          <p className="text-base md:text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto">
            Your donation supports our mission to deliver essential goods to families in need. All donations are
            tax-deductible and help subsidize the distribution of donated merchandise to people who have applied and
            qualified through our needs-based program.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 md:gap-12 items-start">
          {/* Donation Form - Mobile optimized */}
          <div className="bg-gray-900 rounded-2xl shadow-xl p-5 sm:p-8 border border-gold-600/30 golden-pulse border-accent">
            {state.message && (
              <Alert
                className={`mb-6 ${state.success ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"}`}
              >
                {state.success ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                )}
                <AlertDescription className={state.success ? "text-green-300" : "text-red-300"}>
                  {state.message}
                </AlertDescription>
              </Alert>
            )}

            <form
              action={(formData) => {
                // Set the sponsorshipTier and monthlySponsorship fields in the formData
                formData.set("sponsorshipTier", selectedSponsorship)
                formData.set("monthlySponsorship", isMonthly ? "true" : "")
                return formAction(formData)
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gold-300 font-medium text-base block mb-2">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={pending}
                    className="w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-accent placeholder:text-gray-500 h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gold-300 font-medium text-base block mb-2">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={pending}
                    className="w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-accent placeholder:text-gray-500 h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gold-300 font-medium text-base block mb-2">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    pattern="[0-9\-() ]{10,}"
                    placeholder="Enter your phone number"
                    disabled={pending}
                    className="w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-accent placeholder:text-gray-500 h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gold-300 font-medium block text-base mb-3">Sponsorship Tier</Label>
                <div className="space-y-4">
                  <div className={`flex items-start space-x-3 p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50 ${
                    selectedSponsorship === 'bronze' ? 'ring-2 ring-gold-400 bg-gold-900/30 shadow-gold-400/30 shadow-lg' : ''
                  }`}>
                    <input
                      type="radio"
                      name="sponsorshipTier"
                      value="bronze"
                      id="bronze"
                      disabled={pending}
                      checked={selectedSponsorship === 'bronze'}
                      onChange={handleRadioChange}
                      className={`h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400 transition-all accent-gold-500 hover:scale-110 bg-white checked:bg-gold-500 checked:border-gold-400 checked:shadow-gold-400/50 checked:shadow-lg`}
                    />
                    <div className="flex-1">
                      <Label htmlFor="bronze" className="font-semibold text-gold-400 cursor-pointer text-base block">
                        $500 – Bronze Sponsor
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        Help fulfill Christ's call to serve the needy with practical and immediate support.
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start space-x-3 p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50 ${
                    selectedSponsorship === 'silver' ? 'ring-2 ring-gold-400 bg-gold-900/30 shadow-gold-400/30 shadow-lg' : ''
                  }`}>
                    <input
                      type="radio"
                      name="sponsorshipTier"
                      value="silver"
                      id="silver"
                      disabled={pending}
                      checked={selectedSponsorship === 'silver'}
                      onChange={handleRadioChange}
                      className={`h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400 transition-all accent-gold-500 hover:scale-110 bg-white checked:bg-gold-500 checked:border-gold-400 checked:shadow-gold-400/50 checked:shadow-lg`}
                    />
                    <div className="flex-1">
                      <Label htmlFor="silver" className="font-semibold text-gold-400 cursor-pointer text-base block">
                        $5,000 – Silver Sponsor
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        Answer the call to stewardship by blessing many with life-changing aid.
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start space-x-3 p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50 ${
                    selectedSponsorship === 'gold' ? 'ring-2 ring-gold-400 bg-gold-900/30 shadow-gold-400/30 shadow-lg' : ''
                  }`}>
                    <input
                      type="radio"
                      name="sponsorshipTier"
                      value="gold"
                      id="gold"
                      disabled={pending}
                      checked={selectedSponsorship === 'gold'}
                      onChange={handleRadioChange}
                      className={`h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400 transition-all accent-gold-500 hover:scale-110 bg-white checked:bg-gold-500 checked:border-gold-400 checked:shadow-gold-400/50 checked:shadow-lg`}
                    />
                    <div className="flex-1">
                      <Label htmlFor="gold" className="font-semibold text-gold-400 cursor-pointer text-base block">
                        $10,000 – Gold Sponsor
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        Stand as a pillar of faith-driven generosity, sustaining large-scale impact.
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start space-x-3 p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50 ${
                    selectedSponsorship === 'other' ? 'ring-2 ring-gold-400 bg-gold-900/30 shadow-gold-400/30 shadow-lg' : ''
                  }`}>
                    <input
                      type="radio"
                      name="sponsorshipTier"
                      value="other"
                      id="other"
                      disabled={pending}
                      checked={selectedSponsorship === 'other'}
                      onChange={handleRadioChange}
                      className={`h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400 transition-all accent-gold-500 hover:scale-110 bg-white checked:bg-gold-500 checked:border-gold-400 checked:shadow-gold-400/50 checked:shadow-lg`}
                    />
                    <div className="flex-1">
                      <Label htmlFor="other" className="font-semibold text-gold-400 cursor-pointer text-base block">
                        Other Amount
                      </Label>
                      <Input
                        name="otherAmount"
                        type="number"
                        placeholder="Enter amount"
                        disabled={pending}
                        className="mt-2 w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-accent placeholder:text-gray-500 h-12 text-base"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="monthly"
                  name="monthlySponsorship"
                  value="true"
                  disabled={pending}
                  checked={isMonthly}
                  onChange={handleCheckboxChange}
                  className="h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400 transition-all accent-gold-500 hover:scale-110 bg-white checked:bg-gold-500 checked:border-gold-400 checked:shadow-gold-400/50 checked:shadow-lg"
                />
                <Label htmlFor="monthly" className="text-gold-300 cursor-pointer text-base select-none">
                  Yes, I would like this to be a monthly sponsorship.
                </Label>
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-400 hover:to-gold-600 text-black font-bold py-4 md:py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 border-0 text-base md:text-lg"
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
