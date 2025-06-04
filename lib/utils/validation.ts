import { DonationFormData } from '../types/donation'

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9\-() ]{10,}$/
  return phoneRegex.test(phone)
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateDonationForm = (data: DonationFormData): Record<string, string[]> => {
  const errors: Record<string, string[]> = {}

  if (!data.name?.trim()) {
    errors.name = ['Name is required']
  }

  if (!data.email?.trim()) {
    errors.email = ['Email is required']
  } else if (!validateEmail(data.email)) {
    errors.email = ['Please enter a valid email address']
  }

  if (!data.phone?.trim()) {
    errors.phone = ['Phone number is required']
  } else if (!validatePhone(data.phone)) {
    errors.phone = ['Please enter a valid phone number']
  }

  if (!data.sponsorshipTier) {
    errors.sponsorshipTier = ['Please select a sponsorship tier']
  }

  return errors
}

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
} 