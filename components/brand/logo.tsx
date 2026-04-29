import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "font-display text-2xl tracking-tight inline-flex items-center gap-1.5 group",
        className,
      )}
      aria-label="KIBO — Inicio"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#c084fc] to-[#7c3aed] text-white shadow-[0_0_24px_-4px_rgba(168,85,247,0.6)] transition-transform group-hover:scale-105">
        <span className="font-display text-sm font-extrabold">K</span>
      </span>
      <span className="text-foreground">
        KIBO<span className="text-primary">.</span>
      </span>
    </Link>
  )
}
