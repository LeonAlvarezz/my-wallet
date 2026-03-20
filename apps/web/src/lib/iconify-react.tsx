import type { IconProps } from "@iconify/react/dist/iconify.js";
import { Icon as RemoteIcon } from "@iconify/react/dist/iconify.js";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  CirclePlus,
  CircleUserRound,
  Coffee,
  Ellipsis,
  Eye,
  EyeClosed,
  Home,
  Inbox,
  KeyRound,
  LockKeyhole,
  LogIn,
  LogOut,
  Mail,
  Pencil,
  PencilLine,
  ReceiptText,
  Save,
  Search,
  ShieldCheck,
  Tag,
  Trash2,
  UserRound,
  UserRoundPlus,
  Wallet,
} from "lucide-react";

const localIcons: Record<string, LucideIcon> = {
  "solar:add-circle-line-duotone": CirclePlus,
  "solar:alt-arrow-down-linear": ArrowDown,
  "solar:alt-arrow-right-linear": ArrowRight,
  "solar:arrow-down-bold": ArrowDown,
  "solar:arrow-down-bold-duotone": ArrowDown,
  "solar:arrow-left-linear": ArrowLeft,
  "solar:arrow-right-up-bold": ArrowUpRight,
  "solar:arrow-up-bold": ArrowUp,
  "solar:arrow-up-bold-duotone": ArrowUp,
  "solar:bill-list-line-duotone": ReceiptText,
  "solar:check-circle-bold": BadgeCheck,
  "solar:cup-paper-bold-duotone": Coffee,
  "solar:diskette-bold-duotone": Save,
  "solar:eye-bold": Eye,
  "solar:eye-closed-bold": EyeClosed,
  "solar:home-2-line-duotone": Home,
  "solar:inbox-bold": Inbox,
  "solar:letter-bold-duotone": Mail,
  "solar:lock-keyhole-minimalistic-bold-duotone": LockKeyhole,
  "solar:lock-password-bold-duotone": KeyRound,
  "solar:login-3-bold": LogIn,
  "solar:logout-2-bold": LogOut,
  "solar:magnifer-bold": Search,
  "solar:menu-dots-bold": Ellipsis,
  "solar:pen-bold": Pencil,
  "solar:pen-line-duotone": PencilLine,
  "solar:pen-new-square-linear": PencilLine,
  "solar:shield-check-bold-duotone": ShieldCheck,
  "solar:tag-bold-duotone": Tag,
  "solar:trash-bin-2-line-duotone": Trash2,
  "solar:trash-bin-trash-linear": Trash2,
  "solar:user-circle-bold-duotone": UserRound,
  "solar:user-circle-line-duotone": CircleUserRound,
  "solar:user-plus-bold": UserRoundPlus,
  "solar:wallet-bold": Wallet,
};

export type { IconProps } from "@iconify/react/dist/iconify.js";

export function Icon({ icon, strokeWidth, ...props }: IconProps) {
  if (typeof icon === "string") {
    const LocalIcon = localIcons[icon];

    if (LocalIcon) {
      return <LocalIcon strokeWidth={strokeWidth ?? 2} {...props} />;
    }
  }

  return <RemoteIcon icon={icon} strokeWidth={strokeWidth} {...props} />;
}
