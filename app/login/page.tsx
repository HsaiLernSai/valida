import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your frontend-only Valida session.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <AuthPageShell><AuthForm mode="login" /></AuthPageShell>;
}
