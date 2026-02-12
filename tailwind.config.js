/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        Mobile: "390px",
        Tablet: "768px",
        Laptop: "1280px",
        Desktop: "1920px",
        DesktopHd: "2560px",
      },
      backgroundImage: {
        HeroImg: "url('/src/assets/img/Imagen1.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Default sans
        serif: ["Bodoni Moda", "serif"], // Default serif
        roboto: ["Roboto", "sans-serif"],
        bodoni: ["Bodoni Moda", "serif"],
      },
      colors: {
        // Nueva Paleta Minimalista de Lujo
        gold: {
          100: "#F9F1D8",
          200: "#F0E0AA",
          300: "#E6CE7D",
          400: "#D4AF37", // Base Gold
          500: "#AA8C2C",
          600: "#806921",
        },
        dark: {
          900: "#121212", // Casi negro
          800: "#1E1E1E",
          700: "#2C2C2C",
        },
        light: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
        },
        // Mantenemos compatibilidad con nombres anteriores si es necesario, pero remapeados
        primaryRed: "#9F1D35", // Un rojo más joya (Ruby)
        primaryGreen: "#1B4D3E", // Un verde esmeralda profundo
        primaryGreen2: "#D4AF37", // Remapeado a dorado para mantener consistencia si se usa
        primaryGray: "#E5E7EB",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        soft: "0 10px 40px -10px rgba(0,0,0,0.08)",
        glow: "0 0 20px rgba(212, 175, 55, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
