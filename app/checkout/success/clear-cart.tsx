"use client"

import * as React from "react"
import { useCart } from "@/components/cart/cart-provider"

export function ClearCart() {
  const { clear } = useCart()
  React.useEffect(() => {
    clear()
  }, [clear])
  return null
}
