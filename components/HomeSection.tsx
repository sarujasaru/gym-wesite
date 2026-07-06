"use client";

import React, { useState, useEffect } from "react";
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

  const [heroData, setHeroData] = useState<SanityHeroData | null>(initialHeroData || null);
  const [sanityServices, setSanityServices] = useState<SanityServiceData[]>(initialServices || []);

  useEffect(() => {
    async function fetchDynamicContent() {
      try {
        const { client } = await import("@/sanity/lib/client");
        // 1. Hero டேட்டாவிற்கான கியூரி
        const heroQuery = `*[_type == "hero"][0]{
          badge,
          title,
          titleAccent,
          subtitle,
          backgroundImage,
          primaryButtonText,
          secondaryButtonText,
          philosophyBadge,
          philosophyQuote,
          philosophySubquote,
          philosophyBody
        }`;

        // 2. Services டேட்டாவிற்கான புதிய சானிட்டி GROQ கியூரி (வரிசைப்படுத்துதலுடன் - order)
        const servicesQuery = `*[_type == "service"] | order(order asc)[0...3]{
          _id,
          title,
          description,
          iconName,
          coverImage,
          order
        }`;

        const [heroRes, servicesRes] = await Promise.all([
          client.fetch(heroQuery),
          client.fetch(servicesQuery),
        ]);

        setHeroData(heroRes);
        setSanityServices(servicesRes);
      } catch (error) {
        console.error("Sanity fetching error:", error);
      }
    }
    fetchDynamicContent();
  }, []);

  const bgImageUrl = React.useMemo(() => {
    return heroData?.backgroundImage
      ? urlFor(heroData.backgroundImage).auto("format").width(1600).quality(75).url()
      : "https://picsum.photos/seed/srilankagym/1920/1080";
  }, [heroData]);

  return (
    <LazyMotion features={domAnimation} strict>
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-brand-dark overflow-hidden py-16 md:py-24">
        {bgImageUrl && (
          <div className="absolute inset-0 opacity-15 scale-105 overflow-hidden">
            <Image
              src={bgImageUrl}
              alt="Ceylon Iron Club Hero Background"
              fill
              priority
              fetchPriority="high"
              quality={85}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8 flex-1 flex flex-col justify-center items-center w-full">
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/20 border border-brand-primary/40 px-3.5 py-1.5 rounded-full text-brand-accent text-xs font-mono font-bold tracking-[0.15em] uppercase"
          >
            <Star className="h-3.5 w-3.5 fill-brand-accent" />
            <span>
              {heroData?.badge || "Sri Lanka's Ultimate Strength Elite Club"}
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal italic tracking-tight text-brand-cream max-w-5xl mx-auto leading-[1.1] text-shadow-md"
          >
            {heroData?.title || 'Forge Your'} <br />
            <span className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal italic tracking-tight text-brand-primary max-w-5xl mx-auto leading-[1.1] text-shadow-md">
              {heroData?.titleAccent || 'Elite Physique'}
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-400 font-sans text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {heroData?.subtitle || "Sri Lanka's premier strength & conditioning club. Expert coaching, science-backed programming, and authentic nutrition for every level."}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-12 w-full"
          >
            <button
              onClick={() => setActiveTab("portal")}
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-extrabold tracking-wide text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/30 hover:scale-[1.03] flex items-center justify-center space-x-2.5"
            >
              <span>{heroData?.primaryButtonText || "JOIN AS A MEMBER"}</span>
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => setActiveTab("schedule")}
              className="w-full sm:w-auto bg-white/80 hover:bg-white border border-brand-primary/50 hover:border-brand-primary text-black font-display font-bold tracking-wide text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-sm"
            >
              {heroData?.secondaryButtonText || "VIEW CLASS SCHEDULE"}
            </button>
          </m.div>
        </div>

        {/* Floating Stats */}
        <div className="relative md:absolute bottom-0 md:bottom-6 left-0 md:left-1/2 md:-translate-x-1/2 mx-auto md:mx-0 flex items-center space-x-16 bg-brand-dark-card/90 border border-brand-primary/20 px-10 py-5 rounded-2xl backdrop-blur-md z-10">
          <div className="text-center">
            <div className="font-display text-2xl font-black text-brand-primary">
              1200+
            </div>
            <div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
              ACTIVE LIFTERS
            </div>
          </div>
          <div className="h-8 w-px bg-brand-border" />
          <div className="text-center">
            <div className="font-display text-2xl font-black text-brand-primary">
              15+
            </div>
            <div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
              ELITE MENTORS
            </div>
          </div>
          <div className="h-8 w-px bg-brand-border" />
          <div className="text-center">
            <div className="font-display text-2xl font-black text-brand-primary">
              3
            </div>
            <div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
              SL CENTERS
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
