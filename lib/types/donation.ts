export interface DonationFormData {
  name: string
  email: string
  phone: string
  sponsorshipTier: string
  monthlySponsorship: boolean
}

export interface DonationState {
  success: boolean
  message: string
  errors: Record<string, string[]>
}

export interface SponsorshipTierData {
  id: string
  value: string
  label: string
  description: string
}

export const SPONSORSHIP_TIERS: SponsorshipTierData[] = [
  {
    id: 'bronze',
    value: 'bronze',
    label: '$500 – Bronze Sponsor',
    description: 'Help fulfill Christ\'s call to serve the needy with practical and immediate support.'
  },
  {
    id: 'silver',
    value: 'silver',
    label: '$1,000 – Silver Sponsor',
    description: 'Make a significant impact in supporting families in need with essential goods.'
  },
  {
    id: 'gold',
    value: 'gold',
    label: '$2,500 – Gold Sponsor',
    description: 'Lead the way in providing comprehensive support to multiple families in need.'
  }
] 