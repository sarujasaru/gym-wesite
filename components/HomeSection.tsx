"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useGym } from "@/context/GymContext";
import { motion } from "motion/react";
import {
  Dumbbell,
  Flame,
  Award,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Star,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
// சானிட்டி இமேஜ் ஆர்எல் பில்டரை உருவாக்குவதற்கான இம்போர்ட்
import imageUrlBuilder from "@sanity/image-url";

// இமேஜ் பில்டர் செட்டப்
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
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

export default function HomeSection({ setActiveTab }: HomeSectionProps) {
  const { promotions } = useGym(); // services இனி சானிட்டியிலிருந்து பெறப்படும்
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);

  const [heroData, setHeroData] = useState<SanityHeroData | null>(null);
  const [sanityServices, setSanityServices] = useState<SanityServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicContent() {
      try {
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
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicContent();
  }, []);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPromoId(id);
    setTimeout(() => setCopiedPromoId(null), 2000);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Dumbbell":
        return <Dumbbell className="h-7 w-7 text-brand-primary" />;
      case "Flame":
        return <Flame className="h-7 w-7 text-brand-primary" />;
      case "Award":
        return <Award className="h-7 w-7 text-brand-primary" />;
      default:
        return <Sparkles className="h-7 w-7 text-brand-primary" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-center text-brand-cream py-20 font-mono">
        Loading dynamic content from Sanity...
      </div>
    );
  }

  const bgImageUrl = heroData?.backgroundImage
    ? urlFor(heroData.backgroundImage).width(1920).quality(80).url()
    : "https://picsum.photos/seed/srilankagym/1920/1080";

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-brand-dark overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-15 scale-105 overflow-hidden">
          <Image
            src={bgImageUrl}
            alt=""
            fill
            priority
            quality={80}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8 flex-1 flex flex-col justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/20 border border-brand-primary/40 px-3.5 py-1.5 rounded-full text-brand-accent text-xs font-mono font-bold tracking-[0.15em] uppercase"
          >
            <Star className="h-3.5 w-3.5 fill-brand-accent" />
            <span>
              {heroData?.badge || "Sri Lanka's Ultimate Strength Elite Club"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal italic tracking-tight text-brand-cream max-w-5xl mx-auto leading-[1.1] text-shadow-md"
          >
            {heroData?.title} <br />
            <span className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal italic tracking-tight text-brand-primary max-w-5xl mx-auto leading-[1.1] text-shadow-md">
              {heroData?.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-zinc-400 font-sans text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {heroData?.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
          </motion.div>
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

      {/* Motivational Banner Section */}
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

      {/* Special Offers Section */}
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
          {promotions
            .filter((p) => p.active === true)
            .map((promo) => (
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
                      Valid Until: {new Date(promo.validUntil).toLocaleDateString('en-GB')}
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

      {/* Services Grid (Sanity உடன் முழுமையாக ஒருங்கிணைக்கப்பட்டது) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
            OUR DISCIPLINES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal italic tracking-tight text-brand-cream">
            How We Build Elite Frames
          </h2>
          <p className="text-brand-accent max-w-2xl mx-auto text-sm sm:text-base">
            No mirrors, no shortcuts. We specialize in specific disciplines to
            trigger genuine, long-term athletic adaptation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sanityServices.map((service) => {
            // சானிட்டி இமேஜ் ஆப்ஜெக்ட்டை கன்வெர்ட் செய்து டைனமிக் URL பெறப்படுகிறது
            const serviceImgUrl = service.coverImage
              ? urlFor(service.coverImage).width(625).height(400).quality(75).url()
              : "https://picsum.photos/seed/gym/625/350";

            return (
              <div
                key={service._id}
                className="group bg-brand-dark-card rounded-2xl overflow-hidden border border-brand-border hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
                  <Image
                    src={serviceImgUrl}
                    alt={service.title}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 p-2.5 rounded-xl shadow-md border border-brand-border z-10">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>
                <div className="p-6 flex-grow space-y-3">
                  <h3 className="font-display text-lg font-bold text-brand-cream group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveTab("services")}
                    className="text-xs font-mono font-bold tracking-wider text-brand-primary flex items-center space-x-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>EXPLORE DISCIPLINE</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust badging info */}
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
    </div>
  );
}