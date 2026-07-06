"use client";

import React from "react";
import Image from "next/image";
import { Dumbbell, Flame, Award, Sparkles, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface SanityServiceData {
  _id: string;
  title: string;
  description: string;
  iconName: string;
  coverImage: any;
  order: number;
}

interface ServicesGridProps {
  sanityServices: SanityServiceData[];
  setActiveTab: (tab: string) => void;
}

export default function ServicesGrid({ sanityServices, setActiveTab }: ServicesGridProps) {
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

  return (
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
          const serviceImgUrl = service.coverImage
            ? urlFor(service.coverImage).auto("format").width(625).height(400).quality(75).url()
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
  );
}
