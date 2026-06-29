"use client";

import { Button } from "@/components/ui/Button";
import { clearAuthUser } from "@/lib/auth-storage";

export function LogoutButton({ className = "" }: { className?: string }) {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => {
        clearAuthUser();
        window.location.href = "/login";
      }}
      className={`rounded-xl text-xs ${className}`}
    >
      Log out
    </Button>
  );
}
