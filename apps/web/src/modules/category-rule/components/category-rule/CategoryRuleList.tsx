import CategoryRuleItem from "./CategoryRuleItem";
import { useGetCategoryRuleByCategory } from "../../hooks/use-get-category-rule-by-category";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  id: number;
  enabled?: boolean;
};

export default function CategoryRuleList({ id, enabled = true }: Props) {
  const { data: rules, isLoading } = useGetCategoryRuleByCategory(id, enabled);
  const isEmpty = rules?.length === 0;

  if (isLoading) {
    return <Spinner className="m-auto" />;
  }

  return (
    <ol className="space-y-2 rounded-lg py-2">
      {isEmpty ? (
        <p className="text-muted-foreground border-dashed text-sm">
          No rules yet. Add your first keyword above.
        </p>
      ) : (
        rules?.map((rule) => <CategoryRuleItem key={rule.id} rule={rule} />)
      )}
    </ol>
  );
}
