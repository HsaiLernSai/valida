import { SettingsWorkspace } from "@/components/settings/SettingsWorkspace";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your local Valida profile, settings, privacy, and preferences.",
  robots: { index: false, follow: true },
};

export default function SettingsPage() {
  return <SettingsWorkspace />;
}
