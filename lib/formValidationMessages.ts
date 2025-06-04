export const formValidationMessages = {
  required: {
    error: "This field is required",
    warning: "Please fill in this field",
    info: "This information helps us serve you better"
  },
  email: {
    error: "Please enter a valid email address",
    warning: "Double-check your email address",
    info: "We'll use this to contact you about your request"
  },
  phone: {
    error: "Please enter a valid phone number",
    warning: "Make sure to include your area code",
    info: "We'll only use this to contact you about your request"
  },
  name: {
    error: "Please enter your full name",
    warning: "Your name helps us personalize your experience",
    info: "We use your name to address you properly"
  },
  amount: {
    error: "Please enter a valid amount",
    warning: "The amount should be greater than $0",
    info: "Your donation makes a real difference"
  },
  address: {
    error: "Please enter your complete address",
    warning: "Include your street address, city, and zip code",
    info: "This helps us verify your location"
  },
  password: {
    error: "Password must be at least 8 characters long",
    warning: "Use a mix of letters, numbers, and symbols for security",
    info: "A strong password helps protect your account"
  },
  adults: {
    error: "Please enter the number of adults in your household",
    warning: "This helps us understand your family size",
    info: "We use this to better assist your family"
  },
  children: {
    error: "Please enter the number of children in your household",
    warning: "Enter 0 if you have no children",
    info: "This helps us provide appropriate assistance"
  },
  childrenAges: {
    error: "Please list the ages of all children",
    warning: "Separate ages with commas (e.g., 5, 8, 12)",
    info: "This helps us provide age-appropriate support"
  },
  monthlyIncome: {
    error: "Please enter your monthly household income",
    warning: "Include all sources of income",
    info: "This helps us assess your needs"
  },
  incomeSource: {
    error: "Please list your sources of income",
    warning: "Include all jobs and assistance programs",
    info: "This helps us understand your financial situation"
  },
  governmentAssistance: {
    error: "Please indicate if you receive government assistance",
    warning: "This helps us coordinate with other programs",
    info: "We can help you access additional resources"
  },
  needDescription: {
    error: "Please describe your current situation",
    warning: "Be specific about your needs",
    info: "This helps us provide the right assistance"
  },
  intendedUse: {
    error: "Please explain how you'll use the assistance",
    warning: "Be specific about your plans",
    info: "This helps us ensure the assistance meets your needs"
  },
  general: {
    error: "Something went wrong. Please try again",
    warning: "Please check your information",
    info: "Need help? Contact our support team"
  }
} as const;

export type ValidationMessageType = keyof typeof formValidationMessages;
export type MessageType = 'error' | 'warning' | 'info'; 