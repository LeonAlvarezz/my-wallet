export function getKey<T>(obj: Record<string, string>, value: string) {
  return Object.keys(obj).find((key) => obj[key] === value) as T;
}
