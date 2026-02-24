import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AmountInputProps {
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function AmountInput({
  defaultValue = 0,
  onChange,
  className,
}: AmountInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(String(defaultValue));
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const numValue = Number.parseFloat(value);
    const finalValue = Number.isFinite(numValue) ? numValue : 0;
    setValue(String(finalValue));
    onChange?.(finalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setValue(String(defaultValue));
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow digits and a single decimal point. Also covers paste.
    // Keep empty string allowed while editing; we'll coerce to 0 on blur.
    let sanitized = newValue.replace(/[^0-9.]/g, "");
    const firstDotIndex = sanitized.indexOf(".");
    if (firstDotIndex !== -1) {
      sanitized =
        sanitized.slice(0, firstDotIndex + 1) +
        sanitized.slice(firstDotIndex + 1).replace(/\./g, "");
    }
    console.log("sanitized:", sanitized);
    if (sanitized.startsWith("0")) sanitized = `${sanitized.replace("0", "")}`;
    if (sanitized.startsWith(".")) sanitized = `0${sanitized}`;
    setValue(sanitized);
  };

  return (
    <div
      onClick={() => {
        if (!isEditing) setIsEditing(true);
      }}
      className={cn("inline-flex", !isEditing && "cursor-pointer", className)}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        pattern="[0-9]*[.]?[0-9]*"
        value={value}
        placeholder="0"
        readOnly={!isEditing}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        // style={{ width: `${inputWidthCh + 0.25}ch` }}
        className={cn(
          "appearance-none bg-transparent p-0 text-5xl leading-none font-semibold tabular-nums outline-none placeholder:opacity-100",
          !isEditing && "pointer-events-none caret-transparent",
        )}
        style={{
          fieldSizing: "content",
        }}
      />
    </div>
  );
}
