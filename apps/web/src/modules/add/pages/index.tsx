import AddTransactionForm from "../components/forms/AddTransactionForm";

export default function AddPage() {
  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-y-auto p-4 py-[calc(var(--bottom-nav-h))]">
      {" "}
      <AddTransactionForm />
    </div>
  );
}
