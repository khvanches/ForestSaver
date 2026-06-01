import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ProgressSection } from "@/components/progress-section"
import { ServicesSection } from "@/components/services-section"
import { GiftSection } from "@/components/gift-section"
import { EndangeredSection } from "@/components/endangered-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ProgressSection />
      <ServicesSection />
      <GiftSection />
      <EndangeredSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
