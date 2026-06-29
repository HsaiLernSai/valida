export const designTokens = {
  colors: {
    ink: "#121A33",
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    secondary: "#7C3AED",
    cyan: "#22D3EE",
    accent: "#F97316",
    canvas: "#F7F8FC",
    surface: "#FFFFFF",
    mutedSurface: "#F1F5F9",
  },
  gradients: {
    brand: "linear-gradient(135deg, #2563EB 0%, #6366F1 52%, #7C3AED 100%)",
    brandHighlight: "linear-gradient(135deg, #2563EB 0%, #7C3AED 72%, #22D3EE 130%)",
    canvas: "radial-gradient(circle at 75% 0%, rgba(219, 234, 254, .82), transparent 32%), radial-gradient(circle at 18% 45%, rgba(237, 233, 254, .52), transparent 28%), linear-gradient(135deg, #FAFBFF 0%, #F7F8FC 58%, #FFFBF7 100%)",
  },
  radius: {
    control: "0.75rem",
    card: "1.25rem",
    feature: "1.5rem",
    pill: "9999px",
  },
  shadows: {
    card: "0 1px 2px rgba(18, 26, 51, .03), 0 12px 34px rgba(50, 65, 110, .06)",
    soft: "0 8px 30px rgba(50, 65, 110, .06)",
    floating: "0 16px 44px rgba(50, 65, 110, .18)",
    brand: "0 12px 28px rgba(79, 70, 229, .26)",
  },
  spacing: {
    tight: "0.5rem",
    control: "0.75rem",
    card: "1.25rem",
    section: "2rem",
    page: "3rem",
  },
  typography: {
    body: "System sans-serif stack; clear, neutral, and optimized for product reading.",
    logo: "Rounded, modern, confident, and startup-like with compact tracking.",
    heading: "Bold to extra-bold with slightly tightened tracking.",
    metadata: "Medium or semibold at 11–12px; never low-contrast for essential information.",
  },
} as const;

export type DesignTokens = typeof designTokens;
