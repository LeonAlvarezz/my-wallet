import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
type Props = {
  value: string;
  onSubmit: () => void;
  onChange: (value: string) => void;
};
export default function SmartInput({ onSubmit, value, onChange }: Props) {
  //   const [submitCount, setSubmitCount] = useState(0);

  return (
    <div className="relative w-full" id="smart-input">
      <Input
        placeholder="5 Starbucks #coffee"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          onSubmit();
        }}
        className="w-full"
      />
      <Button
        type="button"
        variant="barebone"
        className="absolute inset-y-1/2 right-1 z-20 h-fit w-fit -translate-y-1/2"
        onClick={onSubmit}
      >
        <Icon icon="solar:arrow-right-up-bold" className="size-5" />
      </Button>
    </div>
  );
}
