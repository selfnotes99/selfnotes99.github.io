import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#064B35",      // Primary dark green
          secondary: "#0B6B47",    // Secondary green
          bright: "#78B82A",       // Bright brand green (logo Retail & icons)
          light: "#EAF4D5",        // Light green pill & benefits
          lightest: "#F3F8E8",     // Very light green
          footer: "#063F2D",       // Dark footer green
        },
        cream: {
          DEFAULT: "#FFF9EF",      // Footer & card cream
          warm: "#FFFDF8",         // Warm background
          hero: "#FBF6EE",         // Hero background
        },
        sale: {
          red: "#F4512A",          // Sale badge red
          orange: "#FF6A24",       // Orange buttons / discount
        },
        gold: {
          rating: "#F5A623",       // Gold star rating
        },
        surface: {
          dark: "#111111",
          secondary: "#555555",
          muted: "#777777",
          border: "#E5E5E5",
          borderSoft: "#EEEEEE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      maxWidth: {
        container: "1400px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.04)",
        cardHover: "0 8px 24px rgba(0,0,0,0.08)",
        dropdown: "0 10px 30px rgba(0,0,0,0.08)",
        trustBadge: "0 4px 20px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        hero: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
