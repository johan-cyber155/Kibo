"use server"

import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

type CartLine = {
  id: string
  type: "product" | "plan"
  name: string
  pricePen: number
}

export async function createCheckoutSession(items: CartLine[]) {
  if (!items || items.length === 0) {
    throw new Error("El carrito está vacío")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/checkout")
  }

  // Validate items against the database (server-side price validation)
  const productIds = items.filter((i) => i.type === "product").map((i) => i.id)
  const planIds = items.filter((i) => i.type === "plan").map((i) => i.id)

  const [{ data: products }, { data: plans }] = await Promise.all([
    productIds.length
      ? supabase.from("products").select("id, name, price_pen").in("id", productIds)
      : Promise.resolve({ data: [] as { id: string; name: string; price_pen: number }[] }),
    planIds.length
      ? supabase.from("subscription_plans").select("id, name, price_pen").in("id", planIds)
      : Promise.resolve({ data: [] as { id: string; name: string; price_pen: number }[] }),
  ])

  const lookup = new Map<string, { name: string; price_pen: number; type: "product" | "plan" }>()
  for (const p of products ?? []) lookup.set(p.id, { name: p.name, price_pen: p.price_pen, type: "product" })
  for (const p of plans ?? []) lookup.set(p.id, { name: p.name, price_pen: p.price_pen, type: "plan" })

  const lineItems = items.map((item) => {
    const verified = lookup.get(item.id)
    if (!verified) {
      throw new Error(`Item no encontrado: ${item.name}`)
    }
    return {
      price_data: {
        currency: "pen",
        recurring: { interval: "month" as const },
        unit_amount: verified.price_pen * 100, // PEN to cents
        product_data: {
          name: verified.name,
          metadata: {
            item_id: item.id,
            item_type: verified.type,
          },
        },
      },
      quantity: 1,
    }
  })

  // Get or create Stripe customer
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, full_name")
    .eq("id", user.id)
    .maybeSingle()

  let customerId = profile?.stripe_customer_id ?? null
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      name: profile?.full_name ?? undefined,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id
    await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id)
  }

  const headersList = await headers()
  const host = headersList.get("host") ?? "localhost:3000"
  const protocol = host.includes("localhost") ? "http" : "https"
  const origin = `${protocol}://${host}`

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    metadata: {
      supabase_user_id: user.id,
      cart: JSON.stringify(
        items.map((i) => ({ id: i.id, type: lookup.get(i.id)?.type, name: lookup.get(i.id)?.name })),
      ),
    },
    subscription_data: {
      metadata: {
        supabase_user_id: user.id,
      },
    },
  })

  if (!session.url) {
    throw new Error("No se pudo crear la sesión de pago")
  }

  redirect(session.url)
}
