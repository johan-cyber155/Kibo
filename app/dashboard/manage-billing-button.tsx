"use client"

import * as React from "react"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createBillingPortalSession } from "@/app/actions/billing"

export function ManageBillingButton() {
  const [loading, setLoading] = React.useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await createBillingPortalSession()
    } catch (err) {
      console.error("[v0] billing portal error:", err)
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleClick} disabled={loading}>
      <CreditCard className="mr-2 size-4" />
      {loading ? "Abriendo…" : "Gestionar facturación"}
    </Button>
  )
}
