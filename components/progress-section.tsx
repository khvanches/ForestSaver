"use client"

import { Star } from "lucide-react"

const reviews = [
  {
    name: "Анна К.",
    text: "Подарила дерево маме на юбилей. Она была в восторге! Получили красивый сертификат и координаты.",
    rating: 5
  },
  {
    name: "Михаил С.",
    text: "Отличная идея для корпоративного подарка. Заказали рощу для партнёров — все остались довольны.",
    rating: 5
  },
  {
    name: "Елена В.",
    text: "Через год получили фотоотчёт — наше дерево выросло! Очень трогательно.",
    rating: 5
  },
  {
    name: "Дмитрий П.",
    text: "Заказал VIP посадку на годовщину свадьбы. Именная табличка — отличная идея!",
    rating: 5
  },
  {
    name: "Ольга Н.",
    text: "Прекрасный подарок для детей. Теперь у каждого ребёнка есть своё дерево!",
    rating: 5
  },
  {
    name: "Сергей Т.",
    text: "Быстрое оформление, качественный сертификат. Рекомендую всем!",
    rating: 5
  }
]

export function ProgressSection() {
  const goal = 10000
  const planted = 7609
  const percentage = (planted / goal) * 100
  const circumference = 2 * Math.PI * 135

  return (
    <section className="py-14 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
            {/* Progress Chart */}
            <div className="text-center shrink-0">
              <h2 className="font-serif text-2xl md:text-3xl mb-8 text-foreground">
                Наша цель
              </h2>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
                  {/* Background circle */}
                  <circle
                    cx="160"
                    cy="160"
                    r="135"
                    stroke="currentColor"
                    strokeWidth="20"
                    fill="none"
                    className="text-muted"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="160"
                    cy="160"
                    r="135"
                    stroke="currentColor"
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                    className="text-primary"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (percentage / 100) * circumference}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-4xl md:text-5xl text-primary">{planted.toLocaleString('ru-RU')}</span>
                  <span className="text-base text-muted-foreground">из {goal.toLocaleString('ru-RU')}</span>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                деревьев посажено
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round(percentage)}% от цели
              </p>
            </div>

            {/* Reviews */}
            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl mb-6 text-foreground text-center lg:text-left">
                Отзывы
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((review, index) => (
                  <div 
                    key={index} 
                    className="bg-card p-4 rounded-xl border border-border"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      {`"${review.text}"`}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {review.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
