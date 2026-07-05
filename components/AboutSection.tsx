'use client';

import React, { useState, useEffect } from 'react';
import { useGym } from '@/context/GymContext';
import { motion } from 'framer-motion'; // 🌟 இம்போர்ட் சரி செய்யப்பட்டுள்ளது
import { Target, Eye, Trophy, Phone, Briefcase, Award } from 'lucide-react';
import { client } from '@/sanity/lib/client'; // 🌟 சானிட்டி கிளையண்ட் இம்போர்ட்
import imageUrlBuilder from '@sanity/image-url'; // 🌟 சானிட்டி இமேஜ் பில்டர் இம்போர்ட்

// சானிட்டி இமேஜ் ஆர்எல் பில்டர் செட்டப்
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface AboutSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function AboutSection({ setActiveTab }: AboutSectionProps) {
  // சானிட்டி ட்ரெய்னர்ஸ் டேட்டாவிற்கான ஸ்டேட்
  const [trainersData, setTrainersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🌟 சானிட்டியிலிருந்து ட்ரெய்னர்ஸ் (Coaches) விபரங்களை எடுக்கும் கியூரி
  useEffect(() => {
    async function fetchTrainers() {
      try {
        const query = `*[_type == "trainer"] | order(order asc) {
          _id,
          name,
          experienceYears,
          specialization,
          bio,
          contactPhone,
          image
        }`;
        const data = await client.fetch(query);
        setTrainersData(data);
      } catch (error) {
        console.error("Error fetching trainers from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrainers();
  }, []);

  return (
    <div className="space-y-16 py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          OUR ORIGIN & VALUES
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal italic text-brand-cream tracking-tight">
          Ceylon Iron Club
        </h1>
        <p className="text-brand-accent max-w-2xl mx-auto text-sm sm:text-base">
          Read our history, explore our core driving mission, and meet the certified elite mentors pushing physical boundaries in Sri Lanka.
        </p>
      </div>

      {/* History Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-md">
          <img 
            src="https://picsum.photos/seed/history/800/600" 
            alt="Gym Legacy"
            className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-brand-primary/5 rounded-2xl" />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/15 text-brand-primary font-mono text-xs font-bold px-3 py-1 rounded border border-brand-primary/20">
            <Trophy className="h-3.5 w-3.5" />
            <span>ESTABLISHED 2021 • COLOMBO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal italic text-brand-cream">
            Our History
          </h2>
          <div className="text-zinc-600 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Ceylon Iron Club was founded in late 2021 in Colombo 07. Seeing a rapid rise in commercialized, aesthetic-only gyms that focused more on lighting and selfie mirrors than scientific biomechanics, we set out to build a pure strength and conditioning enclave.
            </p>
            <p>
              We began as a modest workspace with single competition platform, two barbell sets, and an uncompromising dedication to safety. Within three years, our reputation for posture adjustment, actual compound progress, and authentic Sri Lankan dietary consulting drove us to open fully equipped centers in Galle and Kandy.
            </p>
            <p>
              Today, we are proud to serve over a thousand members—from active powerlifters and national athletes to elderly citizens seeking knee rehabilitation and students beginning their physical journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-brand-dark-card border-2 border-brand-border rounded-2xl p-8 space-y-4 hover:border-brand-primary/30 transition-colors">
          <div className="bg-brand-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-cream">Our Mission</h3>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            To empower Sri Lankans of all fitness levels with authentic, posture-first physical conditioning, science-backed guidance, and sustainable native nutrition to promote lifespans of functional vitality.
          </p>
        </div>

        <div className="bg-brand-dark-card border-2 border-brand-border rounded-2xl p-8 space-y-4 hover:border-brand-primary/30 transition-colors">
          <div className="bg-brand-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-cream">Our Vision</h3>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            To elevate Sri Lanka&apos;s gym culture by proving that strength training is a long-term medical and physical necessity, fostering an inclusive environment free of ego and chemical reliance.
          </p>
        </div>
      </section>

      {/* Trainers Introduction */}
      <section className="space-y-10" id="trainers">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
            THE COACHING ROSTER
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal italic text-brand-cream">
            Meet Our Elite Mentors
          </h2>
          <p className="text-brand-accent max-w-2xl mx-auto text-xs sm:text-sm">
            Our coaches hold active national qualifications and prioritize joint-preservation, physical metrics, and clear coaching instructions.
          </p>
        </div>

        {loading ? (
          <div className="text-center font-mono text-xs text-brand-cream py-10">
            Loading Elite Mentors from Sanity...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainersData && trainersData.map((trainer) => {
              // 🌟 சானிட்டி இமேஜ் ஆர்எல் கன்வெர்ஷன் லாஜிக்
              const trainerImgUrl = trainer.image 
                ? urlFor(trainer.image).url() 
                : 'https://picsum.photos/seed/coach/800/600';

              return (
                <motion.div 
                  key={trainer._id}
                  whileHover={{ y: -5 }}
                  className="bg-brand-dark-card rounded-2xl overflow-hidden border border-brand-border hover:border-brand-primary/35 shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-72 w-full bg-zinc-100 overflow-hidden">
                    <img 
                      src={trainerImgUrl} 
                      alt={trainer.name}
                      className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-all duration-300"
                    />
                    <div className="absolute bottom-4 left-4 bg-brand-primary text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center space-x-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{trainer.experienceYears} Years Experience</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow">
                    <div className="space-y-1">
                      <h3 className="font-display text-xl font-bold text-brand-cream">
                        {trainer.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {trainer.specialization && trainer.specialization.map((spec: string, i: number) => (
                          <span 
                            key={i} 
                            className="bg-brand-primary/10 text-brand-primary text-[10px] font-mono font-black tracking-wider px-2 py-0.5 rounded uppercase border border-brand-primary/20"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {trainer.bio}
                    </p>
                  </div>

                  <div className="p-6 pt-0 border-t border-brand-border flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-zinc-500 text-xs font-mono font-bold">
                      <Phone className="h-3.5 w-3.5 text-brand-primary" />
                      <span>{trainer.contactPhone}</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-mono font-bold px-3.5 py-2 rounded-lg transition-colors"
                    >
                      BOOK CLASS
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}