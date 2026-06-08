import { Leaf, TreePine, Sun, Droplets } from "lucide-react"

const benefits = [
  {
    icon: TreePine,
    title: "Восстановление экосистем",
    description: "Мы сажаем деревья там, где леса были вырублены или пострадали от пожаров, возвращая природе её первозданный вид."
  },
  {
    icon: Leaf,
    title: "Чистый воздух",
    description: "Одно взрослое дерево производит кислород для семьи из четырёх человек на целый год."
  },
  {
    icon: Sun,
    title: "Борьба с изменением климата",
    description: "Деревья поглощают углекислый газ, помогая снизить последствия глобального потепления."
  },
  {
    icon: Droplets,
    title: "Сохранение водных ресурсов",
    description: "Леса регулируют водный баланс, предотвращают эрозию почвы и защищают реки от пересыхания."
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-foreground text-balance">
            Почему важно восстанавливать леса
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Леса — это лёгкие нашей планеты. Они дарят нам кислород, защищают от наводнений, 
            дают пристанище миллионам видов животных и делают нашу землю прекраснее.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-5 p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center px-12 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-colors"
          >
            Хочу помочь
          </a>
        </div>
      </div>
    </section>
  )
}
