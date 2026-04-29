import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 noise-bg">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Volver al inicio
      </Link>

      <div className="relative w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="rounded-2xl border border-destructive/30 bg-card/80 backdrop-blur-xl p-10">
          <div className="mx-auto grid place-items-center size-14 rounded-full bg-destructive/15 text-destructive mb-6">
            <AlertTriangle className="size-6" />
          </div>
          <h1 className="font-display text-3xl">Algo salió mal</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {error ?? "No pudimos procesar tu solicitud de autenticación. Por favor intenta de nuevo."}
          </p>
          <Button asChild className="mt-7 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/auth/login">Volver a Ingresar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
