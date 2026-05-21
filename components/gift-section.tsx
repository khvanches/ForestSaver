"use client"

import { useState } from "react"
import { Gift, TreePine, Trees, TreeDeciduous, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const giftOptions = [
  {
    id: "one",
    icon: TreePine,
    title: "Одно дерево",
    price: "250 ₽",
    description: "Идеально как символический подарок",
    features: ["Сертификат с именем получателя", "GPS-координаты дерева", "Фотоотчёт через год"]
  },
  {
    id: "grove",
    icon: Trees,
    title: "Роща (5 деревьев)",
    price: "1 000 ₽",
    description: "Популярный выбор для особых событий",
    features: ["Персональный сертификат", "GPS-координаты всех деревьев", "Табличка с именем в роще"],
    popular: true
  },
  {
    id: "vip",
    icon: TreeDeciduous,
    title: "VIP посадка",
    price: "3 000 ₽",
    description: "Премиальный вклад в будущее планеты",
    features: ["VIP-сертификат", "С именной табличкой", "Ежегодный фотоотчёт"]
  }
]

export function GiftSection() {
  const [selectedGift, setSelectedGift] = useState("grove")

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="gift" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Gift className="h-4 w-4" />
            <span className="text-sm font-medium">Особый подарок</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-foreground text-balance">
            Подарите дерево близкому человеку
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Уникальный подарок, который будет расти вместе с вашими чувствами. 
            Получатель получит красивый сертификат и сможет следить за своим деревом.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {giftOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedGift(option.id)}
              className={cn(
                "relative p-6 rounded-2xl border-2 text-left transition-all",
                selectedGift === option.id 
                  ? "border-primary bg-background shadow-lg" 
                  : "border-border bg-background hover:border-primary/30"
              )}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Популярный
                </div>
              )}
              
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <option.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="font-serif text-xl mb-1 text-foreground">{option.title}</h3>
              <p className="font-serif text-2xl text-primary mb-2">{option.price}</p>
              <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
              
              <ul className="space-y-2">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={scrollToContact} className="text-lg px-10 py-6">
            Оформить подарок
          </Button>
        </div>
      </div>
    </section>
  )
}
