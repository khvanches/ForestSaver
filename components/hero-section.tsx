"use client"

import Image from "next/image"
import { TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToGift = () => {
    document.getElementById("gift")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="overflow-hidden">
      {/* Hero image at top */}
      <div className="relative h-[33vh] md:h-[40vh] w-full">
        <Image 
          src="/images/our_forest1.jpg" 
          alt="Хвойный лес"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <TreePine className="h-12 w-12 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
              ЛесВозрождение
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-balance text-foreground">
            Возвращаем жизнь
            <br />
            <span className="text-primary">лесам Смоленска</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Каждое посаженное дерево — это глоток свежего воздуха, дом для птиц и животных, 
            и ваш вклад в будущее планеты. Присоединяйтесь к нам.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToGift}
              className="text-lg px-8 py-6"
            >
              Подарить дерево
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6"
            >
              Узнать больше
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-primary">7 000+</p>
              <p className="text-muted-foreground mt-1">деревьев посажено</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-primary">12</p>
              <p className="text-muted-foreground mt-1">гектаров восстановлено</p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-primary">2 500+</p>
              <p className="text-muted-foreground mt-1">сертификатов выдано</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
