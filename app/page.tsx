import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ProgressSection } from "@/components/progress-section"
import { ServicesSection } from "@/components/services-section"
import { GiftSection } from "@/components/gift-section"
import { FaqSection } from "@/components/faq-section"
import { EndangeredSection } from "@/components/endangered-section"
import { Footer } from "@/components/footer"

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

const shippingDetails = {
  "@type": "OfferShippingDetails",
  "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "RUB" },
  "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "RU" },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
    "transitTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" },
  },
}

const returnPolicy = {
  "@type": "MerchantReturnPolicy",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 30,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn",
  "applicableCountry": "RU",
}

const productsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Подарить дерево — варианты посадки",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "Одно дерево",
        "description": "Сертификат с именем получателя, GPS-координаты дерева, фотоотчёт через год",
        "url": "https://podariles.ru/#gift",
        "image": "https://podariles.ru/images/our_forest1.jpg",
        "brand": { "@type": "Brand", "name": "ЛесВозрождение" },
        "offers": {
          "@type": "Offer",
          "price": "250",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "url": "https://podariles.ru/#gift",
          "shippingDetails": shippingDetails,
          "hasMerchantReturnPolicy": returnPolicy,
        },
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "name": "Роща (5 деревьев)",
        "description": "Персональный сертификат, GPS-координаты всех деревьев, табличка с именем в роще",
        "url": "https://podariles.ru/#gift",
        "image": "https://podariles.ru/images/our_forest2.jpg",
        "brand": { "@type": "Brand", "name": "ЛесВозрождение" },
        "offers": {
          "@type": "Offer",
          "price": "1000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "url": "https://podariles.ru/#gift",
          "shippingDetails": shippingDetails,
          "hasMerchantReturnPolicy": returnPolicy,
        },
      },
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "name": "VIP посадка",
        "description": "VIP-сертификат, именная табличка, фотоотчёт о посадке",
        "url": "https://podariles.ru/#gift",
        "image": "https://podariles.ru/images/our_forest3.jpg",
        "brand": { "@type": "Brand", "name": "ЛесВозрождение" },
        "offers": {
          "@type": "Offer",
          "price": "3000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "url": "https://podariles.ru/#gift",
          "shippingDetails": shippingDetails,
          "hasMerchantReturnPolicy": returnPolicy,
        },
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }} />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <ProgressSection />
        <ServicesSection />
        <GiftSection />
        <FaqSection />
        <EndangeredSection />
        <Footer />
      </main>
    </>
  )
}
