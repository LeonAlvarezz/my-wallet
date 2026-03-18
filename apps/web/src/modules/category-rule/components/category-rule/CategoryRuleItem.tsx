import DeleteButton from "@/components/delete-button/DeleteButton";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import type { CategoryRuleModel } from "@my-wallet/types";
type Props = {
  rule: CategoryRuleModel.CategoryRuleDto;
};
export default function CategoryRuleItem({ rule }: Props) {
  return (
    <li className="flex items-center justify-between">
      <div>{rule.keyword}</div>
      <div>
        <Button variant="simple" className="p-2!">
          <Icon icon="solar:pen-line-duotone" />
        </Button>
        <DeleteButton variant="icon" />
      </div>
    </li>
  );
}
