import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad | KIBO",
  description: "Cómo KIBO trata tus datos personales bajo la Ley 29733 de Protección de Datos Personales del Perú.",
}

export default function PrivacidadPage() {
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
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Política de Privacidad</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Cumplimos con la Ley N° 29733 — Ley de Protección de Datos Personales del Perú.
        </p>
      </header>

      <div className="prose prose-invert mt-10 max-w-none space-y-6 [&>h2]:font-heading [&>h2]:text-2xl [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:leading-relaxed [&>p]:text-muted-foreground [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-muted-foreground">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          KIBO PERU S.A.C. es el responsable del tratamiento de los datos personales que recolectamos a través del sitio
          y del proceso de suscripción.
        </p>

        <h2>2. Datos que recolectamos</h2>
        <ul>
          <li>Datos de identidad: nombre completo, tipo y número de documento.</li>
          <li>Datos de contacto: correo electrónico, número de celular y dirección de entrega.</li>
          <li>Datos de pago: gestionados directamente por Stripe; KIBO no almacena tarjetas.</li>
          <li>Datos técnicos: dirección IP, navegador y eventos de uso del sitio para análisis y seguridad.</li>
        </ul>

        <h2>3. Finalidades</h2>
        <ul>
          <li>Procesar tu suscripción, entregar el equipo y emitir comprobantes electrónicos a SUNAT.</li>
          <li>Brindar soporte técnico y comunicarte sobre tu cuenta.</li>
          <li>Mejorar el servicio mediante análisis agregado.</li>
          <li>Enviarte comunicaciones comerciales solo con tu consentimiento expreso.</li>
        </ul>

        <h2>4. Base legal</h2>
        <p>
          Tratamos tus datos sobre la base de la ejecución del contrato de suscripción, el cumplimiento de obligaciones
          legales tributarias, y tu consentimiento para fines de marketing.
        </p>

        <h2>5. Conservación</h2>
        <p>
          Conservamos tus datos durante toda la relación contractual y por el plazo legal de archivos contables y
          tributarios (mínimo 5 años). Luego los anonimizamos o eliminamos.
        </p>

        <h2>6. Tus derechos ARCO</h2>
        <p>
          Tienes derecho a acceder, rectificar, cancelar y oponerte al tratamiento de tus datos. También puedes
          solicitar su portabilidad. Escríbenos a{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href="mailto:privacidad@kibo.pe">
            privacidad@kibo.pe
          </a>{" "}
          y responderemos dentro del plazo legal.
        </p>

        <h2>7. Encargados externos</h2>
        <ul>
          <li>Stripe Payments Europe Ltd. (procesamiento de pagos).</li>
          <li>Supabase Inc. (almacenamiento de cuenta y operaciones).</li>
          <li>Servicios logísticos en Perú para entregas.</li>
        </ul>

        <h2>8. Seguridad</h2>
        <p>
          Aplicamos cifrado en tránsito y en reposo, control de accesos por rol y políticas Row-Level Security en la
          base de datos para que solo tú puedas ver tu información.
        </p>

        <h2>9. Autoridad de control</h2>
        <p>
          Si consideras que no hemos atendido tu solicitud, puedes acudir a la Autoridad Nacional de Protección de Datos
          Personales (ANPD) del Ministerio de Justicia y Derechos Humanos del Perú.
        </p>
      </div>
    </article>
  )
}
