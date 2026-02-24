import React, {
  useEffect,
  useMemo,
  useState,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type AmountInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue" | "type"
> & {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export function AmountInput({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  className,
  onBlur,
  ...props
}: AmountInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const numericValue = useMemo(
    () => controlledValue ?? defaultValue,
    [controlledValue, defaultValue],
  );

  const [draft, setDraft] = useState<string>(String(numericValue));
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    const numValue = Number.parseFloat(draft);
    const finalValue = Number.isFinite(numValue) ? numValue : 0;
    setDraft(String(finalValue));
    onChange?.(finalValue);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setDraft(String(numericValue));
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
    if (sanitized.startsWith("0")) sanitized = `${sanitized.replace("0", "")}`;
    if (sanitized.startsWith(".")) sanitized = `0${sanitized}`;
    setDraft(sanitized);
  };

  const displayValue = isEditing ? draft : String(numericValue);

  return (
    <div
      onClick={() => {
        if (!isEditing) {
          setDraft(String(numericValue));
          setIsEditing(true);
        }
      }}
      className={cn("inline-flex", !isEditing && "cursor-pointer", className)}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        pattern="[0-9]*[.]?[0-9]*"
        value={displayValue}
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
        {...props}
      />
    </div>
  );
}
