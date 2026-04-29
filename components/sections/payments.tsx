import { CreditCard, Smartphone, Building2, ShieldCheck } from "lucide-react"

const methods = [
  {
    icon: CreditCard,
    title: "Tarjeta de Crédito/Débito",
    description: "Visa, Mastercard, American Express. Cobro automático mensual.",
  },
  {
    icon: Smartphone,
    title: "Yape · Plin",
    description: "Pagos manuales en soles desde cualquier banco peruano.",
  },
  {
    icon: Building2,
    title: "Transferencia BCP / Interbank",
    description: "Para empresas con facturación corporativa y RUC.",
  },
  {
    icon: ShieldCheck,
    title: "Pago seguro Stripe",
    description: "Encriptación PCI-DSS nivel 1. Tus datos siempre protegidos.",
  },
]

export function Payments() {
  return (
    <section id="pagos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-mono uppercase tracking-wider text-primary">Pagos</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
            Métodos de pago <span className="text-gradient-brand">para todos.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Tu suscripción mensual KIBO se procesa de forma segura. Aceptamos los principales métodos en Perú.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <div className="grid place-items-center size-11 rounded-lg bg-primary/10 text-primary mb-4">
                <m.icon className="size-5" />
              </div>
              <h3 className="font-display text-base">{m.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
