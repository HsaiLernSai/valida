import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { CreateResearchButton } from "@/components/feed/CreateResearchButton";
import type { ReactNode } from "react";

export function AppShell({ children, onCreateResearch }: { children: ReactNode; onCreateResearch: () => void }) {
  return (
    <div className="min-h-screen bg-app-gradient">
      <div className="mx-auto flex min-h-screen max-w-[1480px]">
        <LeftSidebar onCreateResearch={onCreateResearch} />
        <div className="min-w-0 flex-1">
          <div className="mx-auto flex max-w-[1248px] justify-center gap-7 px-4 sm:px-6 lg:px-8 xl:px-0">
            {children}
            <RightSidebar />
          </div>
          <MobileBottomNav onCreateResearch={onCreateResearch} />
          <CreateResearchButton onClick={onCreateResearch} />
        </div>
      </div>
    </div>
  );
}
