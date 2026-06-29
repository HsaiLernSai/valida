"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { clearAuthUser } from "@/lib/auth-storage";

export function LogoutButton({ className = "" }: { className?: string }) {
  const { t } = useI18n();
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
      {t("auth.logout")}
    </Button>
  );
}
