"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useCart } from "./cart-provider"
import { CartDrawer } from "./cart-drawer"

export function CartButton() {
  const { count, setOpen } = useCart()

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="relative"
        aria-label="Abrir carrito"
      >
        <ShoppingBag className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Carrito</span>
        {count > 0 && (
          <span
            className="absolute -top-1 -right-1 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
            aria-label={`${count} ítems en el carrito`}
          >
            {count}
          </span>
        )}
      </Button>
      <CartDrawer />
    </>
  )
}
