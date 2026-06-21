import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-serif'
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL("https://podariles.ru"),
  title: {
    default: "ЛесВозрождение — Подарите дерево, помогите природе",
    template: "%s | ЛесВозрождение",
  },
  description: "Подарите близкому именное дерево в Смоленской области. Сертификат с GPS-координатами от 250 ₽. Вместе восстанавливаем леса России.",
  openGraph: {
    siteName: "ЛесВозрождение",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/hero-forest.jpg", width: 1200, height: 800, alt: "Лес Смоленской области" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favikon.png",
    apple: "/favikon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
