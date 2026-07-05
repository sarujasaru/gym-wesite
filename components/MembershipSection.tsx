'use client';

import React from 'react';
import { useGym } from '@/context/GymContext';
import { Check, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

interface MembershipSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function MembershipSection({ setActiveTab }: MembershipSectionProps) {
  const { plans } = useGym();

  const handleSelectPlan = (planId: string) => {
    // Navigate to register/portal and pre-select this plan
    // We can handle this by saving the selected plan to storage temporarily
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('selected_plan_id', planId);
    }
    setActiveTab('portal');
  };

  return (
    <div className="space-y-16 py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          MEMBERSHIP OPTIONS
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-brand-cream tracking-tight">
          Flexible Pricing &amp; Plans
        </h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-sm sm:text-base">
          No hidden admission fees or lengthy contracts. Select a tier suited to your athletic dedication. Prices shown in Sri Lankan Rupees (LKR).
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isPopular = plan.badge === 'Popular';
          const isElite = plan.badge === 'Elite';
          
          return (
            <div 
              key={plan._id}
              className={`bg-brand-dark-card rounded-3xl overflow-hidden border-2 flex flex-col justify-between transition-all duration-300 relative ${
                isPopular 
                  ? 'border-brand-primary shadow-lg shadow-brand-primary/10 scale-[1.02] md:scale-[1.03] z-10' 
                  : isElite
                  ? 'border-zinc-800 shadow-md'
                  : 'border-brand-primary/10 hover:border-brand-primary/20 shadow-sm'
              }`}
            >
              {/* Top Banner Tag */}
              {plan.badge && (
                <div className={`absolute top-4 right-4 font-mono text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                  isPopular 
                    ? 'bg-brand-primary text-brand-cream' 
                    : 'bg-zinc-800 text-brand-cream'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-cream">
                    {plan.name}
                  </h3>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed min-h-12">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline space-x-1 border-b border-brand-border pb-6">
                  <span className="text-zinc-500 font-mono text-sm font-black mr-1">Rs.</span>
                  <span className="font-display text-3xl sm:text-5xl font-black text-brand-cream tracking-tight">
                    {plan.priceLKR.toLocaleString()}
                  </span>
                  <span className="text-zinc-500 font-sans text-xs sm:text-sm font-medium">
                    / {plan.billingPeriod}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider block uppercase">
                    INCLUDED PRIVILEGES
                  </span>
                  <ul className="space-y-3">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-zinc-700">
                        <div className={`p-1 rounded-lg mt-0.5 flex-shrink-0 ${
                          isPopular ? 'bg-brand-primary/10 text-brand-primary' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className="leading-tight font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-8 pt-0">
                <button
                  onClick={() => handleSelectPlan(plan._id)}
                  className={`w-full py-4 px-6 rounded-2xl font-display text-sm font-bold tracking-wide transition-all duration-300 uppercase shadow-sm ${
                    isPopular 
                      ? 'bg-brand-primary hover:bg-brand-primary-hover text-brand-cream shadow-brand-primary/25' 
                      : isElite
                      ? 'bg-zinc-800 hover:bg-zinc-900 text-brand-cream'
                      : 'bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-brand-cream border border-brand-primary/25'
                  }`}
                >
                  SELECT THIS TIER
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Trust badging / Guarantee */}
      <section className="bg-brand-dark-card border border-brand-primary/15 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="bg-brand-primary/10 p-4 rounded-2xl text-brand-primary flex-shrink-0">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <div className="space-y-2 flex-grow text-center md:text-left">
          <h4 className="font-display text-lg sm:text-xl font-bold text-brand-cream">Our Zero-Risk Transparency Promise</h4>
          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
            No registration lock-ins. If you travel outside Sri Lanka or need a medical pause, you can freeze your membership up to 3 months with zero fees or penalties. Talk to any branch administrator to activate.
          </p>
        </div>
        <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-xs font-bold border-l-0 md:border-l border-brand-border pl-0 md:pl-10">
          <CreditCard className="h-5 w-5 text-brand-primary" />
          <span>Card / BOC / Cash accepted</span>
        </div>
      </section>
    </div>
  );
}
