import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { HERO_HEADLINE_LINES, HERO_STATS } from "../constants/home-content";
import { useHeroLoaded } from "../hooks/use-hero-loaded";
import {
  createAnimationDelayStyle,
  homeDisplayFontStyle,
} from "../utils/home-ui";

export function HeroSection() {
  const isHeroLoaded = useHeroLoaded();

  return (
    <Card
      className="glow-card animate-card-float relative overflow-hidden rounded-3xl"
      style={createAnimationDelayStyle(200)}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="from-primary/10 absolute inset-x-0 top-0 h-36 bg-gradient-to-b to-transparent" />
        <div className="bg-primary/8 absolute -top-8 -right-8 size-40 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-1/4 h-24 w-48 bg-emerald-400/6 blur-2xl" />
      </div>

      <CardContent className="relative space-y-6 px-5 pt-6 pb-5">
        <div
          className="border-input/70 bg-secondary/60 text-muted-foreground animate-slide-up inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs"
          style={createAnimationDelayStyle(100)}
        >
          <Sparkles className="text-primary size-3.5" />A cleaner way to stay
          close to your money
        </div>

        <div className="space-y-3">
          <h1 className="hero-headline text-[2.6rem] leading-none">
            {isHeroLoaded &&
              HERO_HEADLINE_LINES.map((line, lineIndex) => (
                <span key={`line-${lineIndex}`}>
                  {line.map((word, wordIndex) => {
                    const animationIndex = lineIndex * line.length + wordIndex;
                    const isAccent = word === "calm.";

                    return (
                      <span
                        key={word}
                        className={cn("word", isAccent && "shimmer-accent")}
                        style={createAnimationDelayStyle(
                          120 + animationIndex * 90,
                        )}
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                  {lineIndex < HERO_HEADLINE_LINES.length - 1 && <br />}
                </span>
              ))}
          </h1>

          <p
            className="text-muted-foreground animate-slide-up max-w-[32rem] text-sm leading-6"
            style={createAnimationDelayStyle(480)}
          >
            Log transactions, understand cash flow, and build better money
            habits with a clean, focused interface that stays out of the way.
          </p>
        </div>

        <div
          className="animate-slide-up flex flex-wrap gap-3"
          style={createAnimationDelayStyle(560)}
        >
          <Button asChild size="lg" className="rounded-full">
            <Link to="/auth/register" preload={false}>
              Create account
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href="#preview">
              See preview
              <ChevronDown className="size-4" />
            </a>
          </Button>
        </div>

        <div
          className="animate-slide-up grid grid-cols-3 gap-3"
          style={createAnimationDelayStyle(640)}
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-secondary/55 border-input/50 hover:bg-secondary/80 hover:border-primary/30 rounded-2xl border p-3 transition-all duration-200"
            >
              <p
                className="text-primary text-lg font-bold"
                style={homeDisplayFontStyle}
              >
                {stat.value}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
