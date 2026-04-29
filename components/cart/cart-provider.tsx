"use client"

import * as React from "react"
import type { CartItem } from "@/lib/types"

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  setOpen: (open: boolean) => void
  add: (item: CartItem) => void
  remove: (id: string) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = React.createContext<CartContextValue | null>(null)

const STORAGE_KEY = "kibo-cart-v1"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])
  const [isOpen, setOpen] = React.useState(false)
  const [hydrated, setHydrated] = React.useState(false)

  // Load cart from sessionStorage (UI state only — real source of truth is server)
  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, hydrated])

  const add = React.useCallback((item: CartItem) => {
    setItems((prev) => {
      // If a plan is added, replace any existing plan
      if (item.type === "plan") {
        return [...prev.filter((i) => i.type !== "plan"), item]
      }
      // For products, prevent duplicates
      if (prev.some((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
    setOpen(true)
  }, [])

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = React.useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + i.price_pen, 0)
  const count = items.length

  return (
    <CartContext.Provider value={{ items, isOpen, setOpen, add, remove, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
