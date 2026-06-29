import { ProfileShell } from "@/components/profile/ProfileShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Research",
  description: "Review research created in your local Valida session.",
  robots: { index: false, follow: true },
};

export default function MyResearchPage() {
  return <ProfileShell initialSection="My Research" />;
}
