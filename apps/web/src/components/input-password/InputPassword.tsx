import { useState } from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type InputPasswordProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  leadingIcon?: string;
  visibilityLabels?: {
    show: string;
    hide: string;
  };
};

export default function InputPassword({
  className,
  leadingIcon,
  visibilityLabels = {
    show: "Show password",
    hide: "Hide password",
  },
  ...props
}: InputPasswordProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(leadingIcon && "pl-10", "pr-10", className)}
      />

      {leadingIcon && (
        <Icon
          icon={leadingIcon}
          className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2"
        />
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute top-1/2 right-1 -translate-y-1/2"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? visibilityLabels?.hide : visibilityLabels?.show}
      >
        <Icon
          icon={visible ? "solar:eye-closed-bold" : "solar:eye-bold"}
          className="size-4"
        />
      </Button>
    </div>
  );
}
