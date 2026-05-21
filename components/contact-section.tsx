"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl md:text-5xl mb-6 text-foreground">
                Свяжитесь с нами
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Готовы сделать заказ или есть вопросы? Напишите нам, и мы ответим в течение 24 часов.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:info@lesvozrozhdenie.ru" className="text-foreground hover:text-primary transition-colors">
                      info@lesvozrozhdenie.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <a href="tel:+74951234567" className="text-foreground hover:text-primary transition-colors">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Офис</p>
                    <p className="text-foreground">Москва, ул. Лесная, 15</p>
                  </div>
                </div>
              </div>

              {/* Payment info */}
              <div className="mt-10 p-6 rounded-xl bg-card border border-border">
                <h3 className="font-serif text-lg mb-3 text-foreground">Способы оплаты</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Принимаем оплату банковскими картами, через СБП, а также безналичный расчёт для юридических лиц. 
                  После оплаты вы получите сертификат в течение 1 рабочего дня.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-serif text-2xl mb-6 text-foreground">Оставить заявку</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TreePine className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">Спасибо за заявку!</h4>
                  <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Ваше имя</FieldLabel>
                      <Input placeholder="Иван Петров" required />
                    </Field>

                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input type="email" placeholder="ivan@example.com" required />
                    </Field>

                    <Field>
                      <FieldLabel>Телефон</FieldLabel>
                      <Input type="tel" placeholder="+7 (___) ___-__-__" />
                    </Field>

                    <Field>
                      <FieldLabel>Сообщение</FieldLabel>
                      <Textarea 
                        placeholder="Расскажите, какой подарок хотите оформить или задайте вопрос..." 
                        rows={4}
                      />
                    </Field>
                  </FieldGroup>

                  <Button type="submit" className="w-full mt-6" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
