import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function CreateResearchButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} aria-label="Create new research" title="New research" className="fixed bottom-20 right-4 z-40 h-11 w-11 rounded-full p-0 shadow-brand lg:hidden">
      <Icon name="plus" className="h-5 w-5" />
    </Button>
  );
}
