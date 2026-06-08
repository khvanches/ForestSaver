import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { TreePine, Flame, Bug, Thermometer, Axe, AlertTriangle, Heart } from "lucide-react"
import { ContactSection } from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Умирающие леса — ЛесВозрождение",
  description: "Почему леса России погибают и как мы можем это остановить вместе",
}

const threats = [
  {
    icon: Flame,
    title: "Лесные пожары",
    lead: "Ежегодно Россия теряет от 5 до 15 миллионов гектаров леса — это площадь, сравнимая с территорией Греции.",
    paragraphs: [
      "Большинство пожаров возникает по вине человека: брошенный окурок, непотушенный костёр, сельскохозяйственный пал, вышедший из-под контроля. Но в последние годы климатические изменения делают лесные экосистемы всё более уязвимыми: аномальная жара и длительные засухи превращают лесную подстилку в легко воспламеняемый материал.",
      "После пожара почва остаётся выжженной на десятилетия. Уничтожается не только древостой, но и семенной фонд, микробиом почвы, норные животные — вся пищевая цепочка рушится в считанные часы. Без активного вмешательства человека такой участок не восстановится самостоятельно ещё 50–80 лет.",
    ],
    image: "/images/dying-forest.jpg",
    imageAlt: "Выжженный лес после пожара",
    imageRight: false,
  },
  {
    icon: Bug,
    title: "Вредители и болезни",
    lead: "Короед-типограф уничтожил в Европе и России десятки миллионов елей. В ослабленном лесу он не враг — он симптом.",
    paragraphs: [
      "Здоровое дерево способно противостоять вредителям: оно выделяет смолу и фитонциды, защищая себя. Но ослабленные засухой, загрязнением или неправильными рубками деревья теряют этот иммунитет. Короед, корневые гнили, ржавчинные грибки и другие патогены захватывают сразу тысячи гектаров.",
      "Особую угрозу представляют инвазивные виды, завезённые с импортными товарами или занесённые потеплевшим климатом. Они атакуют деревья, у которых нет выработанного эволюцией иммунитета, и распространяются с катастрофической скоростью — от единичного дерева до целого массива за один сезон.",
    ],
    image: "/images/forest-3.jpg",
    imageAlt: "Лес, поражённый короедом",
    imageRight: true,
  },
  {
    icon: Thermometer,
    title: "Изменение климата",
    lead: "Среднегодовая температура в России растёт в 2,5 раза быстрее, чем в среднем по планете. Леса не успевают адаптироваться.",
    paragraphs: [
      "Смещение климатических зон означает, что деревья, приспособленные к определённым условиям, оказываются в чужеродной среде. Ель не переносит длительную засуху, сосна страдает от промерзания при отсутствии снегового покрова. Виды, которые могли бы заменить погибающие деревья, не успевают мигрировать на север с нужной скоростью.",
      "Вечная мерзлота, которая служила фундаментом для бореальных лесов Сибири, начинает таять. Деревья теряют опору и падают, формируя так называемые «пьяные леса». Болота, образующиеся на месте оттаявшей мерзлоты, выбрасывают в атмосферу колоссальные объёмы метана — что ещё больше разгоняет потепление.",
    ],
    image: "/images/forest-4.jpg",
    imageAlt: "Засохший лес как последствие засухи",
    imageRight: false,
  },
  {
    icon: Axe,
    title: "Незаконные вырубки",
    lead: "По оценкам WWF, от 20 до 35% всей древесины в России заготавливается нелегально. Цена — 1,5 млн гектаров леса ежегодно.",
    paragraphs: [
      "Промышленная вырубка сама по себе не является катастрофой при правильном подходе: ответственное лесопользование предусматривает восстановительные посадки. Но нелегальные рубки не оставляют ничего — ни семенных деревьев, ни подроста, ни почвенного слоя. После них остаётся лесопромышленная пустошь.",
      "Особенно уязвимы леса в труднодоступных районах Сибири и Дальнего Востока, где контроль минимален. Там под топор идут вековые кедровники и пихтачи — экосистемы, которые формировались сотни лет и которые невозможно восстановить за одно человеческое поколение.",
    ],
    image: "/images/forest-2.jpg",
    imageAlt: "Последствия вырубки леса",
    imageRight: true,
  },
]

export default function DyingForestsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <TreePine className="h-7 w-7 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-xl text-foreground">ЛесВозрождение</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[420px] md:h-[540px] overflow-hidden">
        <Image
          src="/images/dying-forest.jpg"
          alt="Умирающий лес"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-widest">Экологический кризис</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-5 text-balance max-w-3xl">
            Умирающие леса России
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Каждый год страна теряет миллионы гектаров леса. Мы рассказываем, почему это происходит
            и как каждый из нас может помочь остановить катастрофу.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Леса покрывают около 45% территории России — это почти четверть всех лесов планеты.
            Но этот колоссальный природный капитал исчезает быстрее, чем успевает восстанавливаться.
            Четыре главных угрозы ускоряют этот процесс — и каждая из них требует нашего внимания.
          </p>
        </div>
      </section>

      {/* Threat sections */}
      {threats.map((threat, index) => (
        <section
          key={index}
          className={`py-20 ${index % 2 === 0 ? "bg-background" : "bg-secondary/20"}`}
        >
          <div className="container mx-auto px-4">
            <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${threat.imageRight ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <div className={`relative h-72 md:h-96 rounded-2xl overflow-hidden ${threat.imageRight ? "lg:order-2" : ""}`}>
                <Image
                  src={threat.image}
                  alt={threat.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className={threat.imageRight ? "lg:order-1" : ""}>
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <threat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">{threat.title}</h2>
                </div>
                <p className="text-foreground font-medium leading-relaxed mb-4">{threat.lead}</p>
                {threat.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* What we do */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-5">
                Что делаем мы
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ЛесВозрождение работает в Смоленской области — одном из регионов, где леса сильнее всего пострадали
                от пожаров и вырубок последних десятилетий. Мы высаживаем деревья там, где без помощи человека
                природе не справиться самостоятельно.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Каждое посаженное дерево получает GPS-координаты и именной сертификат. Мы ведём фотолетопись
                каждого участка — вы всегда можете увидеть, как растёт ваше дерево.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Если вы хотите поддержать нашу работу или узнать об участии в специальной программе
                по спасению критически важных лесных участков — напишите нам. Мы обсудим всё в индивидуальном порядке.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <Heart className="h-4 w-4" />
                Хочу помочь
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image src="/images/our_forest1.jpg" alt="Наш лес" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden mt-6">
                <Image src="/images/our_forest2.jpg" alt="Наш лес" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image src="/images/our_forest3.jpg" alt="Наш лес" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden mt-6">
                <Image src="/images/our_forest4.png" alt="Наш лес" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </div>
  )
}
