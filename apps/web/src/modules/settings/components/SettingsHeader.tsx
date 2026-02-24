import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "@tanstack/react-router";

export function SettingsHeader({
  title,
  backLabel = "Back",
  backTo = "/profile",
}: {
  title: string;
  backLabel?: string;
  backTo?: string;
}) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between gap-3">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => router.history.push(backTo)}
        className="flex items-center gap-2"
      >
        <Icon icon="solar:arrow-left-linear" className="size-5" />
        <span className="text-sm">{backLabel}</span>
      </Button>

      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="w-[72px]" />
    </header>
  );
}
