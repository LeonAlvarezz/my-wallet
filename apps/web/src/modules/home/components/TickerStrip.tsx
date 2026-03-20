import { TICKER_ITEMS } from "../constants/home-content";
import { StaggerSection } from "./StaggerSection";

export function TickerStrip() {
  return (
    <StaggerSection>
      <div className="border-input/40 bg-secondary/30 relative overflow-hidden rounded-2xl border py-2.5">
        <div className="ticker-track animate-ticker">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="text-muted-foreground flex items-center gap-3 px-4 text-xs"
              >
                <span className="bg-primary/50 inline-block size-1 shrink-0 rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="from-background/80 pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent" />
        <div className="from-background/80 pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
      </div>
    </StaggerSection>
  );
}
