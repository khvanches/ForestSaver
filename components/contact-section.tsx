"use client"

import { useState } from "react"
import { Send, TreePine, Users, Wrench, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import Link from "next/link"

const ways = [
  {
    icon: Users,
    title: "Волонтёрство",
    description: "Участие в посадках и уходе за восстанавливаемыми участками"
  },
  {
    icon: Wrench,
    title: "Экспертиза",
    description: "Знания в лесоведении, экологии, землеустройстве или праве"
  },
  {
    icon: HeartHandshake,
    title: "Поддержка",
    description: "Помощь в финансировании отдельных участков или программ"
  }
]

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [agreed, setAgreed] = useState(true)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

            {/* Left */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-5 text-foreground">
                Хотите помочь лесу?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Мы принимаем заявки от тех, кто хочет участвовать в спасении критически
                важных лесных участков. Каждый случай рассматриваем индивидуально —
                вместе находим, чем именно вы можете быть полезны природе.
              </p>

              <div className="space-y-5">
                {ways.map((way) => (
                  <div key={way.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <way.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-0.5">{way.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{way.description}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Form */}
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-serif text-2xl mb-6 text-foreground">Оставить заявку</h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TreePine className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">Заявка принята</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Мы изучим вашу заявку и свяжемся с вами в ближайшее время, чтобы обсудить участие.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Ваше имя <span className="text-red-500">*</span></FieldLabel>
                      <Input placeholder="Иван Петров" required />
                    </Field>

                    <Field>
                      <FieldLabel>Email <span className="text-red-500">*</span></FieldLabel>
                      <Input type="email" placeholder="ivan@example.com" required />
                    </Field>

                    <Field>
                      <FieldLabel>Телефон <span className="text-red-500">*</span></FieldLabel>
                      <Input type="tel" placeholder="+7 900 000-00-00" required />
                    </Field>

                    <Field>
                      <FieldLabel>Как вы можете помочь? <span className="text-red-500">*</span></FieldLabel>
                      <Textarea
                        placeholder="Расскажите о себе: чем занимаетесь, какой опыт есть, как видите своё участие..."
                        rows={4}
                        required
                      />
                    </Field>
                  </FieldGroup>

                  <Button type="submit" className="w-full mt-6" size="lg" disabled={!agreed}>
                    <Send className="h-4 w-4 mr-2" />
                    Отправить заявку
                  </Button>

                  <div className="flex items-start gap-3 mt-4">
                    <Checkbox
                      id="contact-agreed"
                      checked={agreed}
                      onCheckedChange={v => setAgreed(!!v)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="contact-agreed" className="text-sm text-foreground font-normal cursor-pointer whitespace-nowrap">
                      Я принимаю <Link href="/oferta" target="_blank" className="text-primary underline underline-offset-2 hover:text-primary/80">условия оферты</Link> и <Link href="/privacy" target="_blank" className="text-primary underline underline-offset-2 hover:text-primary/80">политику конфиденциальности</Link>
                    </Label>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
