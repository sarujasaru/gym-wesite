"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useGym } from "@/context/GymContext";
import { LazyMotion, domAnimation, m } from "motion/react";
import { Dumbbell, ChevronRight, Star } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

// Lazy load below-the-fold components with ssr: false to improve Lighthouse score and JS payload
const MotivationalBanner = dynamic(() => import("./HomeSection/MotivationalBanner"), { ssr: false });
const SpecialOffers = dynamic(() => import("./HomeSection/SpecialOffers"), { ssr: false });
const ServicesGrid = dynamic(() => import("./HomeSection/ServicesGrid"), { ssr: false });
const TrustBadges = dynamic(() => import("./HomeSection/TrustBadges"), { ssr: false });

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  initialHeroData?: any;
  initialServices?: any[];
}

// சானிட்டி Hero JSON டேட்டாவிற்கான Interface
interface SanityHeroData {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  backgroundImage: any;
  primaryButtonText: string;
  secondaryButtonText: string;
  philosophyBadge: string;
  philosophyQuote: string;
  philosophySubquote: string;
  philosophyBody: string;
}

// நீங்கள் கொடுத்த சானிட்டி Service ஸ்கீமாவின்படி உருவாக்கப்பட்ட புதிய Interface
interface SanityServiceData {
  _id: string;
  title: string;
  description: string;
  iconName: string;
  coverImage: any; // சானிட்டி இமேஜ் ஆப்ஜெக்ட்
  order: number;
}

export default function HomeSection({ setActiveTab, initialHeroData, initialServices }: HomeSectionProps) {
  const { promotions } = useGym(); // services இனி சானிட்டியிலிருந்து பெறப்படும்
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);

  const heroData: SanityHeroData | null = initialHeroData || null;
  const sanityServices: SanityServiceData[] = initialServices || [];

  const bgImageUrl = React.useMemo(() => {
    return heroData?.backgroundImage
      ? urlFor(heroData.backgroundImage).auto("format").width(1600).quality(75).url()
      : "https://picsum.photos/seed/srilankagym/1920/1080";
  }, [heroData]);

  return (
    <LazyMotion features={domAnimation} strict>
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
     <section className="relative min-h-[90vh] md:min-h-[85vh] py-12 md:py-20 flex items-center justify-center bg-brand-dark overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-luminosity scale-105">
          <Image
            src={bgImageUrl}
            alt="Ceylon Iron Club Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Brand Theme Vignette and Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-6">
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/20 border border-brand-primary/40 px-3.5 py-1.5 rounded-full text-brand-accent text-xs font-mono font-bold tracking-[0.15em] uppercase"
          >
            <Star className="h-3.5 w-3.5 fill-brand-accent" />
            <span>Sri Lanka&apos;s Ultimate Strength Elite Club</span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal italic tracking-tight text-brand-cream max-w-5xl mx-auto leading-[1.1] text-shadow-md"
          >
            Forge Your Best <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              Self Today.
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-zinc-300 font-sans text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Scientific posture-first coaching, customized high-protein Sri Lankan diet maps, and plate-loaded heavy mechanical rigs. Colombo 07 • Kandy • Galle.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => setActiveTab('portal')}
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-extrabold tracking-wide text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/30 hover:scale-[1.03] flex items-center justify-center space-x-2.5"
            >
              <span>JOIN AS A MEMBER</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className="w-full sm:w-auto bg-brand-dark-card/80 hover:bg-brand-dark-card border border-brand-primary/50 hover:border-brand-primary text-brand-cream font-display font-bold tracking-wide text-base px-8 py-4 rounded-xl transition-all duration-300"
            >
              VIEW CLASS SCHEDULE
            </button>
          </m.div>

          {/* Floating Stat accents in reddish-brown */}
          <div className="mx-auto hidden md:flex items-center space-x-16 bg-brand-dark-card/90 border border-brand-primary/20 px-10 py-5 rounded-2xl backdrop-blur-md mt-10">
            <div className="text-center">
              <div className="font-display text-2xl font-black text-brand-primary">1200+</div>
              <div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">ACTIVE LIFTERS</div>
            </div>
            <div className="h-8 w-px bg-brand-primary/20" />
            <div className="text-center">
              <div className="font-display text-2xl font-black text-brand-primary">15+</div>
              <div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">ELITE MENTORS</div>
            </div>
            <div className="h-8 w-px bg-brand-primary/20" />
            <div className="text-center">
              <div className="font-display text-2xl font-black text-brand-primary">3</div>
              <div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">SL CENTERS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic below-the-fold sections configured for high-performance rendering */}
      <MotivationalBanner heroData={heroData} />
      <SpecialOffers promotions={promotions} setActiveTab={setActiveTab} />
      <ServicesGrid sanityServices={sanityServices} setActiveTab={setActiveTab} />
      <TrustBadges />
    </div>
    </LazyMotion>
  );
}
