import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CheckoutClient } from "./checkout-client"

export default async function CheckoutPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/checkout")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, document_type, document_number, phone, address, city")
    .eq("id", user.id)
    .maybeSingle()

  return <CheckoutClient userEmail={user.email ?? ""} profile={profile ?? null} />
}
