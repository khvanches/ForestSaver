import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Подарить дерево — Именное дерево с сертификатом",
  description: "Подарите близкому именное дерево в Смоленской области. Получите сертификат с GPS-координатами. От 250 ₽. Помогите восстановить леса России.",
  openGraph: {
    title: "Подарить дерево — Именное дерево с сертификатом",
    description: "Подарите близкому именное дерево в Смоленской области. Получите сертификат с GPS-координатами. От 250 ₽.",
    url: "https://podariles.ru",
    images: [{ url: "/images/hero-forest.jpg", width: 1200, height: 800, alt: "Лес Смоленской области" }],
  },
}
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ProgressSection } from "@/components/progress-section"
import { ServicesSection } from "@/components/services-section"
import { GiftSection } from "@/components/gift-section"
import { EndangeredSection } from "@/components/endangered-section"
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
      <Footer />
    </main>
  )
}
