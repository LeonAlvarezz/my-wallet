const avatarModules = import.meta.glob<{ default: string }>("@/assets/*.svg");

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

export async function resolveSystemAvatarSrc(
  id?: string | number | null,
): Promise<string | undefined> {
  if (id === null || id === undefined) {
    return undefined;
  }

  if (isDirectAvatarSrc(id)) {
    return id;
  }

  const normalizedId = String(id);
  const entry = Object.entries(avatarModules).find(([path]) =>
    path.endsWith(`/${normalizedId}.svg`),
  );

  if (!entry) {
    return undefined;
  }

  const [, loadModule] = entry;
  const module = await loadModule();
  return module.default;
}
