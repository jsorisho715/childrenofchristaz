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

const initialState = {
  success: false,
  message: "",
}

export default function DonateSection() {
  const [state, formAction, pending] = useActionState(submitDonation, initialState)

  return (
    <section
      id="donate"
      className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Donate</span>
          </h2>
          <p className="text-base md:text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto">
            Your donation supports our mission to deliver essential goods to families in need. All donations are
            tax-deductible and help subsidize the distribution of donated merchandise to people who have applied and
            qualified through our needs-based program.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Donation Form - Mobile optimized */}
          <div className="bg-gray-900 rounded-2xl shadow-xl p-5 sm:p-8 border border-gold-600/30 golden-pulse order-2 md:order-1">
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

            <form action={formAction} className="space-y-5 md:space-y-6">
              <div>
                <Label htmlFor="name" className="text-gold-300 font-medium text-base">
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gold-300 font-medium text-base">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                />
              </div>

              <div>
                <Label className="text-gold-300 font-medium mb-3 block text-base">Sponsorship Tier</Label>
                <RadioGroup name="sponsorshipTier" disabled={pending} className="space-y-3 md:space-y-4">
                  <div className="flex items-start space-x-3 p-3 md:p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50">
                    <RadioGroupItem value="bronze" id="bronze" className="mt-1" />
                    <div>
                      <Label htmlFor="bronze" className="font-semibold text-gold-400 cursor-pointer text-base">
                        $500 – Bronze Sponsor
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        Help fulfill Christ's call to serve the needy with practical and immediate support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 md:p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50">
                    <RadioGroupItem value="silver" id="silver" className="mt-1" />
                    <div>
                      <Label htmlFor="silver" className="font-semibold text-gold-400 cursor-pointer text-base">
                        $5,000 – Silver Sponsor
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        Answer the call to stewardship by blessing many with life-changing aid.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 md:p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50">
                    <RadioGroupItem value="gold" id="gold" className="mt-1" />
                    <div>
                      <Label htmlFor="gold" className="font-semibold text-gold-400 cursor-pointer text-base">
                        $10,000 – Gold Sponsor
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        Stand as a pillar of faith-driven generosity, sustaining large-scale impact.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 md:p-4 rounded-lg border border-gold-600/30 hover:bg-gold-900/20 transition-colors bg-black/50">
                    <RadioGroupItem value="other" id="other" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="other" className="font-semibold text-gold-400 cursor-pointer text-base">
                        Other Amount
                      </Label>
                      <Input
                        name="otherAmount"
                        type="number"
                        placeholder="Enter amount"
                        disabled={pending}
                        className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                        min="1"
                      />
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="monthly" name="monthlySponsorship" value="true" disabled={pending} className="h-5 w-5" />
                <Label htmlFor="monthly" className="text-gold-300 cursor-pointer text-base">
                  Yes, I would like this to be a monthly sponsorship.
                </Label>
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-black font-bold py-4 md:py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 golden-pulse disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
              >
                {pending ? "Processing..." : "Donate Now"}
              </Button>
            </form>
          </div>

          {/* Bitcoin Donation - Mobile optimized */}
          <div className="bg-gray-900 rounded-2xl shadow-xl p-5 sm:p-8 border border-gold-600/30 text-center order-1 md:order-2">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                Bitcoin Donations
              </span>
            </h3>
            <div className="flex justify-center mb-4">
              <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px]">
                <Image
                  src="/btc_donation_qr.png"
                  alt="Bitcoin donation QR code"
                  fill
                  sizes="(max-width: 768px) 180px, 200px"
                  className="rounded-lg shadow-md object-contain"
                />
              </div>
            </div>
            <p className="text-gold-300 font-medium">Scan to donate via Bitcoin</p>
            <p className="text-sm text-gold-500 mt-2">Cryptocurrency donations are also tax-deductible</p>
          </div>
        </div>
      </div>
    </section>
  )
}
