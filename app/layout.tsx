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
  title: 'ЛесВозрождение - Восстанавливаем леса вместе',
  description: 'Мы сажаем деревья взамен вырубленных. Подарите дерево близкому человеку и помогите природе.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.jpg',
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
