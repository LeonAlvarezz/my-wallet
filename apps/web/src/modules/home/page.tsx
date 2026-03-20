"use client";

import { BenefitsSection } from "./components/BenefitsSection";
import { HomeBackground } from "./components/HomeBackground";
import { HomeCtaSection } from "./components/HomeCtaSection";
import { HomeHeader } from "./components/HomeHeader";
import { HomePageStyles } from "./components/HomePageStyles";
import { HeroSection } from "./components/HeroSection";
import { PreviewSection } from "./components/PreviewSection";
import { TickerStrip } from "./components/TickerStrip";
import { WhyItWorksSection } from "./components/WhyItWorksSection";

export default function HomePage() {
  return (
    <main className="wallet-root bg-background text-foreground relative min-h-lvh overflow-hidden">
      <HomePageStyles />
      <HomeBackground />

      <div className="relative flex min-h-lvh flex-col gap-6 overflow-y-auto p-4 pb-16">
        <HomeHeader />
        <HeroSection />
        <TickerStrip />
        <PreviewSection />
        <WhyItWorksSection />
        <BenefitsSection />
        <HomeCtaSection />
      </div>
    </main>
  );
}
