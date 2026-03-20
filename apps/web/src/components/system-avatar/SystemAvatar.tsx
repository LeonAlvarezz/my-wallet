import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { isDirectAvatarSrc, resolveSystemAvatarSrc } from "./avatar.constant";

type SystemAvatarProps = React.ComponentProps<typeof Avatar> & {
  id: string | undefined;
  alt?: string;
  fallback?: React.ReactNode;
  imageClassName?: string;
  fallbackClassName?: string;
};

export default function SystemAvatar({
  id,
  alt,
  fallback = "?",
  imageClassName,
  fallbackClassName,
  ...props
}: SystemAvatarProps) {
  const [src, setSrc] = React.useState<string | undefined>(() =>
    isDirectAvatarSrc(id) ? id : undefined,
  );

  React.useEffect(() => {
    let cancelled = false;

    if (!id) {
      setSrc(undefined);
      return;
    }

    if (isDirectAvatarSrc(id)) {
      setSrc(id);
      return;
    }

    setSrc(undefined);

    void resolveSystemAvatarSrc(id).then((resolvedSrc) => {
      if (!cancelled) {
        setSrc(resolvedSrc);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <Avatar {...props}>
      <AvatarImage
        src={src}
        alt={alt ?? (id ? `System avatar ${id}` : "System avatar")}
        className={imageClassName}
      />
      <AvatarFallback className={fallbackClassName}>{fallback}</AvatarFallback>
    </Avatar>
  );
}
