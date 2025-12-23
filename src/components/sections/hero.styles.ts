// EMBER GLASS: Estilos del Hero - Luminoso, cálido, premium

export const styles = {
  // Sección principal - Fondo cálido con luz ambiental
  section: `
    relative min-h-screen flex items-center justify-center overflow-hidden 
    bg-background
  `,
  
  // Luz ambiental naranja difusa (Fire Glow)
  backgroundGradient: `
    absolute inset-0 
    bg-gradient-to-b from-glow-warm via-transparent to-transparent
    pointer-events-none
  `,
  
  // Patrón sutil de fondo (opcional, muy sutil)
  techGrid: "absolute inset-0 opacity-0",
  
  // Contenedor principal
  container: "relative z-20 container mx-auto px-6 text-center",
  
  // EMBER GLASS: Título con tipografía Serif editorial
  h1: `
    font-display text-5xl md:text-7xl lg:text-8xl xl:text-[6.5rem]
    font-light tracking-tight text-text-main
    mb-8 leading-[0.95]
  `,
  
  // Highlight con gradiente de fuego
  highlight: `
    text-ember font-normal
  `,
  
  // Subtítulo elegante
  p: `
    text-lg md:text-xl lg:text-2xl text-text-muted 
    mb-14 max-w-3xl mx-auto 
    leading-relaxed font-light
  `,
  
  // Grupo de botones
  buttonGroup: "flex flex-col sm:flex-row gap-4 justify-center items-center",
  
  // Botón primario - Píldora con glow cálido
  primaryBtn: `
    text-base px-10 py-4 font-medium tracking-wide
    bg-primary hover:bg-primary-hover text-white
    rounded-full
    shadow-[0_4px_25px_rgba(255,77,0,0.3)]
    hover:shadow-[0_8px_35px_rgba(255,77,0,0.4)]
    transition-all duration-300 ease-out
    hover:scale-[1.02] active:scale-[0.98]
  `,
  
  // Botón secundario - Outline elegante
  secondaryBtn: `
    text-base px-10 py-4 font-medium tracking-wide
    bg-transparent text-text-main
    rounded-full
    border border-text-main/15
    hover:border-primary/40 hover:text-primary
    hover:shadow-[0_4px_20px_rgba(255,77,0,0.1)]
    transition-all duration-300 ease-out
    active:scale-[0.98]
  `,
};
