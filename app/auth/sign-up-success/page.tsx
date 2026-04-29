import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 noise-bg">
      <div
        className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"
        aria-hidden="true"
      />

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

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-10">
          <div className="mx-auto grid place-items-center size-14 rounded-full bg-primary/15 text-primary mb-6 animate-pulse-glow">
            <Mail className="size-6" />
          </div>
          <h1 className="font-display text-3xl">Revisa tu correo</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Te hemos enviado un enlace de confirmación. Haz click en él para activar tu cuenta y empezar a explorar
            KIBO.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-7 w-full border-border hover:bg-secondary/50 bg-transparent"
          >
            <Link href="/auth/login">Ir a Ingresar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
