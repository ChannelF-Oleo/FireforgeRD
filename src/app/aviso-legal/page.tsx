import type { Metadata } from "next";
import { LegalPageShell } from "@/components/sections/LegalPageShell";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description:
    "Aviso legal de FireforgeRD: titularidad del sitio, condiciones de uso y datos de contacto de la empresa.",
  alternates: {
    canonical: "https://www.fireforgerd.com/aviso-legal",
  },
  openGraph: {
    title: "Aviso Legal | FireforgeRD",
    description:
      "Titularidad del sitio, condiciones de uso y datos de contacto de FireforgeRD.",
    url: "https://www.fireforgerd.com/aviso-legal",
  },
};

export default function AvisoLegalPage() {
  return (
    <LegalPageShell
      title="Aviso Legal"
      intro="Titularidad del sitio, condiciones de uso y datos identificativos de FireforgeRD."
    >
      <p>
        <strong className="text-[#1A1818]">
          Este documento está en actualización.
        </strong>{" "}
        Estamos redactando la versión definitiva del aviso legal junto a
        asesoría jurídica. Mientras tanto, dejamos acá los datos
        identificativos del titular del sitio y una vía directa de contacto.
      </p>
      <p>
        El sitio web www.fireforgerd.com es titularidad de FireforgeRD, con
        domicilio en Santo Domingo, República Dominicana. Los contenidos,
        textos, marcas y diseños del sitio pertenecen a FireforgeRD salvo que
        se indique lo contrario.
      </p>
      <p>
        Los precios y plazos publicados son de referencia y pueden variar según
        el alcance final de cada proyecto; se confirman por escrito en la
        propuesta correspondiente antes de iniciar cualquier trabajo.
      </p>
      <p>
        Si necesitas una versión formal de este documento antes de que la
        publiquemos, escríbenos y te la hacemos llegar.
      </p>
    </LegalPageShell>
  );
}
