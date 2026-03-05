import { Icon } from "@iconify/react";
import { useRouter } from "@tanstack/react-router";

export function HubSection({
  title,
  items,
}: {
  title: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
    to?: string;
    disabled?: boolean;
  }>;
}) {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-muted-foreground text-sm font-semibold uppercase">
        {title}
      </h2>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              if (item.to) router.history.push(item.to);
            }}
            className="disabled:opacity-50"
          >
            <div className="bg-secondary hover:bg-accent/40 flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-secondary flex size-10 items-center justify-center rounded-lg">
                  <Icon icon={item.icon} className="size-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </div>

              <Icon
                icon="solar:alt-arrow-right-linear"
                className="text-muted-foreground size-5"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
