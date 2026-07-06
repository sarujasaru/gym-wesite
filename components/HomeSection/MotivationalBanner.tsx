"use client";

import React from "react";
import { Dumbbell } from "lucide-react";

interface MotivationalBannerProps {
  heroData: any;
}

export default function MotivationalBanner({ heroData }: MotivationalBannerProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-brand-dark-card border-l-8 border-brand-primary rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
          <Dumbbell className="h-80 w-80 text-brand-primary" />
        </div>
        <div className="max-w-4xl space-y-6">
          <div className="inline-block bg-brand-primary/15 text-brand-primary text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded">
            {heroData?.philosophyBadge || "LION HEART PHILOSOPHY"}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-cream leading-tight">
            &quot;{heroData?.philosophyQuote || "Only results, no excuses.."}&quot; <br />
            <span className="text-zinc-400 font-sans font-medium text-lg sm:text-xl block mt-2">
              &quot;
              {heroData?.philosophySubquote ||
                "No shortcuts. No commercial distractions. Just absolute discipline, scientific coaching, and steel."}
              &quot;
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {heroData?.philosophyBody}
          </p>
        </div>
      </div>
    </section>
  );
}
