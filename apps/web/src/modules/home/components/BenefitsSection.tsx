import { Card, CardContent } from "@/components/ui/card";
import { BENEFITS } from "../constants/home-content";
import { createTransitionDelayStyle } from "../utils/home-ui";
import { StaggerSection } from "./StaggerSection";

export function BenefitsSection() {
  return (
    <StaggerSection>
      <Card className="glow-card rounded-3xl">
        <CardContent className="space-y-4 px-5 pt-6 pb-5">
          <div>
            <p className="text-sm font-semibold">What You Get</p>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Everything you need to build a stronger money routine without
              dealing with clutter, confusion, or a bloated budgeting setup.
            </p>
          </div>

          <div className="space-y-3">
            {BENEFITS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-secondary/45 border-input/50 hover:bg-secondary/70 hover:border-primary/25 flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-200"
                  style={createTransitionDelayStyle(index * 40)}
                >
                  <div className="text-primary bg-primary/10 flex size-9 items-center justify-center rounded-xl">
                    <Icon className="size-4" />
                  </div>
                  <p className="text-sm">{item.title}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </StaggerSection>
  );
}
