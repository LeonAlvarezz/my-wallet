type AmountDisplayProps = {
  value: number;
  /** ISO currency code (e.g., 'USD', 'EUR') – defaults to 'USD' */
  currency?: string;
  /** Locale for formatting (e.g., 'en-US', 'de-DE') – defaults to browser locale */
  locale?: string;
  /** Whether to show the sign (+/-) explicitly */
  showSign?: boolean | "auto"; // 'auto' shows sign only for negative values
  /** Whether to apply semantic color (red for negative, green for positive) */
  colorize?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional custom formatter function (overrides default Intl formatting) */
  formatter?: (value: number, currency: string, locale: string) => string;
};

export const AmountDisplay = ({
  value,
  currency = "USD",
  locale,
  showSign = "auto",
  colorize = true,
  className = "",
  formatter,
}: AmountDisplayProps) => {
  // Determine if we should show a plus sign for positive values
  const shouldShowPlusSign =
    showSign === true || (showSign === "auto" && value > 0);
  const sign = value >= 0 ? (shouldShowPlusSign ? "+" : "") : "-";

  // Format the absolute value
  const absValue = Math.abs(value);
  let formattedValue: string;

  if (formatter) {
    formattedValue = formatter(
      absValue,
      currency,
      locale || navigator.language,
    );
  } else {
    const formatterInstance = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    });
    formattedValue = formatterInstance.format(absValue);
  }

  // Apply color based on sign if colorize is enabled
  const colorClass = colorize
    ? value > 0
      ? "text-green-500"
      : value < 0
        ? "text-red-500"
        : ""
    : "";

  return (
    <span className={`tabular-nums ${colorClass} ${className}`}>
      {sign}
      {formattedValue}
    </span>
  );
};
