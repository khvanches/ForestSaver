"use client"

import { useState } from "react"
import { Gift, TreePine, Trees, TreeDeciduous, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
    features: ["VIP-сертификат", "С именной табличкой", "Фотоотчет о посадке"]
  }
]

export function GiftSection() {
  const [selectedGift, setSelectedGift] = useState("grove")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", recipient: "" })
  const [agreed, setAgreed] = useState(true)

  const selectedOption = giftOptions.find(o => o.id === selectedGift)!

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) setSubmitted(false)
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
          <Button size="lg" onClick={() => setDialogOpen(true)} className="text-lg px-10 py-6">
            Оформить подарок
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl leading-snug">
              Создание заявки на посадку —{" "}
              <span className="text-primary">{selectedOption.title} · {selectedOption.price}</span>
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <p className="font-serif text-2xl text-foreground mb-3">Ваша заявка принята</p>
              <p className="text-muted-foreground">Мы свяжемся с вами по почте в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Имя <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Почта <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@example.com"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Телефон <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 900 000-00-00"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="recipient">
                  Кому предназначен подарок <span className="text-red-500">*</span>
                  <span className="text-muted-foreground font-normal"> (будет указано на сертификате)</span>
                </Label>
                <Input
                  id="recipient"
                  placeholder="Любимой Маме, Лучшему Другу..."
                  required
                  value={form.recipient}
                  onChange={e => setForm(f => ({ ...f, recipient: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full mt-2" size="lg" disabled={!agreed}>
                Отправить заявку
              </Button>

              <div className="flex items-start gap-3 mt-4">
                <Checkbox
                  id="agreed"
                  checked={agreed}
                  onCheckedChange={v => setAgreed(!!v)}
                  className="mt-0.5"
                />
                <Label htmlFor="agreed" className="text-sm text-foreground font-normal leading-snug cursor-pointer whitespace-nowrap">
                  Я принимаю <Link href="/oferta" target="_blank" className="text-primary underline underline-offset-2 hover:text-primary/80">условия оферты</Link> и <Link href="/privacy" target="_blank" className="text-primary underline underline-offset-2 hover:text-primary/80">политику конфиденциальности</Link>
                </Label>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
