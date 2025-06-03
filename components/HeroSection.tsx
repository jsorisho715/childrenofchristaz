import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image with optimized loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background_jesus_gold.jpg"
          alt="Golden Jesus background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAABAwIHAQAAAAAAAAAAAAABAAIDBAUGERITFCFRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmN1XdU7ZWKjSqgZUyxwvjc1zHEEEgdFERB//2Q=="
        />
        {/* Gradient Overlay - Enhanced for better text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>
      </div>

      {/* Content - Improved spacing for mobile */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 mb-4 sm:mb-6 drop-shadow-2xl golden-pulse">
          Children of Christ
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gold-200 mb-6 sm:mb-8 font-medium drop-shadow-lg max-w-2xl mx-auto">
          Helping Families in Need – One Pallet at a Time
        </p>
        <div className="text-sm md:text-base text-gold-300 bg-black/60 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 inline-block border border-gold-600/30 mb-8 sm:mb-12">
          <p>501(c)(3) nonprofit • EIN: 99-2902695 • All donations are tax-deductible</p>
        </div>

        {/* Call to action buttons - Mobile optimized */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-black font-bold text-base sm:text-lg py-6 px-8"
          >
            <Link href="#donate">Donate Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold-500 text-gold-400 hover:bg-gold-900/20 hover:text-gold-300 bg-black/50 text-base sm:text-lg py-6 px-8"
          >
            <Link href="#apply">Apply for Help</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator - Hidden on small screens */}
      <div className="absolute bottom-8 left-0 right-0 hidden md:flex justify-center animate-bounce">
        <ChevronDown className="h-8 w-8 text-gold-400" />
      </div>
    </section>
  )
}
