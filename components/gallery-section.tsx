import Image from "next/image"

const images = [
  {
    src: "/images/our_forest1.jpg",
    alt: "Хвойный лес утром",
  },
  {
    src: "/images/our_forest2.jpg",
    alt: "Молодой еловый лес",
  },
  {
    src: "/images/our_forest3.jpg",
    alt: "Посадка молодых саженцев",
  },
  {
    src: "/images/our_forest4.png",
    alt: "Молодые саженцы",
  },
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-16 bg-green-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Наши леса
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Фотографии из наших проектов по восстановлению лесов Смоленской области
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-green-dark/80 to-transparent">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
