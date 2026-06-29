import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valida Community",
  description: "A thoughtful community for sharing ideas and learning together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
