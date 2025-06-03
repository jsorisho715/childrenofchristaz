import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">About Us</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content - Mobile optimized */}
          <div className="space-y-5 md:space-y-6 order-2 md:order-1">
            <p className="text-base md:text-lg text-gold-200 leading-relaxed">
              Children of Christ is a 501(c)(3) nonprofit organization based in Phoenix, Arizona. We distribute surplus
              goods at no cost to individuals and families who qualify through our needs-based application process. Our
              outreach is supported by generous donor contributions.
            </p>

            <div className="bg-gray-900 rounded-lg p-4 md:p-6 shadow-md border border-gold-600/30">
              <h3 className="text-lg md:text-xl font-bold text-gold-300 mb-3 md:mb-4">Contact Information</h3>
              <div className="space-y-2 text-gold-200 text-sm md:text-base">
                <p>
                  <strong>Address:</strong> 22039 N 24th Ave, Phoenix, AZ 85027
                </p>
                <p>
                  <strong>EIN:</strong> 99-2902695
                </p>
                <p>
                  <strong>Status:</strong> 501(c)(3) Nonprofit Organization
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gold-900/30 to-gold-800/30 rounded-lg p-4 md:p-6 border border-gold-600/50">
              <h3 className="text-lg md:text-xl font-bold text-gold-300 mb-2 md:mb-3">Our Mission</h3>
              <p className="text-gold-200 leading-relaxed text-sm md:text-base">
                Everyone is a child of Christ. Our mission is to use the resources available to us—gifts, donations, time, and faith—to serve our neighbors and uplift our community in the spirit of Christ's love.
              </p>
            </div>
          </div>

          {/* Image - Mobile optimized */}
          <div className="relative order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[4/3] max-h-[500px]">
              <Image
                src="/background_jesus_gold.jpg"
                alt="Children of Christ ministry"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gold-300">Serving with Faith</h3>
                <p className="text-gold-200 text-sm md:text-base">
                  "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to
                  drink..." - Matthew 25:35
                </p>
              </div>
            </div>

            {/* Decorative golden border effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 rounded-2xl opacity-30 blur-sm -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
