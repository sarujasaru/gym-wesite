"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface PromoData {
  _id: string;
  title: string;
  description: string;
  discountText: string;
  promoCode?: string;
  active: boolean;
  validUntil?: string;
}

interface SpecialOffersProps {
  promotions: PromoData[];
  setActiveTab: (tab: string) => void;
}

export default function SpecialOffers({ promotions, setActiveTab }: SpecialOffersProps) {
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPromoId(id);
    setTimeout(() => setCopiedPromoId(null), 2000);
  };

  const activePromos = promotions.filter((p) => p.active === true);

  if (activePromos.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8" id="offers">
      <div className="text-center md:text-left space-y-2">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          LIMITED TIME PROMOTIONS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal italic tracking-tight text-brand-cream">
          Exclusive Club Offers
        </h2>
        <p className="text-brand-accent max-w-2xl text-sm sm:text-base">
          Take advantage of our promotional schemes designed for the active
          Sri Lankan community to kickstart a serious lifestyle transition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activePromos.map((promo) => (
          <div
            key={promo._id}
            className="bg-brand-dark-card border-2 border-brand-border rounded-2xl p-6 md:p-8 relative flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 shadow-sm"
          >
            <div className="absolute top-6 right-6 bg-brand-primary/10 text-brand-primary font-mono text-xs font-bold px-3 py-1.5 rounded-lg max-w-[200px] text-center">
              {promo.discountText}
            </div>

            <div className="space-y-4 max-w-xs sm:max-w-md mt-4 sm:mt-0">
              <h3 className="font-display text-xl md:text-2xl font-black text-brand-cream">
                {promo.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {promo.description}
              </p>
              {promo.validUntil && (
                <p className="text-brand-primary font-mono text-[11px] uppercase tracking-wider">
                  Valid Until: {new Date(promo.validUntil).toLocaleDateString("en-GB")}
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider block uppercase">
                  PROMO CODE
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-mono text-base font-black text-brand-primary tracking-wider bg-brand-primary/10 px-3 py-1 rounded">
                    {promo.promoCode || "AUTO_APPLIED"}
                  </span>
                  {promo.promoCode && (
                    <button
                      onClick={() => handleCopyCode(promo._id, promo.promoCode!)}
                      className="text-zinc-400 hover:text-brand-primary p-1 rounded transition-colors"
                      title="Copy Code"
                    >
                      {copiedPromoId === promo._id ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => setActiveTab("portal")}
                className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-mono font-bold tracking-widest px-4 py-3 rounded-lg transition-all duration-300 uppercase"
              >
                CLAIM NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
