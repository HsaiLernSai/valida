import type { Config } from "tailwindcss";
import { designTokens } from "./lib/design-tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: designTokens.colors.ink,
        canvas: designTokens.colors.canvas,
        surface: designTokens.colors.surface,
        brand: {
          DEFAULT: designTokens.colors.primary,
          dark: designTokens.colors.primaryDark,
          soft: "#eaf1ff",
        },
        secondary: designTokens.colors.secondary,
        highlight: designTokens.colors.cyan,
        accent: {
          DEFAULT: designTokens.colors.accent,
          soft: "#fff1e8",
        },
      },
      backgroundImage: {
        "brand-gradient": designTokens.gradients.brand,
        "brand-highlight": designTokens.gradients.brandHighlight,
        "app-gradient": designTokens.gradients.canvas,
      },
      borderRadius: {
        control: designTokens.radius.control,
        card: designTokens.radius.card,
        feature: designTokens.radius.feature,
      },
      boxShadow: {
        card: designTokens.shadows.card,
        soft: designTokens.shadows.soft,
        floating: designTokens.shadows.floating,
        brand: designTokens.shadows.brand,
      },
    },
  },
  plugins: [],
};

export default config;
