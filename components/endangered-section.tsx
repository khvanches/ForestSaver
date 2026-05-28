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
    <section className="py-[4.9rem] bg-accent/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-9">
          <h2 className="font-serif text-[1.65rem] md:text-[2.0625rem] mb-[0.825rem] text-foreground flex items-center justify-center gap-[0.55rem]">
            <AlertTriangle className="h-[1.65rem] w-[1.65rem] text-accent" />
            Помощь умирающим лесам
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-[0.9625rem]">
            Некоторые леса находятся на грани исчезновения. Такие экосистемы требуют особого внимания 
            и комплексного подхода к восстановлению.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 items-stretch">
          {/* Image — 1/3 */}
          <div className="relative min-h-[308px] sm:min-h-[352px] lg:min-h-0 lg:h-full rounded-2xl overflow-hidden">
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
            <div className="space-y-[1.375rem] mb-[1.65rem]">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-[1.1rem] items-start">
                  <div className="flex-shrink-0 w-[3.025rem] h-[3.025rem] rounded-lg bg-accent/20 flex items-center justify-center">
                    <reason.icon className="h-[1.375rem] w-[1.375rem] text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[1.1rem] text-foreground mb-[0.275rem]">{reason.title}</h3>
                    <p className="text-muted-foreground text-[0.9625rem] leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed text-[0.9625rem] mb-[1.375rem]">
              У нас есть специальная программа по спасению таких лесов. Если вы хотите 
              внести значимый вклад в сохранение редких экосистем — мы обсудим участие 
              в индивидуальном порядке.
            </p>

            <div className="flex flex-col sm:flex-row gap-[1.1rem]">
              <Button onClick={scrollToContact} variant="default" className="gap-2 text-[1.1rem] px-[1.65rem] py-[0.825rem] h-auto">
                <Heart className="h-[1.1rem] w-[1.1rem]" />
                Хочу помочь
              </Button>
              <Button onClick={scrollToContact} variant="outline" className="gap-2 text-[1.1rem] px-[1.65rem] py-[0.825rem] h-auto">
                <MessageCircle className="h-[1.1rem] w-[1.1rem]" />
                Узнать подробнее
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
