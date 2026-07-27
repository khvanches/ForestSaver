"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faq = [
  {
    question: "Что получит человек, которому я дарю дерево?",
    answer: "Именной сертификат в электронном виде: имя получателя, номер сертификата и GPS-координаты места посадки. В тарифах «Роща» и «VIP» добавляется табличка с именем, в «VIP» — ещё и фотоотчёт с места посадки."
  },
  {
    question: "Где именно сажают деревья?",
    answer: "В Смоленской области — на участках, где лес нуждается в восстановлении. Породы подбираем местные: сосна, берёза, дуб, ель. Места посадки согласуем с лесничествами."
  },
  {
    question: "Как проходит оплата?",
    answer: "Вы оставляете заявку на сайте, мы отвечаем письмом со ссылкой на оплату через СБП. После оплаты автоматически формируется чек, а сертификат приходит на указанную почту."
  },
  {
    question: "Когда дерево будет посажено?",
    answer: "Сертификат вы получаете сразу после оплаты, а сама посадка привязана к сезону — деревья высаживают весной и осенью. Мы сообщим, в какую посадку попадёт ваше дерево."
  },
  {
    question: "Это нормальный подарок вместо цветов?",
    answer: "Да, и это основная идея: букет живёт неделю, а посаженное дерево остаётся. Эко-подарок уместен на день рождения, юбилей, свадьбу или как благодарность — сертификат можно вручить лично или отправить письмом."
  },
  {
    question: "Можно ли подарить дерево от компании?",
    answer: "Да. Корпоративные эко-подарки сотрудникам и клиентам оформляем от 5 деревьев, с общим или именными сертификатами. Напишите нам — обсудим объём и оформление."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faq.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-foreground text-center text-balance flex items-center justify-center gap-3">
            <HelpCircle className="h-8 w-8 text-primary shrink-0" />
            Ответы на вопросы
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed">
            Коротко о том, как всё устроено — от заявки до посаженного дерева
          </p>

          <div className="divide-y divide-border border-y border-border">
            {faq.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left hover:text-primary transition-colors"
                >
                  <span className="font-serif text-xl text-foreground">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-60 pb-5" : "max-h-0"
                  )}
                >
                  <p className="text-muted-foreground leading-relaxed pr-8">
                    {item.answer}
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
