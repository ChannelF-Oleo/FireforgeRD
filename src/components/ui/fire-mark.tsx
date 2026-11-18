// Llama de marca. Sin "use client": es SVG estático, así que se puede usar
// desde Server Components sin mandar JS. La imagen para compartir
// (src/app/opengraph-image.tsx) reutiliza estos mismos trazos.
export const FLAME_PATH =
  "M13.5 3C13.5 3 10.5 6.5 10.5 10C10.5 11.5 11.5 12.5 12 14.5C10.5 13.5 9 12 9 10C9 8 10 6 10 6C6 8.5 5 12 5 14.5C5 18.5 8 21.5 12 21.5C16 21.5 19 18.5 19 14.5C19 10.5 13.5 3 13.5 3Z";
export const CORE_PATH =
  "M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.5 12 12 12C10.5 12 9 14.3431 9 16C9 17.6569 10.3431 19 12 19Z";

// Decorativa: el nombre de marca va siempre en texto al lado.
export const FireMark = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d={FLAME_PATH} fill="#FF4D00" />
    <path d={CORE_PATH} fill="#FF6B2C" fillOpacity="0.7" />
  </svg>
);
