import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gold-100 py-12 border-t border-gold-600/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 mb-4">
              Children of Christ
            </h3>
            <p className="text-gold-300 mb-4 text-sm md:text-base">
              A 501(c)(3) nonprofit organization serving families in need throughout Phoenix, Arizona.
            </p>
            <p className="text-sm text-gold-400">
              22039 N 24th Ave
              <br />
              Phoenix, AZ 85027
              <br />
              EIN: 99-2902695
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gold-400 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gold-300 grid grid-cols-2 sm:block">
              <li className="mb-3 sm:mb-0">
                <Link
                  href="#donate"
                  className="hover:text-gold-400 transition-colors text-sm md:text-base inline-block py-1"
                >
                  Donate
                </Link>
              </li>
              <li className="mb-3 sm:mb-0">
                <Link
                  href="#apply"
                  className="hover:text-gold-400 transition-colors text-sm md:text-base inline-block py-1"
                >
                  Apply for Help
                </Link>
              </li>
              <li className="mb-3 sm:mb-0">
                <Link
                  href="#about"
                  className="hover:text-gold-400 transition-colors text-sm md:text-base inline-block py-1"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-3 sm:mb-0">
                <Link
                  href="/verify-setup"
                  className="hover:text-gold-400 transition-colors text-sm md:text-base inline-block py-1"
                >
                  Verify Setup
                </Link>
              </li>
              <li>
                <Link
                  href="/diagnostics"
                  className="hover:text-gold-400 transition-colors text-sm md:text-base inline-block py-1"
                >
                  System Diagnostics
                </Link>
              </li>
              <li>
                <Link
                  href="/deployment-help"
                  className="hover:text-gold-400 transition-colors text-sm md:text-base inline-block py-1"
                >
                  Deployment Help
                </Link>
              </li>
              <li>
                <Link
                  href="/assistance-application-form.pdf"
                  className="hover:text-gold-400 transition-colors text-sm md:text-base inline-block py-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Application
                </Link>
              </li>
            </ul>
          </div>

          {/* Bitcoin Donation */}
          <div className="text-center sm:col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold text-gold-400 mb-4">Bitcoin Donations</h4>
            <div className="flex justify-center mb-3">
              <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
                <Image
                  src="/btc_donation_qr.png"
                  alt="Bitcoin donation QR code"
                  fill
                  sizes="(max-width: 768px) 100px, 120px"
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-gold-400">Scan to donate via Bitcoin</p>
          </div>
        </div>

        {/* Legal Information */}
        <div className="border-t border-gold-600/30 pt-6 md:pt-8">
          <div className="text-center mb-6">
            <p className="text-xs md:text-sm text-gold-400 leading-relaxed max-w-4xl mx-auto">
              <strong>Important:</strong> Items may not be resold, bartered, auctioned, or exchanged for money or
              services. All items distributed are for personal use only. Submitting an application does not guarantee
              receipt. All donations are tax-deductible to the fullest extent allowed by law.
            </p>
          </div>

          <div className="text-center text-xs md:text-sm text-gold-500">
            <p>&copy; {new Date().getFullYear()} Children of Christ. All rights reserved.</p>
            <p className="mt-2">Built with faith and dedication to serve those in need.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
