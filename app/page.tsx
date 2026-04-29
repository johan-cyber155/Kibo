import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/sections/hero"
import { Plans } from "@/components/sections/plans"
import { Products } from "@/components/sections/products"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Testimonials } from "@/components/sections/testimonials"
import { Payments } from "@/components/sections/payments"
import { Cta } from "@/components/sections/cta"
import type { Plan, Product } from "@/lib/types"

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: user }, { data: plansData }, { data: productsData }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("subscription_plans").select("*").eq("active", true).order("sort_order"),
    supabase.from("products").select("*").eq("active", true).order("sort_order"),
  ])

  const plans = (plansData ?? []) as Plan[]
  const products = (productsData ?? []) as Product[]

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar user={user.user ? { email: user.user.email } : null} />
      <main className="flex-1">
        <Hero />
        <Plans plans={plans} />
        <Products products={products} />
        <HowItWorks />
        <Testimonials />
        <Payments />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
