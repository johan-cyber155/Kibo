import { redirect } from "next/navigation"
import Link from "next/link"
import { CalendarClock, Crown, Layers, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { formatPEN } from "@/lib/format"
import { LogoutButton } from "./logout-button"
import { ManageBillingButton } from "./manage-billing-button"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const [{ data: profile }, { data: subscriptions }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ])

  const activeSubs = (subscriptions ?? []).filter((s) =>
    ["active", "trialing", "past_due"].includes(s.status),
  )
  const monthlyTotal = activeSubs.reduce((sum, s) => sum + s.price_pen, 0)
  const igv = Math.round(monthlyTotal * 0.18)
  const grandTotal = monthlyTotal + igv

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 lg:py-20">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Mi cuenta</p>
          <h1 className="mt-2 font-heading text-4xl tracking-tight md:text-5xl">
            Hola, {profile?.full_name?.split(" ")[0] ?? "creador"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona tus suscripciones, cambia equipos o actualiza tu información de facturación.
          </p>
        </div>
        <LogoutButton />
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<Layers className="size-5" />}
          label="Equipos activos"
          value={activeSubs.length.toString()}
        />
        <StatCard
          icon={<CalendarClock className="size-5" />}
          label="Próxima facturación"
          value={
            activeSubs[0]?.current_period_end
              ? new Date(activeSubs[0].current_period_end).toLocaleDateString("es-PE", {
                  day: "numeric",
                  month: "long",
                })
              : "—"
          }
        />
        <StatCard
          icon={<Sparkles className="size-5" />}
          label="Total mensual"
          value={formatPEN(grandTotal)}
          accent
        />
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-2xl">Suscripciones activas</h2>
          {activeSubs.length > 0 ? <ManageBillingButton /> : null}
        </div>

        {activeSubs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
            <Sparkles className="mx-auto mb-3 size-10 text-primary" />
            <h3 className="font-heading text-xl">Aún no tienes suscripciones</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Explora nuestros planes y elige el equipo que necesitas para tu próximo proyecto.
            </p>
            <Button asChild className="mt-5">
              <Link href="/#planes">Ver planes</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {activeSubs.map((sub) => (
              <SubscriptionCard key={sub.id} sub={sub} />
            ))}
          </div>
        )}
      </section>

      {(subscriptions ?? []).length > activeSubs.length ? (
        <section className="mt-12">
          <h2 className="mb-6 font-heading text-2xl">Historial</h2>
          <div className="rounded-2xl border border-border bg-card">
            <ul className="divide-y divide-border">
              {(subscriptions ?? [])
                .filter((s) => !["active", "trialing", "past_due"].includes(s.status))
                .map((s) => (
                  <li key={s.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{s.item_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(s.created_at).toLocaleDateString("es-PE")}
                      </p>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {s.status}
                    </Badge>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-primary/40 bg-gradient-to-br from-primary/15 to-secondary/10"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className={accent ? "text-primary" : "text-muted-foreground"}>{icon}</span>
        {label}
      </div>
      <p className="mt-3 font-heading text-3xl tracking-tight">{value}</p>
    </div>
  )
}

function SubscriptionCard({
  sub,
}: {
  sub: {
    id: string
    item_name: string
    item_type: string
    price_pen: number
    status: string
    current_period_end: string | null
    cancel_at_period_end: boolean
  }
}) {
  const Icon = sub.item_type === "plan" ? Crown : Zap
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {sub.item_type === "plan" ? "Plan" : "Equipo"}
              </p>
              <h3 className="font-heading text-lg">{sub.item_name}</h3>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary/15 text-primary"
          >
            {sub.status === "active" ? "Activa" : sub.status}
          </Badge>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="font-heading text-3xl tracking-tight">{formatPEN(sub.price_pen)}</p>
            <p className="text-xs text-muted-foreground">por mes + IGV</p>
          </div>
          {sub.current_period_end ? (
            <p className="text-right text-xs text-muted-foreground">
              {sub.cancel_at_period_end ? "Termina el" : "Renueva el"}
              <br />
              <span className="text-foreground">
                {new Date(sub.current_period_end).toLocaleDateString("es-PE", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

