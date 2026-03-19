import { useMemo, useState } from "react";
import { CommonHeader } from "@/components/header/CommonHeader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useUpdateMe } from "./hooks/use-update-me";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

const avatarModules = import.meta.glob<{ default: string }>(
  "../../assets/*.svg",
  { eager: true },
);

const avatarOptions = Object.entries(avatarModules)
  .map(([path, module]) => {
    const match = path.match(/(\d+)\.svg$/);
    return {
      id: match ? Number(match[1]) : path,
      src: module.default,
    };
  })
  .sort((left, right) => {
    if (typeof left.id === "number" && typeof right.id === "number") {
      return left.id - right.id;
    }

    return String(left.id).localeCompare(String(right.id));
  });

export default function AvatarSelectPage() {
  const { data: me } = useGetMe();

  if (!me) {
    return <Spinner className="m-auto" />;
  }

  return (
    <AvatarSelectContent key={me.public_id} initialAvatarUrl={me.avatar_url} />
  );
}

function AvatarSelectContent({
  initialAvatarUrl,
}: {
  initialAvatarUrl?: string | null;
}) {
  const updateMeMutation = useUpdateMe();
  const router = useRouter();

  const normalizedInitialAvatar = useMemo(() => {
    if (!initialAvatarUrl) {
      return null;
    }

    try {
      const parsed = new URL(initialAvatarUrl, window.location.origin);
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      return initialAvatarUrl;
    }
  }, [initialAvatarUrl]);

  const initialSelectedAvatar =
    avatarOptions.find((item) => item.src === normalizedInitialAvatar)?.src ??
    avatarOptions[0]?.src ??
    "";

  const [selectedAvatar, setSelectedAvatar] = useState(initialSelectedAvatar);

  const handleSave = async () => {
    if (!selectedAvatar) {
      return;
    }

    const absoluteAvatarUrl = new URL(
      selectedAvatar,
      window.location.origin,
    ).toString();

    await updateMeMutation.mutateAsync({
      avatar_url: absoluteAvatarUrl,
    });

    toast.success("Avatar updated");
    router.history.push("/profile/edit");
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      <CommonHeader title="Select Avatar" />

      {avatarOptions.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
          No system avatars found.
        </div>
      ) : (
        <section className="grid grid-cols-3 gap-3">
          {avatarOptions.map((avatar) => {
            const isSelected = selectedAvatar === avatar.src;

            return (
              <button
                key={String(avatar.id)}
                type="button"
                className={cn(
                  "bg-card border-input/50 flex flex-col items-center gap-2 rounded-lg border p-3",
                  isSelected && "ring-primary ring-2",
                )}
                onClick={() => setSelectedAvatar(avatar.src)}
                aria-pressed={isSelected}
              >
                <Avatar className="size-14">
                  <AvatarImage
                    src={avatar.src}
                    alt={`System avatar ${avatar.id}`}
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-xs">
                  #{avatar.id}
                </span>
              </button>
            );
          })}
        </section>
      )}

      <Button
        type="button"
        className="mt-auto w-full"
        loading={updateMeMutation.isPending}
        disabled={!selectedAvatar || updateMeMutation.isPending}
        onClick={handleSave}
      >
        Use this avatar
      </Button>
    </div>
  );
}
