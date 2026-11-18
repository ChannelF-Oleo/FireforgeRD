import type { Metadata } from "next";
import { pageSocial } from "@/lib/og";
import { LegalPageShell } from "@/components/sections/LegalPageShell";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de FireforgeRD: qué datos recogemos a través del sitio, para qué los usamos y cómo ejercer tus derechos.",
  alternates: {
    canonical: "https://www.fireforgerd.com/privacidad",
  },
  ...pageSocial({
    title: "Política de Privacidad | FireforgeRD",
    description:
      "Qué datos recoge FireforgeRD a través del sitio, para qué los usa y cómo ejercer tus derechos.",
    url: "https://www.fireforgerd.com/privacidad",
  }),
};

export default function PrivacidadPage() {
  return (
    <LegalPageShell
      title="Política de Privacidad"
      intro="Qué datos recogemos a través de este sitio, para qué los usamos y cómo puedes ejercer tus derechos."
    >
      <p>
        <strong>
          Este documento está en actualización.
        </strong>{" "}
        Estamos redactando la versión definitiva de la política de privacidad.
        Mientras tanto, resumimos acá el tratamiento que damos hoy a los datos
        que nos dejas.
      </p>
      <p>
        <strong>Qué recogemos.</strong> Únicamente
        los datos que nos envías voluntariamente por el formulario de contacto
        o por el diagnóstico gratuito: nombre, empresa, correo electrónico,
        WhatsApp y el detalle del proyecto que nos cuentes.
      </p>
      <p>
        <strong>Para qué los usamos.</strong> Para
        responder tu consulta, preparar una propuesta y darle seguimiento
        comercial. No vendemos ni cedemos tus datos a terceros con fines
        publicitarios.
      </p>
      <p>
        <strong>Analítica.</strong> El sitio usa
        Google Analytics para medir el tráfico de forma agregada. La sección
        de reseñas del inicio muestra opiniones de nuestro perfil de Google a
        través de Elfsight, un servicio externo que se carga solo cuando llegas
        a esa sección.
      </p>
      <p>
        <strong>Tus derechos.</strong> Puedes
        pedirnos en cualquier momento acceder, rectificar o eliminar los datos
        que tengamos sobre ti escribiendo a hola@fireforgerd.com.
      </p>
    </LegalPageShell>
  );
}
