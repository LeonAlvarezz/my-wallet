import { CommonHeader } from "@/components/header/CommonHeader";
import { ChangePasswordForm } from "../components/forms/ChangePasswordForm";

export function ChangePasswordPage() {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      <CommonHeader title="Change Password" />
      <ChangePasswordForm />
    </div>
  );
}
