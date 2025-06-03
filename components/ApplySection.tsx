"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Download } from "lucide-react"
import Link from "next/link"
import { submitApplication } from "@/app/actions/application"

const initialState = {
  success: false,
  message: "",
}

export default function ApplySection() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState)

  return (
    <section id="apply" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Apply for Help
            </span>
          </h2>
          <p className="text-base md:text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8">
            If you're in need of assistance, please complete the application below. Submitting this form does not
            guarantee you will receive items. All distributions are based on need and availability.
          </p>

          <Link href="/assistance-application-form.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="border-gold-500 text-gold-400 hover:bg-gold-900/20 hover:text-gold-300 mb-6 md:mb-8 bg-black/50 h-12 px-5"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Printable Application
            </Button>
          </Link>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-xl p-5 sm:p-8 border border-gold-600/30">
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
            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              <div>
                <Label htmlFor="fullName" className="text-gold-300 font-medium text-base">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
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
                  inputMode="email"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gold-300 font-medium text-base">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                  inputMode="tel"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-gold-300 font-medium text-base">
                  Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="adults" className="text-gold-300 font-medium text-base">
                  Number of Adults in Household *
                </Label>
                <Input
                  id="adults"
                  name="adults"
                  type="number"
                  required
                  min="1"
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                  inputMode="numeric"
                />
              </div>

              <div>
                <Label htmlFor="children" className="text-gold-300 font-medium text-base">
                  Number of Children in Household
                </Label>
                <Input
                  id="children"
                  name="children"
                  type="number"
                  min="0"
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                  inputMode="numeric"
                />
              </div>

              <div>
                <Label htmlFor="childrenAges" className="text-gold-300 font-medium text-base">
                  Ages of Children
                </Label>
                <Input
                  id="childrenAges"
                  name="childrenAges"
                  type="text"
                  placeholder="e.g., 5, 8, 12"
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="monthlyIncome" className="text-gold-300 font-medium text-base">
                  Monthly Household Income *
                </Label>
                <Input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="text"
                  required
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                  inputMode="decimal"
                />
              </div>

              <div>
                <Label htmlFor="incomeSource" className="text-gold-300 font-medium text-base">
                  Source(s) of Income *
                </Label>
                <Input
                  id="incomeSource"
                  name="incomeSource"
                  type="text"
                  required
                  disabled={pending}
                  className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base"
                />
              </div>
            </div>

            <div>
              <Label className="text-gold-300 font-medium mb-3 block text-base">
                Government Assistance Received? *
              </Label>
              <RadioGroup name="governmentAssistance" disabled={pending} className="flex space-x-6">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="assistance-yes" className="h-5 w-5" />
                  <Label htmlFor="assistance-yes" className="cursor-pointer text-gold-200 text-base">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="assistance-no" className="h-5 w-5" />
                  <Label htmlFor="assistance-no" className="cursor-pointer text-gold-200 text-base">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="needDescription" className="text-gold-300 font-medium text-base">
                Description of Need *
              </Label>
              <Textarea
                id="needDescription"
                name="needDescription"
                required
                rows={4}
                disabled={pending}
                className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 text-base"
                placeholder="Please describe your current situation and specific needs..."
              />
            </div>

            <div>
              <Label htmlFor="intendedUse" className="text-gold-300 font-medium text-base">
                Intended Use of Items *
              </Label>
              <Textarea
                id="intendedUse"
                name="intendedUse"
                required
                rows={3}
                disabled={pending}
                className="mt-2 bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 text-base"
                placeholder="How will you use the items you receive?"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-black font-bold py-4 md:py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
            >
              {pending ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
