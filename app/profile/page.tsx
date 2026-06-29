import { ProfileShell } from "@/components/profile/ProfileShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Review your browser-local Valida research, participation history, and saved activity.",
  robots: { index: false, follow: true },
};

export default function ProfilePage() {
  return <ProfileShell />;
}
