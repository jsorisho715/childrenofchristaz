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
import React, { useState } from "react"

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
}

export default function ApplySection() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState)
  const [selectedAssistance, setSelectedAssistance] = useState<string>("")

  const handleAssistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAssistance(e.target.value)
  }

  // Helper function to get field error message
  const getFieldError = (fieldName: string) => {
    return state.errors?.[fieldName]?.[0] || ""
  }

  // Helper function to check if field has error
  const hasFieldError = (fieldName: string) => {
    return !!state.errors?.[fieldName]?.[0]
  }

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

          <form
            action={(formData) => {
              formData.set("governmentAssistance", selectedAssistance)
              return formAction(formData)
            }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-gold-300 font-medium text-base block mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base ${
                      hasFieldError("fullName") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {hasFieldError("fullName") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("fullName")}</p>
                  )}
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
                    className={`w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base ${
                      hasFieldError("email") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    inputMode="email"
                  />
                  {hasFieldError("email") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("email")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gold-300 font-medium text-base block mb-2">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base ${
                      hasFieldError("phone") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    inputMode="tel"
                  />
                  {hasFieldError("phone") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("phone")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="text-gold-300 font-medium text-base block mb-2">
                    Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base ${
                      hasFieldError("address") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {hasFieldError("address") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("address")}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="adults" className="text-gold-300 font-medium text-base block mb-2">
                    Number of Adults in Household *
                  </Label>
                  <Input
                    id="adults"
                    name="adults"
                    type="number"
                    required
                    min="1"
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black placeholder:text-gray-500 h-12 text-base focus:border-gold-400 focus:ring-gold-400 appearance-none rounded-md transition-all autofill:!text-black autofill:!bg-white ${
                      hasFieldError("adults") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    inputMode="numeric"
                    style={{ color: '#000' }}
                  />
                  {hasFieldError("adults") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("adults")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="children" className="text-gold-300 font-medium text-base block mb-2">
                    Number of Children in Household
                  </Label>
                  <Input
                    id="children"
                    name="children"
                    type="number"
                    min="0"
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black placeholder:text-gray-500 h-12 text-base focus:border-gold-400 focus:ring-gold-400 appearance-none rounded-md transition-all autofill:!text-black autofill:!bg-white ${
                      hasFieldError("children") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    inputMode="numeric"
                    style={{ color: '#000' }}
                  />
                  {hasFieldError("children") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("children")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="childrenAges" className="text-gold-300 font-medium text-base block mb-2">
                    Ages of Children
                  </Label>
                  <Input
                    id="childrenAges"
                    name="childrenAges"
                    type="text"
                    placeholder="e.g., 5, 8, 12"
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base ${
                      hasFieldError("childrenAges") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {hasFieldError("childrenAges") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("childrenAges")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="monthlyIncome" className="text-gold-300 font-medium text-base block mb-2">
                    Monthly Household Income *
                  </Label>
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="text"
                    required
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base ${
                      hasFieldError("monthlyIncome") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    inputMode="decimal"
                  />
                  {hasFieldError("monthlyIncome") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("monthlyIncome")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="incomeSource" className="text-gold-300 font-medium text-base block mb-2">
                    Source(s) of Income *
                  </Label>
                  <Input
                    id="incomeSource"
                    name="incomeSource"
                    type="text"
                    required
                    disabled={pending}
                    className={`w-full bg-white border-gold-600/50 text-black focus:border-gold-400 focus:ring-gold-400 placeholder:text-gray-500 h-12 text-base ${
                      hasFieldError("incomeSource") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {hasFieldError("incomeSource") && (
                    <p className="mt-1 text-sm text-red-400">{getFieldError("incomeSource")}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-gold-600/30">
              <Label className="text-gold-300 font-medium block text-base mb-3">
                Government Assistance Received? *
              </Label>
              <div className="flex flex-wrap gap-6">
                <label className={`flex items-center space-x-3 cursor-pointer group ${selectedAssistance === 'yes' ? 'ring-2 ring-gold-400 bg-gold-900/30 shadow-gold-400/30 shadow-lg' : ''}`}>
                  <input
                    type="radio"
                    name="governmentAssistance"
                    value="yes"
                    id="assistance-yes"
                    disabled={pending}
                    checked={selectedAssistance === 'yes'}
                    onChange={handleAssistanceChange}
                    className="h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400 transition-all accent-gold-500 hover:scale-110 bg-white checked:bg-gold-500 checked:border-gold-400 checked:shadow-gold-400/50 checked:shadow-lg"
                  />
                  <span className="text-gold-200 text-base select-none">Yes</span>
                </label>
                <label className={`flex items-center space-x-3 cursor-pointer group ${selectedAssistance === 'no' ? 'ring-2 ring-gold-400 bg-gold-900/30 shadow-gold-400/30 shadow-lg' : ''}`}>
                  <input
                    type="radio"
                    name="governmentAssistance"
                    value="no"
                    id="assistance-no"
                    disabled={pending}
                    checked={selectedAssistance === 'no'}
                    onChange={handleAssistanceChange}
                    className="h-6 w-6 border-2 border-gold-500 focus:ring-2 focus:ring-gold-400 transition-all accent-gold-500 hover:scale-110 bg-white checked:bg-gold-500 checked:border-gold-400 checked:shadow-gold-400/50 checked:shadow-lg"
                  />
                  <span className="text-gold-200 text-base select-none">No</span>
                </label>
              </div>
              {hasFieldError("governmentAssistance") && (
                <p className="mt-1 text-sm text-red-400">{getFieldError("governmentAssistance")}</p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="needDescription" className="text-gold-300 font-medium text-base block mb-2">
                  Description of Need *
                </Label>
                <Textarea
                  id="needDescription"
                  name="needDescription"
                  required
                  rows={4}
                  disabled={pending}
                  className={`w-full bg-white border-gold-600/50 text-black placeholder:text-gray-500 text-base focus:border-gold-400 focus:ring-gold-400 autofill:!text-black autofill:!bg-white ${
                    hasFieldError("needDescription") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Please describe your current situation and specific needs..."
                  style={{ color: '#000' }}
                />
                {hasFieldError("needDescription") && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("needDescription")}</p>
                )}
              </div>

              <div>
                <Label htmlFor="intendedUse" className="text-gold-300 font-medium text-base block mb-2">
                  Intended Use of Items *
                </Label>
                <Textarea
                  id="intendedUse"
                  name="intendedUse"
                  required
                  rows={3}
                  disabled={pending}
                  className={`w-full bg-white border-gold-600/50 text-black placeholder:text-gray-500 text-base focus:border-gold-400 focus:ring-gold-400 autofill:!text-black autofill:!bg-white ${
                    hasFieldError("intendedUse") ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="How will you use the items you receive?"
                  style={{ color: '#000' }}
                />
                {hasFieldError("intendedUse") && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("intendedUse")}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-400 hover:to-gold-600 text-black font-bold py-4 md:py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 border-0 text-base md:text-lg"
            >
              {pending ? "Processing..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
