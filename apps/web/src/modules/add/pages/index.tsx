import { Button } from "@/components/ui/button";
import { AmountInput } from "@/components/amount-input";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@iconify/react";

export default function AddPage() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 p-4">
      <section className="flex gap-24">
        <h1>Amount</h1>
        <div className="flex h-fit gap-1">
          <AmountInput defaultValue={0} />
          <div className="bg-primary h-fit w-fit rounded-sm px-2 py-1">
            <p className="text-xs">USD</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1>Category</h1>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <Button
              key={index}
              variant="barebone"
              className="flex h-full w-32 flex-col items-center justify-center rounded-sm bg-yellow-300/10 p-4"
            >
              <Icon
                icon="solar:lightbulb-bolt-bold-duotone"
                className="size-8 text-yellow-300"
              />
              <p className="font-bold text-yellow-300">Utility</p>
            </Button>
            // <div key={index}>
            //   <Button
            //     variant="dump"
            //     className="flex h-20 w-24 flex-col items-center justify-center rounded-sm bg-slate-200 p-4"
            //   >
            //     <Icon
            //       icon="solar:cup-paper-bold-duotone"
            //       className="size-8 text-slate-900"
            //     />
            //     <p className="font-bold text-slate-900">Coffee</p>
            //   </Button>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1>Note</h1>
        <Textarea
          placeholder="Tube Coffee, Aeon Shopping..."
          className="min-h-20"
        />
      </section>
      <Button>Add</Button>
    </div>
  );
}
