export type Category = "gpu" | "ar" | "print"

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  description: string
  price_pen: number
  specs: string[]
  badge: string | null
  badge_variant: "new" | "hot" | "premium"
  icon: string | null
  color: string | null
  sort_order: number
  active: boolean
}

export interface Plan {
  id: string
  slug: string
  name: string
  subtitle: string | null
  price_pen: number
  features: string[]
  icon: string | null
  featured: boolean
  sort_order: number
  active: boolean
}

export type CartItemType = "product" | "plan"

export interface CartItem {
  id: string
  type: CartItemType
  slug: string
  name: string
  price_pen: number
  meta?: string
}

export interface Subscription {
  id: string
  user_id: string
  product_id: string | null
  plan_id: string | null
  item_name: string
  item_type: CartItemType
  price_pen: number
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  stripe_session_id: string | null
  status: "incomplete" | "active" | "past_due" | "canceled" | "unpaid" | "trialing" | "paused"
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  document_type: "DNI" | "RUC" | "CE" | null
  document_number: string | null
  phone: string | null
  address: string | null
  city: string | null
  stripe_customer_id: string | null
}
