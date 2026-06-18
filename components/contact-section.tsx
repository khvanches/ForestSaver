"use client"

import { useState } from "react"
import { Send, TreePine, Users, Wrench, HeartHandshake, Loader2 } from "lucide-react"
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
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {})
    setLoading(false)
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

            {/* Заглушка */}
            <div className="bg-card p-8 rounded-2xl border border-border flex flex-col items-center justify-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <TreePine className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground">Напишите нам</h3>
              <p className="text-muted-foreground leading-relaxed">
                Форма заявок пока недоступна. Если вы хотите помочь лесу — напишите нам напрямую, и мы обязательно ответим.
              </p>
              <a
                href="mailto:podariles@mail.ru"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                podariles@mail.ru
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
