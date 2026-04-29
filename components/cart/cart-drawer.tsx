"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ShoppingBag, Trash2, Layers } from "lucide-react"
import { useCart } from "./cart-provider"
import { formatPEN } from "@/lib/format"

export function CartDrawer() {
  const { items, isOpen, setOpen, remove, total } = useCart()
  const hasItems = items.length > 0

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="bg-card border-border w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            Tu Carrito
          </SheetTitle>
          <SheetDescription className="sr-only">Items y plan elegidos antes del pago</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!hasItems ? (
            <Empty className="border-none">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ShoppingBag className="size-6" />
                </EmptyMedia>
                <EmptyTitle>Carrito vacío</EmptyTitle>
                <EmptyDescription>Agrega un equipo y elige tu plan para comenzar.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                    {item.type === "plan" ? (
                      <Layers className="size-4" />
                    ) : (
                      <ShoppingBag className="size-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
                        {item.type === "plan" ? "Plan" : "Equipo"}
                      </span>
                    </div>
                    {item.meta && <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.meta}</p>}
                    <p className="text-sm font-mono text-primary mt-1">
                      {formatPEN(item.price_pen)} <span className="text-muted-foreground">/mes</span>
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(item.id)}
                    className="opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive size-8"
                    aria-label={`Quitar ${item.name}`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hasItems && (
          <div className="border-t border-border px-6 py-4 bg-card/80 backdrop-blur space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total mensual</span>
              <span className="font-display text-2xl text-gradient-brand">{formatPEN(total)}</span>
            </div>
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-brand"
              size="lg"
              onClick={() => setOpen(false)}
            >
              <Link href="/checkout">Proceder al pago</Link>
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              Pago seguro vía Stripe · Cancela cuando quieras
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
