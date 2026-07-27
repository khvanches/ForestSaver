import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ЛесВозрождение",
  "url": "https://podariles.ru",
  "logo": "https://podariles.ru/favikon.png",
  "email": "podariles@mail.ru",
  "description": "Подарите близкому именное дерево в Смоленской области. Сертификат с GPS-координатами. Вместе восстанавливаем леса России.",
  "areaServed": { "@type": "State", "name": "Смоленская область" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

        <Script id="yandex-metrika" strategy="beforeInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111069584', 'ym');

            ym(111069584, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/111069584" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
