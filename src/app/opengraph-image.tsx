import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CORE_PATH, FLAME_PATH } from "@/components/ui/fire-mark";

// Imagen para compartir (Open Graph y Twitter) de 1200×630, generada en build.
// Reemplaza al Icon.png cuadrado de 500×500, que las tarjetas recortaban.
export const alt = "FireforgeRD — Desarrollo web, tiendas online y software a medida en República Dominicana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Outfit Bold (la fuente de titulares) en TTF: el generador no lee woff2.
  const outfitBold = await readFile(join(process.cwd(), "src/components/ds/fonts/Outfit-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F9F8F6",
          padding: "72px 80px",
          borderBottom: "16px solid #FF4D00",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 24 24">
            <path d={FLAME_PATH} fill="#FF4D00" />
            <path d={CORE_PATH} fill="#FF6B2C" fillOpacity="0.7" />
          </svg>
          <div style={{ fontSize: 48, fontFamily: "Outfit", color: "#1A1818" }}>FireforgeRD</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 80, fontFamily: "Outfit", color: "#1A1818", lineHeight: 1.05, letterSpacing: -2 }}>
            Webs, tiendas y sistemas para tu negocio.
          </div>
          <div style={{ fontSize: 32, color: "#5C5850" }}>
            Precios publicados y plazos claros · República Dominicana
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Outfit", data: outfitBold, weight: 700, style: "normal" }] },
  );
}
