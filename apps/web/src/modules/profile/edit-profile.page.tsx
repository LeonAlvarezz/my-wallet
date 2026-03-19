import { CommonHeader } from "@/components/header/CommonHeader";
import { EditProfileForm } from "./components/form/EditProfileForm";

export function EditProfilePage() {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      <CommonHeader title="Edit Profile" />
      <EditProfileForm />
    </div>
  );
}
