import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { Mail, MapPin, Phone, Instagram, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed text-pretty max-w-xs">
              Hardware de última generación bajo modelo de suscripción. Diseñado para creadores e innovadores en
              Arequipa, Perú.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid place-items-center size-9 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-foreground">Producto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/#planes" className="hover:text-foreground transition-colors">
                  Planes
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="hover:text-foreground transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/#como-funciona" className="hover:text-foreground transition-colors">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Mi cuenta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/legal/terminos" className="hover:text-foreground transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="hover:text-foreground transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal/libro-reclamaciones" className="hover:text-foreground transition-colors">
                  Libro de reclamaciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 mt-0.5 text-primary shrink-0" />
                <span>Av. Ejército 1010, Yanahuara, Arequipa</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-primary shrink-0" />
                <a href="mailto:hola@kibo.pe" className="hover:text-foreground transition-colors">
                  hola@kibo.pe
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-primary shrink-0" />
                <a href="tel:+51959123456" className="hover:text-foreground transition-colors">
                  +51 959 123 456
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} KIBO Hardware S.A.C. · RUC 20612345678 · Todos los derechos reservados.</p>
          <p className="font-mono">Hecho en Arequipa · Perú</p>
        </div>
      </div>
    </footer>
  )
}
