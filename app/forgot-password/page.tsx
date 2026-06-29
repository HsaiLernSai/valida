import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { Card } from "@/components/ui/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Password recovery placeholder for the frontend-only Valida authentication foundation.",
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell>
      <Card className="w-full max-w-md p-6 text-center sm:p-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand">Forgot password</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink">Password recovery is UI-only</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Valida does not send reset emails yet because backend authentication is out of scope for Sprint v0.6A.</p>
        <a href="/login" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand-gradient px-4 text-sm font-bold text-white shadow-sm">Back to login</a>
      </Card>
    </AuthPageShell>
  );
}
