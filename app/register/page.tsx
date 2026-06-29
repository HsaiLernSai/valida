import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a frontend-only Valida user session.",
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return <AuthPageShell><AuthForm mode="register" /></AuthPageShell>;
}
