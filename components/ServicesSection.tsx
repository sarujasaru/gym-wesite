'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGym } from '@/context/GymContext';
import { Dumbbell, Flame, Award, Shield, Sparkles, Check } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface ServicesSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function ServicesSection({ setActiveTab }: ServicesSectionProps) {
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const query = `*[_type == "service"] | order(order asc) {
          _id,
          title,
          description,
          iconName,
          coverImage
        }`;
        const data = await client.fetch(query);
        setServicesData(data);
      } catch (error) {
        console.error("Error fetching services from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell': return <Dumbbell className="h-6 w-6" />;
      case 'Flame': return <Flame className="h-6 w-6" />;
      case 'Award': return <Award className="h-6 w-6" />;
      case 'Shield': return <Shield className="h-6 w-6" />;
      default: return <Sparkles className="h-6 w-6" />;
    }
  };

  const benefits = [
    'Complete body composition analysis before loading routines',
    'Customized macro plan leveraging local Sri Lankan grocery items',
    'Certified coach alignment for all compound structural lifts',
    'Locker room, private showers, and herbal steam recovery access',
    'Flexible booking hours with seamless mobile reschedules'
  ];

  if (loading) {
    return <div className="min-h-screen text-center text-brand-cream py-20 font-mono">Loading specialties from Sanity...</div>;
  }

  return (
    <div className="space-y-16 py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 🌟 முதல் ஹெடிங்: Services & Specialties */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          PHYSICAL DISCIPLINES
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal italic text-brand-cream tracking-tight">
          Services & Specialties
        </h1>
        <p className="text-brand-accent max-w-2xl mx-auto text-sm sm:text-base">
          From heavy compound lifting layouts to cardio metabolic acceleration and premium herbal sports recoveries.
        </p>
      </div>

      {/* 🌟 இரண்டாவது ஹெடிங்: How We Build Elite Frames (திரும்பக் கொண்டுவரப்பட்டுள்ளது) */}
      <div className="text-center space-y-2 pt-4">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          OUR DISCIPLINES
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal italic tracking-tight text-brand-cream">
          How We Build Elite Frames
        </h2>
        <p className="text-brand-accent max-w-2xl mx-auto text-sm sm:text-base">
          No mirrors, no shortcuts. We specialize in specific disciplines to trigger genuine, long-term athletic adaptation.
        </p>
      </div>

      {/* Main Services List */}
      <section className="space-y-12">
        {servicesData.map((service, index) => {
          const serviceImgUrl = service.coverImage 
            ? urlFor(service.coverImage).url() 
            : 'https://picsum.photos/seed/gym/800/600';

          return (
            <div 
              key={service._id}
              className={`flex flex-col lg:flex-row items-center gap-12 bg-brand-dark-card border border-brand-border rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-64 sm:h-80 w-full lg:w-1/2 rounded-2xl overflow-hidden bg-brand-dark shadow-sm">
                <Image 
                  src={serviceImgUrl} 
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-90 hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute top-6 left-6 bg-brand-primary p-3 rounded-xl text-white shadow-md">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
                  DISCIPLINE {index + 1}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-cream leading-tight">
                  {service.title}
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-brand-border flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-mono font-bold tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm">
                    VIEW CLASS TIMES
                  </button>
                  <button
                    onClick={() => setActiveTab('portal')}
                    className="bg-transparent hover:bg-brand-primary/5 text-brand-primary border border-brand-primary/40 text-xs font-mono font-bold tracking-wider px-5 py-3 rounded-xl transition-all"
                  >
                    JOIN CLUB
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Core Inclusions Banner */}
      <section className="bg-brand-dark-card border border-brand-border rounded-3xl p-8 md:p-12 text-brand-cream grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono font-black text-brand-accent tracking-widest uppercase block">
            STANDARD WITH ALL MEMBERSHIPS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal italic tracking-tight">
            Uncompromising Standards
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Every client at Ceylon Iron Club is treated with professional athletic precision. We do not upsell essential coaching safety; posture analysis and lift monitoring are standard protocols.
          </p>
        </div>

        <ul className="space-y-3">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm">
              <div className="bg-brand-primary/20 p-1.5 rounded-lg text-brand-accent mt-0.5 flex-shrink-0">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-zinc-300 font-medium leading-normal">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}