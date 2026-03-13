export default function MutateTransactionFormFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-slot="add-form-footer">{children}</div>;
}
