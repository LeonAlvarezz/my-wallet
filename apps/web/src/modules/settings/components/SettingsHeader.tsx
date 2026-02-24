import BackButton from "@/components/back-button/BackButton";

export function SettingsHeader({
  title,
  backLabel = "Back",
}: {
  title: string;
  backLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <BackButton label={backLabel} />
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}