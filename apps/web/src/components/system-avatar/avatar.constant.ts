export function isDirectAvatarSrc(id?: string | number | null): id is string {
  if (typeof id !== "string") {
    return false;
  }

  return (
    id.startsWith("/") ||
    id.startsWith("./") ||
    id.startsWith("../") ||
    id.startsWith("http://") ||
    id.startsWith("https://") ||
    id.startsWith("data:") ||
    id.startsWith("blob:")
  );
}

export function resolveSystemAvatarSrc(
  id?: string | number | null,
): string | undefined {
  if (id === null || id === undefined) {
    return undefined;
  }

  if (isDirectAvatarSrc(id)) {
    return id;
  }

  return `/avatars/${String(id)}.svg`;
}
