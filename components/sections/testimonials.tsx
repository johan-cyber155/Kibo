import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Gracias a KIBO entrenamos modelos de visión por computadora sin gastar S/ 30k en una RTX. Cambiamos de GPU según el proyecto.",
    author: "Camila Salazar",
    role: "Lead ML Engineer",
    company: "Innova AI Labs",
  },
  {
    quote:
      "Tener Vision Pro y HoloLens disponibles para clientes nos abrió mercado en arquitectura BIM. Soporte impecable.",
    author: "Diego Cárdenas",
    role: "Director Creativo",
    company: "Estudio Volcán",
  },
  {
    quote:
      "El plan Studio es ideal para nuestra startup. Tres equipos, un costo predecible y siempre tecnología puntera.",
    author: "Mariana Quispe",
    role: "CEO & Cofundadora",
    company: "Mistura3D",
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="relative py-24 sm:py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-mono uppercase tracking-wider text-primary">Testimonios</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
            Equipos que ya están <span className="text-gradient-brand">construyendo el futuro.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="relative rounded-2xl border border-border bg-background p-6 flex flex-col"
            >
              <Quote className="size-7 text-primary/40" aria-hidden="true" />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground text-pretty">
                {`"${t.quote}"`}
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                <div
                  className="grid place-items-center size-10 rounded-full bg-gradient-to-br from-primary to-accent text-white font-display text-sm"
                  aria-hidden="true"
                >
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{t.author}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
