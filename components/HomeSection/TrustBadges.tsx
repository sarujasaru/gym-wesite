"use client";

import React from "react";
import { Dumbbell, Flame, Award } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="bg-brand-dark-card-lighter text-brand-cream py-16 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4 text-center md:text-left">
          <div className="bg-brand-primary/20 w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary mx-auto md:mx-0">
            <Dumbbell className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold">
            Scientific Mechanical Approach
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            We focus on biomechanical safety. No unmonitored lifting; every
            member receives complete stance adjustments to avoid spinal load
            damage.
          </p>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <div className="bg-brand-primary/20 w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary mx-auto md:mx-0">
            <Flame className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold">
            Custom Nutritional Maps
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            We build meal guides around accessible Sri Lankan ingredients (red
            rice, local mackerel, kurakkan, lentils, eggs) instead of
            expensive imported supplements.
          </p>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <div className="bg-brand-primary/20 w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary mx-auto md:mx-0">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold">
            Uncompromising Respect
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            We foster a zero-ego culture. Beginners, elders, and professional
            competitors train side-by-side. Mutual respect is a strict
            requirement.
          </p>
        </div>
      </div>
    </section>
  );
}
