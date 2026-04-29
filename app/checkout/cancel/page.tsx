import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="rounded-3xl border border-border bg-card p-12">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-xl bg-muted text-muted-foreground">
          <XCircle className="size-7" />
        </div>
        <h1 className="font-heading text-3xl">Pago cancelado</h1>
        <p className="mt-2 text-muted-foreground">
          No se realizó ningún cargo. Tu carrito sigue intacto cuando quieras retomarlo.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/checkout">Volver al checkout</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
