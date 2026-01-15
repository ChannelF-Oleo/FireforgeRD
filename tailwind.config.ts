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
      // EMBER GLASS: Paleta de colores cálida y luminosa
      // NOTA: Colores ajustados para cumplir contraste WCAG AA (4.5:1)
      colors: {
        background: "#F9F8F6",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#D94400", // Ajustado de #FF4D00 para mejor contraste (4.5:1 sobre blanco)
          hover: "#C03D00",
          light: "#E65A1A",
        },
        text: {
          main: "#1A1818",
          body: "#3D3A36",
          muted: "#5C5850", // Ajustado de #6F6B65 para mejor contraste
          light: "#706B63", // Ajustado de #9C9890 para mejor contraste (4.5:1)
        },
      },

      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite alternate",
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
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [typography],
};

export default config;
