import { ResearchDetail } from "@/components/research/ResearchDetail";

export default function ResearchDetailPage({ params }: { params: { id: string } }) {
  return <ResearchDetail researchId={params.id} />;
}
