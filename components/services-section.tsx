"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Посадка деревьев",
    content: "Мы высаживаем саженцы местных пород деревьев — сосны, берёзы, дубы, ели — в регионах, где леса нуждаются в восстановлении. Каждый саженец проходит тщательный отбор и подготовку."
  },
  {
    title: "Уход за молодыми посадками",
    content: "В течение первых трёх лет мы ухаживаем за посаженными деревьями: защищаем от вредителей, обеспечиваем полив в засушливые периоды и контролируем рост."
  },
  {
    title: "Партнёрство с лесничествами",
    content: "Мы работаем совместно с государственными лесничествами и экологическими организациями, чтобы выбирать оптимальные места для посадки и обеспечить долгосрочный уход."
  },
  {
    title: "Экологическое просвещение",
    content: "Проводим образовательные программы для школ и организаций, рассказываем о важности лесов и приглашаем на волонтёрские посадки."
  }
]

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-foreground text-center text-balance">
            Что мы делаем
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed">
            Наша работа — это комплексный подход к восстановлению лесов
          </p>

          <div className="divide-y divide-border border-y border-border">
            {services.map((service, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-5 flex items-center justify-between text-left hover:text-primary transition-colors"
                >
                  <span className="font-serif text-xl text-foreground">{service.title}</span>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )} 
                  />
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                  )}
                >
                  <p className="text-muted-foreground leading-relaxed pr-8">
                    {service.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
