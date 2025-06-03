"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll events to change navigation appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest("[data-nav-container]")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      data-nav-container
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-gold-400 hover:text-gold-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Children of Christ
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="#donate" label="Donate" />
            <NavLink href="#apply" label="Apply for Help" />
            <NavLink href="#about" label="About Us" />
            <Button
              asChild
              size="sm"
              className="ml-2 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-black font-bold"
            >
              <Link href="#donate">Donate Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gold-400 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-6">
          <MobileNavLink href="#donate" label="Donate" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="#apply" label="Apply for Help" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="#about" label="About Us" onClick={() => setIsMenuOpen(false)} />
          <Button
            asChild
            className="w-full mt-4 py-6 text-lg bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-black font-bold"
          >
            <Link href="#donate" onClick={() => setIsMenuOpen(false)}>
              Donate Now
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-gold-300 hover:text-gold-100 rounded-md text-sm font-medium transition-colors"
    >
      {label}
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      className="text-xl text-gold-300 hover:text-gold-100 font-medium py-3 border-b border-gold-800/30 flex items-center justify-between"
      onClick={onClick}
    >
      {label}
    </Link>
  )
}
