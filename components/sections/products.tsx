"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { DynamicIcon } from "@/lib/icons"
import { formatPEN } from "@/lib/format"
import { toast } from "sonner"
import type { Product, Category } from "@/lib/types"

interface ProductsProps {
  products: Product[]
}

const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "gpu", label: "GPUs" },
  { value: "ar", label: "AR / VR" },
  { value: "print", label: "Impresoras 3D" },
]

export function Products({ products }: ProductsProps) {
  const [filter, setFilter] = React.useState<Category | "all">("all")
  const { add } = useCart()

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter)

  const handleAdd = (product: Product) => {
    add({
      id: product.id,
      type: "product",
      slug: product.slug,
      name: product.name,
      price_pen: product.price_pen,
      meta: product.specs.slice(0, 2).join(" · "),
    })
    toast.success(`${product.name} añadido al carrito`)
  }

  return (
    <section id="productos" className="relative py-24 sm:py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-mono uppercase tracking-wider text-primary">Catálogo</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
              Hardware <span className="text-gradient-brand">listo para potenciarte.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Lo último en GPUs, lentes AR/VR y fabricación digital. Selecciona los equipos y añádelos a tu plan.
            </p>
          </div>

          <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1 self-start lg:self-end overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  filter === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={filter === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group relative rounded-2xl border border-border bg-background p-6 flex flex-col hover:border-primary/40 transition-all hover:-translate-y-0.5"
            >
              {product.badge && (
                <span
                  className={`absolute top-4 right-4 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                    product.badge_variant === "premium"
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : product.badge_variant === "hot"
                        ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                        : "bg-primary/15 text-primary border border-primary/30"
                  }`}
                >
                  {product.badge}
                </span>
              )}

              <div
                className="grid place-items-center size-14 rounded-xl mb-5"
                style={{
                  backgroundColor: product.color ? `${product.color}1A` : "rgba(168,85,247,0.1)",
                  color: product.color ?? "#a855f7",
                }}
              >
                <DynamicIcon name={product.icon} className="size-7" />
              </div>

              <h3 className="font-display text-xl">{product.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 text-pretty">
                {product.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-md border border-border bg-secondary/40 px-2 py-1 text-[11px] font-mono text-muted-foreground"
                  >
                    {spec}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                <div>
                  <p className="font-display text-2xl">
                    {formatPEN(product.price_pen)}
                    <span className="text-xs text-muted-foreground font-sans font-normal ml-1">/mes</span>
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAdd(product)}
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30"
                >
                  <Plus className="size-4" />
                  Añadir
                </Button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">No hay equipos en esta categoría aún.</p>
        )}
      </div>
    </section>
  )
}
