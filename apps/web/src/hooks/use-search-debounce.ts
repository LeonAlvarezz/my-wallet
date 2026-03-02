import { useEffect, useState } from "react";

export function useSearchDebounce(delayMs: number) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const trimmed = searchQuery.trim();
    const delay = trimmed ? delayMs : 0;

    const handle = window.setTimeout(() => {
      setDebouncedValue(trimmed);
    }, delay);

    return () => {
      window.clearTimeout(handle);
    };
  }, [searchQuery, delayMs]);

  return { searchQuery, setSearchQuery, debouncedValue };
}
