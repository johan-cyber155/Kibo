import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Términos de Suscripción | KIBO",
  description: "Términos y condiciones del servicio de suscripción de hardware KIBO en Perú.",
}

export default function TerminosPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 lg:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver al inicio
      </Link>

      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Legal</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Términos de Suscripción</h1>
        <p className="mt-3 text-sm text-muted-foreground">Última actualización: octubre 2025 · Aplicable en Perú.</p>
      </header>

      <div className="prose prose-invert mt-10 max-w-none space-y-6 text-foreground/90 [&>h2]:font-heading [&>h2]:text-2xl [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:leading-relaxed [&>p]:text-muted-foreground [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-muted-foreground">
        <h2>1. Sobre KIBO</h2>
        <p>
          KIBO es un servicio de suscripción mensual de equipos de hardware (GPUs, dispositivos AR/VR e impresoras 3D)
          operado en Perú. Al suscribirte, no compras el equipo: lo recibes en uso bajo modalidad de servicio mensual
          renovable.
        </p>

        <h2>2. Suscripción y facturación</h2>
        <ul>
          <li>Los precios mostrados son en Soles peruanos (S/) y no incluyen IGV (18%), que se agrega al checkout.</li>
          <li>El cobro se realiza el mismo día de cada mes a través de Stripe sobre tu método de pago registrado.</li>
          <li>Puedes cancelar en cualquier momento desde tu panel; el servicio continúa hasta el fin del período pagado.</li>
          <li>No emitimos reembolsos por períodos parciales ya facturados.</li>
        </ul>

        <h2>3. Entrega y uso del equipo</h2>
        <p>
          La entrega se coordina dentro de las 24-48 horas siguientes al primer pago confirmado, en la dirección que
          registres en tu cuenta. El equipo permanece bajo propiedad de KIBO durante toda la suscripción.
        </p>
        <ul>
          <li>El equipo debe usarse conforme a las recomendaciones del fabricante y dentro del Perú.</li>
          <li>No está permitido revender, alquilar a terceros o modificar físicamente el hardware.</li>
          <li>Al cancelar, debes coordinar la devolución en estado funcional (uso normal aceptado).</li>
        </ul>

        <h2>4. Garantía y soporte</h2>
        <p>
          Todos los planes incluyen garantía total contra fallas de fábrica y soporte técnico. El daño accidental está
          cubierto solo en los planes Studio y Enterprise. KIBO se reserva el derecho de cobrar deducibles por daños
          causados por negligencia o uso indebido.
        </p>

        <h2>5. Cambios y upgrades</h2>
        <p>
          Puedes solicitar cambio o upgrade de equipo según la frecuencia permitida por tu plan. La disponibilidad está
          sujeta a stock y se confirma desde tu panel.
        </p>

        <h2>6. Cancelación</h2>
        <p>
          Puedes cancelar tu suscripción cuando quieras desde el panel. La cancelación detiene la próxima renovación;
          luego coordinamos el recojo del equipo dentro de los 7 días posteriores al fin del período pagado.
        </p>

        <h2>7. Modificaciones</h2>
        <p>
          KIBO puede actualizar estos términos con notificación al correo registrado al menos 30 días antes de aplicar
          cambios materiales.
        </p>

        <h2>8. Contacto</h2>
        <p>
          Para cualquier consulta legal escríbenos a <a className="text-foreground underline-offset-4 hover:underline" href="mailto:legal@kibo.pe">legal@kibo.pe</a>.
        </p>
      </div>
    </article>
  )
}
