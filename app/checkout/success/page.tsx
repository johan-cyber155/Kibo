import Link from "next/link"
import { CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { stripe } from "@/lib/stripe"
import { ClearCart } from "./clear-cart"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  let customerEmail: string | null = null
  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      customerEmail = session.customer_details?.email ?? null
    } catch {
      // ignore
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-24">
      <ClearCart />
      <div className="rounded-3xl border border-border bg-card p-10 text-center md:p-14">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl bg-primary/15 text-primary">
          <CheckCircle2 className="size-9" strokeWidth={1.5} />
        </div>
        <h1 className="font-heading text-4xl tracking-tight md:text-5xl">¡Bienvenido a KIBO!</h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Tu suscripción está activa. {customerEmail ? `Hemos enviado el comprobante a ${customerEmail}.` : "Te enviaremos el comprobante por correo."}{" "}
          Nuestro equipo coordinará la entrega de tu equipo en las próximas 24 horas.
        </p>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          <Step n="1" title="Confirmación" desc="Recibirás un email con tu factura electrónica." />
          <Step n="2" title="Coordinación" desc="Te contactaremos para programar la entrega." />
          <Step n="3" title="Entrega" desc="Recibe tu equipo listo para trabajar en Arequipa." />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/dashboard">Ir a mi panel</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/">
              <Sparkles className="mr-2 size-4" />
              Seguir explorando
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="font-heading text-2xl text-primary">{n}</p>
      <p className="mt-1 font-medium">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </div>
  )
}
