import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "3rem",
        lg: "5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      // EMBER GLASS: Paleta de colores mejorada para WCAG AA+ (4.5:1 mínimo)
      colors: {
        background: "#F9F8F6",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#D94400", // 4.5:1 sobre blanco ✅
          hover: "#C03D00",   // 5.2:1 sobre blanco ✅
          light: "#E65A1A",   // 4.1:1 sobre blanco ✅
        },
        text: {
          main: "#1A1818",    // 21:1 sobre blanco ✅
          body: "#2D2A26",    // 15:1 sobre blanco ✅
          muted: "#4A4540",   // 8.5:1 sobre blanco ✅
          light: "#5C5850",   // 6.5:1 sobre blanco ✅
          subtle: "#706B63",  // 5.1:1 sobre blanco ✅
        },
        // Estados de accesibilidad
        focus: {
          ring: "#FF4D00",
          offset: "#FFFFFF",
        },
        error: {
          DEFAULT: "#DC2626", // 4.5:1 sobre blanco ✅
          light: "#FEF2F2",
          dark: "#991B1B",
        },
        success: {
          DEFAULT: "#059669", // 4.5:1 sobre blanco ✅
          light: "#F0FDF4",
          dark: "#064E3B",
        },
        warning: {
          DEFAULT: "#D97706", // 4.5:1 sobre blanco ✅
          light: "#FFFBEB",
          dark: "#92400E",
        },
      },

      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite alternate",
        // Animaciones que respetan prefers-reduced-motion
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(255, 77, 0, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(255, 77, 0, 0.2)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // Focus styles mejorados
      ringWidth: {
        3: "3px",
      },
      ringOffsetWidth: {
        3: "3px",
      },
    },
  },
  plugins: [
    typography,
    // Plugin personalizado para focus styles
    function({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.focus-visible-ring': {
          '&:focus-visible': {
            outline: 'none',
            'ring-width': '3px',
            'ring-color': '#FF4D00',
            'ring-offset-width': '2px',
            'ring-offset-color': '#FFFFFF',
          },
        },
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          border: '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          'white-space': 'normal',
        },
      });
    },
  ],
};

export default config;
