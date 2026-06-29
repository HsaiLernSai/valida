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
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-elevated": "rgb(var(--color-surface-elevated) / <alpha-value>)",
        "surface-muted": "rgb(var(--color-surface-muted) / <alpha-value>)",
        brand: {
          DEFAULT: designTokens.colors.primary,
          dark: designTokens.colors.primaryDark,
          soft: "rgb(var(--color-brand-soft) / <alpha-value>)",
        },
        secondary: designTokens.colors.secondary,
        highlight: designTokens.colors.cyan,
        accent: {
          DEFAULT: designTokens.colors.accent,
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
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
