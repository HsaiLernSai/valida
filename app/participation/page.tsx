import { ProfileShell } from "@/components/profile/ProfileShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participation",
  description: "Review research participation saved in your local Valida session.",
  robots: { index: false, follow: true },
};

export default function ParticipationPage() {
  return <ProfileShell initialSection="Participation" />;
}
