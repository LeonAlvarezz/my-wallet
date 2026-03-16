type Props = {
  title?: string;
  description?: string;
};
export default function Empty({
  title = "No data found",
  description = "No data available yet",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border p-10">
      <h2 className="text-md">{title}</h2>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}
