import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { createClient } from "@supabase/supabase-js"

// Service-role client (bypasses RLS) — only used server-side in webhook
function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

// Stripe API "basil" moved current_period_start/end to subscription items.
function periodFromSubscription(sub: Stripe.Subscription) {
  const item = sub.items?.data?.[0] as (Stripe.SubscriptionItem & {
    current_period_start?: number
    current_period_end?: number
  }) | undefined
  const start = item?.current_period_start
  const end = item?.current_period_end
  return {
    start: start ? new Date(start * 1000).toISOString() : null,
    end: end ? new Date(end * 1000).toISOString() : null,
  }
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event
  try {
    if (!signature || !secret) {
      // If no webhook secret configured (dev), parse without verifying
      event = JSON.parse(body) as Stripe.Event
    } else {
      event = stripe.webhooks.constructEvent(body, signature, secret)
    }
  } catch (err) {
    console.error("[v0] Stripe webhook signature error:", err)
    return new NextResponse("Webhook signature verification failed", { status: 400 })
  }

  const supabase = adminClient()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.supabase_user_id
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id
        const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id

        if (!userId || !subscriptionId) break

        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ["items.data.price.product"],
        })

        const period = periodFromSubscription(subscription)

        const rows = subscription.items.data.map((item) => {
          const product = item.price.product as Stripe.Product
          const itemType = (product.metadata?.item_type as "product" | "plan") ?? "product"
          const itemId = product.metadata?.item_id ?? null
          return {
            user_id: userId,
            product_id: itemType === "product" ? itemId : null,
            plan_id: itemType === "plan" ? itemId : null,
            item_name: product.name,
            item_type: itemType,
            price_pen: Math.round((item.price.unit_amount ?? 0) / 100),
            stripe_customer_id: customerId ?? null,
            stripe_subscription_id: subscription.id,
            stripe_session_id: session.id,
            status: subscription.status,
            current_period_start: period.start,
            current_period_end: period.end,
            cancel_at_period_end: subscription.cancel_at_period_end ?? false,
            updated_at: new Date().toISOString(),
          }
        })

        // Remove any prior rows for this subscription, then insert fresh ones
        await supabase.from("subscriptions").delete().eq("stripe_subscription_id", subscription.id)
        await supabase.from("subscriptions").insert(rows)
        break
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const period = periodFromSubscription(subscription)
        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_start: period.start,
            current_period_end: period.end,
            cancel_at_period_end: subscription.cancel_at_period_end ?? false,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id)
        break
      }
    }
  } catch (err) {
    console.error("[v0] Stripe webhook handler error:", err)
    return new NextResponse("Webhook handler error", { status: 500 })
  }

  return NextResponse.json({ received: true })
}
