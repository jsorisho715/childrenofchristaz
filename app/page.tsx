import HeroSection from "@/components/HeroSection"
import DonateSection from "@/components/DonateSection"
import ApplySection from "@/components/ApplySection"
import AboutSection from "@/components/AboutSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <DonateSection />
      <ApplySection />
      <AboutSection />
      <Footer />
    </main>
  )
}
