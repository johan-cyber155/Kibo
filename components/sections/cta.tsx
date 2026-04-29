import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Cta() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-accent/10 p-10 sm:p-16">
          <div
            className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,white_30%,transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl text-balance leading-tight">
              ¿Listo para subir de nivel tu <span className="text-gradient-brand">setup tecnológico?</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground text-pretty">
              Crea tu cuenta gratis, agrega los equipos que necesitas y comienza tu suscripción en minutos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-brand">
                <Link href="/auth/sign-up">
                  Crear cuenta gratis
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary/50 bg-transparent"
              >
                <Link href="#planes">Comparar planes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
