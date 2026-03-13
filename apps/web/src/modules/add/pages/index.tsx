import SmartInput from "@/components/smart-input/SmartInput";
import MutateTransactionForm from "../components/forms/mutate-transaction-form/MutateTransactionForm";
import MutateTransactionFormFooter from "../components/forms/mutate-transaction-form/MutateTransactionFormFooter";
import MutateTransactionContext, {
  useMutateTransactionForm,
} from "../components/forms/mutate-transaction-form/use-mutate-transaction-context";
import { Button } from "@/components/ui/button";

export default function AddPage() {
  const formHook = useMutateTransactionForm({ action: "create" });
  const {
    smartText,
    setSmartText,
    setSmartAppliedOnce,
    setSubmitAttempts,
    form,
    loading,
    handleSmartSubmit,
  } = formHook;
  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-y-auto p-4 py-[calc(var(--bottom-nav-h))]">
      <MutateTransactionContext.Provider value={{ ...formHook }}>
        <MutateTransactionForm>
          <MutateTransactionFormFooter>
            <div className="max-w-mobile to-background fixed inset-x-0 bottom-0 m-auto bg-linear-180 px-4 pt-10">
              <div className="mb-[calc(var(--bottom-nav-total-h)+10px)] flex gap-2">
                <SmartInput
                  value={smartText}
                  onChange={(value) => {
                    setSmartText(value);
                    setSmartAppliedOnce(false);
                  }}
                  onSubmit={handleSmartSubmit}
                />
                <Button
                  type="button"
                  onClick={() => {
                    setSubmitAttempts((n) => n + 1);
                    form.handleSubmit();
                  }}
                  disabled={loading}
                  loading={loading}
                >
                  Save
                </Button>
              </div>
            </div>
          </MutateTransactionFormFooter>
        </MutateTransactionForm>
      </MutateTransactionContext.Provider>
    </div>
  );
}
