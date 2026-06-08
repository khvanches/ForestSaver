import Link from "next/link"
import { TreePine } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <TreePine className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <span className="font-serif text-xl text-foreground">ЛесВозрождение</span>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            Вместе мы делаем мир зеленее
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/oferta" className="hover:text-foreground transition-colors">
              Публичная оферта
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
