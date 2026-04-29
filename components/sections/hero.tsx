import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Eye, Printer, Sparkles, ArrowRight, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden noise-bg">
      {/* Grid background */}
      <div
        className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              <span>Hardware-as-a-Service · Arequipa, Perú</span>
            </div>

            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              El futuro no se <span className="text-gradient-brand">compra</span>.
              <br />
              <span className="text-gradient-brand">Se suscribe.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed text-pretty">
              GPUs de última generación, lentes AR/VR e impresoras 3D profesionales bajo un modelo de suscripción
              mensual. Sin grandes desembolsos. Cambia, escala o cancela cuando necesites.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-brand">
                <Link href="#planes">
                  Ver planes
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:bg-secondary/50 bg-transparent">
                <Link href="#productos">Explorar catálogo</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Garantía total incluida</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square max-w-md mx-auto">
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl"
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-2 grid-rows-2 gap-4 h-full">
                <FloatCard
                  icon={<Cpu className="size-6" />}
                  label="GPU"
                  value="RTX 5090"
                  meta="32GB GDDR7"
                  delay="0s"
                />
                <FloatCard
                  icon={<Eye className="size-6" />}
                  label="AR/VR"
                  value="Vision Pro"
                  meta="Micro-OLED 4K"
                  delay="-2s"
                  className="mt-8"
                />
                <FloatCard
                  icon={<Printer className="size-6" />}
                  label="3D"
                  value="Bambu X1C"
                  meta="500 mm/s"
                  delay="-4s"
                  className="-mt-8"
                />
                <FloatCard
                  icon={<Sparkles className="size-6" />}
                  label="Studio"
                  value="S/ 499"
                  meta="hasta 3 equipos"
                  delay="-1s"
                  highlight
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatCard({
  icon,
  label,
  value,
  meta,
  delay,
  className,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  value: string
  meta: string
  delay: string
  className?: string
  highlight?: boolean
}) {
  return (
    <div
      className={[
        "relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 flex flex-col justify-between animate-float",
        highlight ? "bg-gradient-to-br from-primary/20 to-accent/10 border-primary/40" : "",
        className ?? "",
      ].join(" ")}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center justify-between">
        <div
          className={[
            "grid place-items-center size-10 rounded-lg",
            highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
          ].join(" ")}
        >
          {icon}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="mt-4">
        <p className="font-display text-lg leading-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{meta}</p>
      </div>
    </div>
  )
}
