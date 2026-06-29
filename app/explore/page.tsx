import type { Metadata } from "next";
import { ExploreWorkspace } from "@/components/explore/ExploreWorkspace";

export const metadata: Metadata = {
  title: "Explore Research",
  description: "Search and browse research by topic, category, audience, author, and hashtag on Valida.",
};

export default function ExplorePage() {
  return <ExploreWorkspace />;
}
