"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Lock, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-provider"
import { formatPEN } from "@/lib/format"
import { createCheckoutSession } from "@/app/actions/checkout"
import { createClient } from "@/lib/supabase/client"

type Profile = {
  full_name: string | null
  document_type: string | null
  document_number: string | null
  phone: string | null
  address: string | null
  city: string | null
} | null

export function CheckoutClient({ userEmail, profile }: { userEmail: string; profile: Profile }) {
  const { items, total } = useCart()
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [form, setForm] = React.useState({
    full_name: profile?.full_name ?? "",
    document_type: profile?.document_type ?? "DNI",
    document_number: profile?.document_number ?? "",
    phone: profile?.phone ?? "",
    address: profile?.address ?? "",
    city: profile?.city ?? "Arequipa",
  })

  const subtotal = total
  const igv = Math.round(subtotal * 0.18)
  const grandTotal = subtotal + igv

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      // Persist profile data first
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from("profiles").upsert({
          id: user.id,
          full_name: form.full_name,
          document_type: form.document_type,
          document_number: form.document_number,
          phone: form.phone,
          address: form.address,
          city: form.city,
          updated_at: new Date().toISOString(),
        })
      }

      // Create Stripe Checkout session (will redirect)
      await createCheckoutSession(
        items.map((i) => ({
          id: i.id,
          type: i.type,
          name: i.name,
          pricePen: i.price_pen,
        })),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar el pago")
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="rounded-3xl border border-border bg-card p-12">
          <Sparkles className="mx-auto mb-4 size-12 text-primary" />
          <h1 className="font-heading text-3xl">Tu carrito está vacío</h1>
          <p className="mt-2 text-muted-foreground">
            Agrega un equipo o un plan para continuar con la suscripción.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/#planes">Ver planes</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 lg:py-20">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver al catálogo
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5 text-primary" />
          Pago seguro con Stripe
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <header>
            <h1 className="font-heading text-4xl tracking-tight text-pretty md:text-5xl">Finaliza tu suscripción</h1>
            <p className="mt-2 text-muted-foreground">
              Confirma tus datos y serás redirigido a Stripe para completar el pago de forma segura.
            </p>
          </header>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl">Datos de contacto</h2>
            <p className="mt-1 text-sm text-muted-foreground">Estos datos se usan para tu factura electrónica (SUNAT).</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="full_name">Nombre completo / Razón social</Label>
                <Input
                  id="full_name"
                  required
                  value={form.full_name}
                  onChange={onChange("full_name")}
                  placeholder="Juan Pérez Quispe"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="document_type">Tipo de documento</Label>
                <Select value={form.document_type} onValueChange={(v) => setForm((s) => ({ ...s, document_type: v }))}>
                  <SelectTrigger id="document_type" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DNI">DNI</SelectItem>
                    <SelectItem value="RUC">RUC</SelectItem>
                    <SelectItem value="CE">Carné de Extranjería</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="document_number">Número</Label>
                <Input
                  id="document_number"
                  required
                  value={form.document_number}
                  onChange={onChange("document_number")}
                  placeholder="12345678"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  required
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="+51 999 999 999"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Correo</Label>
                <Input id="email" value={userEmail} disabled className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Dirección de entrega</Label>
                <Input
                  id="address"
                  required
                  value={form.address}
                  onChange={onChange("address")}
                  placeholder="Av. Ejército 123, Yanahuara"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  required
                  value={form.city}
                  onChange={onChange("city")}
                  className="mt-1.5"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <ShieldCheck className="size-5" />
              </div>
              <div className="text-sm text-muted-foreground">
                Al continuar, aceptas los{" "}
                <Link href="/legal/terminos" className="text-foreground underline-offset-4 hover:underline">
                  Términos de Suscripción
                </Link>{" "}
                y la{" "}
                <Link href="/legal/privacidad" className="text-foreground underline-offset-4 hover:underline">
                  Política de Privacidad
                </Link>{" "}
                de KIBO. La suscripción se renueva mensualmente y puedes cancelarla cuando quieras desde tu panel.
              </div>
            </div>
          </section>

          {error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <Button type="submit" size="lg" disabled={submitting} className="w-full">
            {submitting ? "Redirigiendo a Stripe…" : `Pagar ${formatPEN(grandTotal)} y suscribirme`}
          </Button>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl">Resumen del pedido</h2>
            <ul className="mt-4 space-y-4">
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium leading-snug">{item.name}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.type === "plan" ? "Plan mensual" : "Equipo · suscripción mensual"}
                    </p>
                  </div>
                  <p className="text-sm font-medium tabular-nums">{formatPEN(item.price_pen)}</p>
                </li>
              ))}
            </ul>

            <Separator className="my-6" />

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{formatPEN(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">IGV (18%)</dt>
                <dd className="tabular-nums">{formatPEN(igv)}</dd>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <dt>Total mensual</dt>
                <dd className="tabular-nums text-primary">{formatPEN(grandTotal)}</dd>
              </div>
            </dl>

            <p className="mt-6 text-xs text-muted-foreground">
              Se facturará automáticamente cada mes al método de pago que registres en Stripe. Sin penalidades por
              cancelación.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
