// EMBER GLASS: Estilos del Header - Luminoso y cálido

export const styles = {
  // Header dinámico con glassmorphism cálido
  header: (isScrolled: boolean) => `
    fixed top-0 left-0 right-0 z-50 
    transition-all duration-500 ease-out will-change-transform
    ${isScrolled 
      ? 'h-20 bg-white/80 backdrop-blur-[20px] border-b border-[#1A1818]/5 shadow-[0_4px_30px_rgba(26,24,24,0.06)]' 
      : 'h-24 bg-transparent border-b border-transparent'}
  `,

  container: "h-full w-full max-w-[1440px] mx-auto px-6 md:px-12",
  
  wrapper: "h-full flex items-center justify-between",

  // Logo con estilo editorial
  logoContainer: "flex items-center gap-3 group cursor-pointer select-none outline-none",
  logoIcon: "relative z-10 transition-transform duration-400 ease-out group-hover:scale-110 group-active:scale-95", 
  logoText: `
    text-[#1A1818] font-semibold text-xl tracking-tight 
    group-hover:text-[#FF4D00] transition-colors duration-300
  `,

  // Navegación elegante
  nav: "hidden md:flex items-center gap-10",
  
  navLink: (isActive: boolean) => `
    relative text-sm font-medium capitalize tracking-wide transition-all duration-300
    ${isActive ? 'text-[#1A1818]' : 'text-[#6F6B65] hover:text-[#1A1818]'}
    
    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] 
    after:bg-[#FF4D00] after:transition-all after:duration-300 after:rounded-full
    ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
  `,

  // Acciones
  actions: "flex items-center gap-5",

  // CTA Button - Píldora con glow
  ctaButton: `
    hidden md:inline-flex
    bg-[#FF4D00] hover:bg-[#E64500] text-white font-medium tracking-wide
    rounded-full px-6 h-11
    shadow-[0_4px_20px_rgba(255,77,0,0.25)]
    hover:shadow-[0_8px_30px_rgba(255,77,0,0.35)]
    transition-all duration-300 
    hover:scale-[1.02] active:scale-[0.98]
  `,

  // Toggle móvil
  mobileToggle: `
    md:hidden p-3 text-[#1A1818] rounded-full 
    hover:bg-[#1A1818]/5 active:bg-[#1A1818]/10 transition-colors 
    border border-transparent hover:border-[#1A1818]/10
  `,
};
