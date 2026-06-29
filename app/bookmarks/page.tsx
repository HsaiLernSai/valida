import { ProfileShell } from "@/components/profile/ProfileShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "Review saved research placeholders in your local Valida session.",
  robots: { index: false, follow: true },
};

export default function BookmarksPage() {
  return <ProfileShell initialSection="Bookmarks" />;
}
