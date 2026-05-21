"use client"

import Image from "next/image"
import { AlertTriangle, Flame, Bug, Thermometer, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const reasons = [
  {
    icon: Flame,
    title: "Лесные пожары",
    description: "Ежегодно миллионы гектаров леса уничтожаются огнём, оставляя после себя выжженную землю."
  },
  {
    icon: Bug,
    title: "Вредители и болезни",
    description: "Короед и другие вредители массово поражают ослабленные деревья, уничтожая целые массивы."
  },
  {
    icon: Thermometer,
    title: "Изменение климата",
    description: "Засухи и экстремальные температуры ослабляют деревья и нарушают естественное восстановление."
  }
]

export function EndangeredSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-14 bg-accent/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl mb-3 text-foreground flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-accent" />
            Помощь умирающим лесам
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
            Некоторые леса находятся на грани исчезновения. Такие экосистемы требуют особого внимания 
            и комплексного подхода к восстановлению.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Image — 1/3 */}
          <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-0 lg:h-full rounded-2xl overflow-hidden">
            <Image 
              src="/images/dying-forest.jpg" 
              alt="Умирающий лес, требующий помощи"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Причины и действия — 2/3 */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-5 mb-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center">
                    <reason.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm mb-5">
              У нас есть специальная программа по спасению таких лесов. Если вы хотите 
              внести значимый вклад в сохранение редких экосистем — мы обсудим участие 
              в индивидуальном порядке.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToContact} variant="default" className="gap-2">
                <Heart className="h-4 w-4" />
                Хочу помочь
              </Button>
              <Button onClick={scrollToContact} variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Узнать подробнее
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
