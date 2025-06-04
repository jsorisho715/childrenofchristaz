"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Download } from "lucide-react"
import Link from "next/link"
import { submitApplication } from "@/app/actions/application"
import FormErrorMessage from "./FormErrorMessage"
import { formValidationMessages } from "@/lib/formValidationMessages"

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
}

export default function ApplySection() {
  const [state, setState] = useState(initialState)
  const [pending, setPending] = useState(false)
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setState(initialState)
    const formData = new FormData(event.currentTarget)
    formData.set("governmentAssistance", selectedAssistance)
    const result = await submitApplication(initialState, formData)
    setState({
      ...result,
      errors: result.errors ?? {},
    })
    setPending(false)
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
            onSubmit={handleSubmit}
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
                    <FormErrorMessage
                      message={formValidationMessages.name.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.email.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.phone.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.address.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.adults.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.children.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.childrenAges.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.monthlyIncome.error}
                      type="error"
                    />
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
                    <FormErrorMessage
                      message={formValidationMessages.incomeSource.error}
                      type="error"
                    />
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
                <FormErrorMessage
                  message={formValidationMessages.governmentAssistance.error}
                  type="error"
                />
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
                  <FormErrorMessage
                    message={formValidationMessages.needDescription.error}
                    type="error"
                  />
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
                  <FormErrorMessage
                    message={formValidationMessages.intendedUse.error}
                    type="error"
                  />
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
