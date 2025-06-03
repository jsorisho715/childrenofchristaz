import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"
import { ErrorBoundary } from "@/components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Children of Christ - Nonprofit Donation & Assistance",
  description:
    "Children of Christ is a 501(c)(3) nonprofit organization helping families in need. Donate or apply for assistance through our needs-based program in Phoenix, Arizona.",
  keywords: "nonprofit, donation, assistance, Phoenix Arizona, 501c3, charity, families in need, tax deductible",
  openGraph: {
    title: "Children of Christ - Helping Families in Need",
    description: "Supporting families through donations and assistance programs. All donations are tax-deductible.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Children of Christ Nonprofit",
      },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-gold-100 min-h-screen flex flex-col`}>
        <ErrorBoundary>
          <Navigation />
          <div className="flex-grow">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
