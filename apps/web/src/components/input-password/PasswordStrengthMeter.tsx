import { cn } from "@/lib/utils";

type PasswordStrengthMeterProps = {
  password: string;
  className?: string;
};

const strengthColors = [
  "bg-destructive",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
];

const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong"];

function getPasswordStrength(password: string) {
  if (password.length >= 8) {
    return 3;
  }

  if (password.length >= 6) {
    return 2;
  }

  if (password.length >= 4) {
    return 1;
  }

  return 0;
}

export default function PasswordStrengthMeter({
  password,
  className,
}: PasswordStrengthMeterProps) {
  if (!password.length) {
    return null;
  }

  const strength = getPasswordStrength(password);

  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-top-2 mt-2 space-y-1 duration-500",
        className,
      )}
    >
      <div className="bg-border flex h-1.5 w-full gap-1 overflow-hidden rounded-full">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              "h-full flex-1 rounded-full transition-all duration-500",
              index <= strength ? strengthColors[strength] : "bg-transparent",
            )}
          />
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        Strength:{" "}
        <span className="font-medium">{strengthLabels[strength]}</span>
      </p>
    </div>
  );
}
