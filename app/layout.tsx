import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { ThemeController } from "@/components/settings/ThemeController";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Valida — Validate Before You Build",
    template: "%s | Valida",
  },
  description: "Publish structured research, gather community feedback, and validate ideas before you build.",
  applicationName: "Valida",
  keywords: ["product research", "idea validation", "user research", "community feedback", "surveys"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Valida — Validate Before You Build",
    description: "Publish structured research and gather community feedback before you build.",
    url: "/",
    siteName: "Valida",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><ThemeController />{children}</body>
    </html>
  );
}
