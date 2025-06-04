import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-end overflow-hidden pt-16 md:pt-20 pb-0">
      {/* Background Image with optimized loading */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/background_jesus_gold.jpg"
            alt="Golden Jesus background"
            fill
            sizes="100vw"
            className="object-cover object-center mx-auto drop-shadow-2xl"
            priority
            quality={100}
          />
          {/* Top gradient for polished blend */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none" />
          {/* Subtle dark vignette for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 pointer-events-none rounded-b-3xl" />
        </div>
      </div>

      {/* Content - moved below image */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-10 pt-0 flex flex-col items-center">
        <div className="space-y-6 sm:space-y-8 bg-black/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gold-200 drop-shadow-xl text-center">
            Children of Christ
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gold-100 font-medium drop-shadow-lg max-w-2xl mx-auto text-center">
            Everyone is a child of Christ. Our mission is to use the resources available to us—gifts, donations, time, and faith—to serve our neighbors and uplift our community in the spirit of Christ's love.
          </p>
          <div className="text-sm md:text-base text-gold-300 bg-black/60 rounded-lg px-4 sm:px-6 py-2 sm:py-3 inline-block">
            <p>501(c)(3) nonprofit • EIN: 99-2902695 • All donations are tax-deductible</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              asChild
              className="w-full sm:w-auto rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg hover:from-yellow-400 hover:to-orange-400 text-black font-bold text-base sm:text-lg py-4 px-8 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 border-0"
            >
              <Link href="#donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg hover:from-yellow-400 hover:to-orange-400 text-black font-bold text-base sm:text-lg py-4 px-8 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 border-0"
            >
              <Link href="#apply">Apply for Help</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Scroll indicator - Hidden on small screens */}
      <div className="absolute bottom-8 left-0 right-0 hidden md:flex justify-center animate-bounce z-20">
        <ChevronDown className="h-8 w-8 text-gold-400" />
      </div>
    </section>
  )
}
