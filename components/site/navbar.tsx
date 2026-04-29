"use client"

import * as React from "react"
import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { CartButton } from "@/components/cart/cart-button"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavbarProps {
  user: { email?: string | null } | null
}

const links = [
  { href: "/#planes", label: "Planes" },
  { href: "/#productos", label: "Catálogo" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#testimonios", label: "Testimonios" },
]

export function Navbar({ user }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartButton />

            {user ? (
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/dashboard">
                  <User className="size-4" aria-hidden="true" />
                  <span>Mi cuenta</span>
                </Link>
              </Button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/login">Ingresar</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/auth/sign-up">Crear cuenta</Link>
                </Button>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border">
                <SheetHeader>
                  <SheetTitle className="font-display text-left">Menú</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1 px-4">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                  <div className="my-2 h-px bg-border" />
                  {user ? (
                    <Link
                      href="/dashboard"
                      className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 rounded-md"
                    >
                      Mi cuenta
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 rounded-md"
                      >
                        Ingresar
                      </Link>
                      <Link
                        href="/auth/sign-up"
                        className="px-3 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-center"
                      >
                        Crear cuenta
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
