"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { DynamicIcon } from "@/lib/icons"
import { formatPEN } from "@/lib/format"
import { toast } from "sonner"
import type { Plan } from "@/lib/types"

interface PlansProps {
  plans: Plan[]
}

export function Plans({ plans }: PlansProps) {
  const { add } = useCart()

  const handleSelect = (plan: Plan) => {
    add({
      id: plan.id,
      type: "plan",
      slug: plan.slug,
      name: `Plan ${plan.name}`,
      price_pen: plan.price_pen,
      meta: plan.subtitle ?? undefined,
    })
    toast.success(`Plan ${plan.name} añadido al carrito`)
  }

  return (
    <section id="planes" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-mono uppercase tracking-wider text-primary">Suscripciones</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
            Elige el plan que <span className="text-gradient-brand">se adapta a ti.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Precios mensuales en soles peruanos. Sin cargos ocultos. Cancela cuando quieras.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isFeatured = plan.featured
            return (
              <article
                key={plan.id}
                className={`relative rounded-2xl border p-6 sm:p-8 flex flex-col ${
                  isFeatured
                    ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card animate-pulse-glow"
                    : "border-border bg-card"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Star className="size-3 fill-current" />
                    Más popular
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`grid place-items-center size-11 rounded-lg ${
                      isFeatured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <DynamicIcon name={plan.icon} className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl">{formatPEN(plan.price_pen)}</span>
                  <span className="text-sm text-muted-foreground">/ mes</span>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="size-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelect(plan)}
                  size="lg"
                  className={`mt-8 w-full ${
                    isFeatured
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-brand"
                      : "bg-secondary hover:bg-secondary/70 text-foreground border border-border"
                  }`}
                >
                  Elegir {plan.name}
                </Button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
