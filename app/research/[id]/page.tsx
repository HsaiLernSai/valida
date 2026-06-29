import { ResearchDetail } from "@/components/research/ResearchDetail";
import { posts } from "@/lib/mock-data";
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const post = posts.find((item) => item.id === params.id);
  if (!post) return { title: "Research", description: "Review and participate in community research on Valida.", robots: { index: false, follow: true } };
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default function ResearchDetailPage({ params }: { params: { id: string } }) {
  return <ResearchDetail researchId={params.id} />;
}
