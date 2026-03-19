import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getSystemAvatar } from "./avatar.constant";

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
  const src = getSystemAvatar(id)?.src;

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
