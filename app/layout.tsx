import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Syne, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/components/cart/cart-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "KIBO — Hardware en Suscripción | Arequipa, Perú",
  description:
    "Suscríbete al hardware de última generación. GPUs, lentes AR/VR e impresoras 3D sin desembolso inicial. Soporte 24/7 en Arequipa.",
  keywords: ["hardware", "suscripción", "GPU", "AR", "impresoras 3D", "Arequipa", "Perú", "RTX", "Vision Pro"],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${syne.variable} ${jetbrains.variable} bg-background dark`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <CartProvider>{children}</CartProvider>
        </Suspense>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#14141c",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              color: "#f5f5f7",
            },
          }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
