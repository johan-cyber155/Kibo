import { Search, CreditCard, Truck, RefreshCw } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Elige tu hardware",
    description: "Explora nuestro catálogo de GPUs, lentes AR/VR e impresoras 3D y selecciona los que necesitas.",
  },
  {
    icon: CreditCard,
    title: "Suscríbete a un plan",
    description: "Activa tu suscripción mensual con pago seguro vía Stripe. Sin contratos largos ni letra chica.",
  },
  {
    icon: Truck,
    title: "Recibe en tu puerta",
    description: "Coordinamos entrega e instalación en Arequipa en menos de 48 horas. Listos para usar.",
  },
  {
    icon: RefreshCw,
    title: "Actualiza cuando quieras",
    description: "Sale un nuevo modelo? Cambia tu equipo según tu plan. Adiós a la obsolescencia.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-mono uppercase tracking-wider text-primary">Proceso</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">Simple, rápido y sin sorpresas.</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            En 4 pasos tienes el hardware que necesitas trabajando para ti, con soporte completo.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <span className="absolute top-5 right-5 font-display text-4xl text-muted-foreground/30">
                0{i + 1}
              </span>
              <div className="grid place-items-center size-11 rounded-lg bg-primary/10 text-primary mb-5">
                <step.icon className="size-5" />
              </div>
              <h3 className="font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
