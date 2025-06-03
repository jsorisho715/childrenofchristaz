import DeploymentTroubleshooter from "@/components/DeploymentTroubleshooter"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DeploymentHelpPage() {
  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Deployment Help
            </span>
          </h1>
          <p className="text-lg text-gold-200 leading-relaxed max-w-3xl mx-auto mb-6">
            Comprehensive deployment troubleshooting and step-by-step guidance for Vercel deployment.
          </p>
          <Button asChild variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-900/20">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <DeploymentTroubleshooter />
      </div>
    </div>
  )
}
