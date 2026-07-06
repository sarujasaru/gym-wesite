'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { useGym } from '@/context/GymContext';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react';
import { Dumbbell, Phone, MapPin, Mail, Clock, Heart, Flame } from 'lucide-react';

const SectionLoading = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-pulse bg-brand-dark">
    <div className="bg-brand-primary/20 p-4 rounded-xl text-brand-primary">
      <Dumbbell className="h-10 w-10 animate-spin" />
    </div>
    <span className="text-xs font-mono font-bold tracking-widest text-brand-accent uppercase">
      LOADING CEYLON IRON EXPERIENCE...
    </span>
  </div>
);

const HomeSection = dynamic(() => import('@/components/HomeSection'), { ssr: false, loading: SectionLoading });
const ServicesSection  = dynamic(() => import('@/components/ServicesSection'), { ssr: false, loading: SectionLoading });
const ScheduleSection  = dynamic(() => import('@/components/ScheduleSection'), { ssr: false, loading: SectionLoading });
const GallerySection   = dynamic(() => import('@/components/GallerySection'), { ssr: false, loading: SectionLoading });
const AboutSection     = dynamic(() => import('@/components/AboutSection'), { ssr: false, loading: SectionLoading });
const ContactSection   = dynamic(() => import('@/components/ContactSection'), { ssr: false, loading: SectionLoading });
const PortalSection    = dynamic(() => import('@/components/PortalSection'), { ssr: false, loading: SectionLoading });

interface MainLayoutProps {
  initialHeroData: any;
  initialServices: any[];
}

export default function MainLayout({ initialHeroData, initialServices }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { promotions } = useGym();

  // Find active promo banner
  const activeBanner = promotions.find(p => p.active);

  // Scroll to top on tab transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col justify-between" id="app-root">
      
      {/* Top Promotion Announcement Banner */}
      {activeBanner && (
        <div 
          className="bg-brand-primary text-white text-center py-2 px-4 text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center space-x-2 border-b border-white/10"
          id="promo-banner"
        >
          <Flame className="h-4 w-4 fill-white animate-pulse flex-shrink-0" />
          <span>{activeBanner.title}: {activeBanner.discountText}! Code: <strong>{activeBanner.promoCode}</strong></span>
        </div>
      )}

      {/* Header and Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dynamic View Section with animations */}
      <main className="flex-grow bg-brand-dark" id="main-content">
        <LazyMotion features={domAnimation} strict>
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {activeTab === 'home' && (
                <HomeSection 
                  setActiveTab={setActiveTab} 
                  initialHeroData={initialHeroData} 
                  initialServices={initialServices} 
                />
              )}
              {activeTab === 'services' && <ServicesSection setActiveTab={setActiveTab} />}
              {activeTab === 'schedule' && <ScheduleSection setActiveTab={setActiveTab} />}
              {activeTab === 'gallery' && <GallerySection />}
              {activeTab === 'about' && <AboutSection setActiveTab={setActiveTab} />}
              {activeTab === 'contact' && <ContactSection />}
              {activeTab === 'portal' && <PortalSection setActiveTab={setActiveTab} />}
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      </main>

      <ScrollToTopButton />

      {/* Footer in Deep Brand Dark Espresso Theme */}
      <footer className="bg-brand-dark border-t border-brand-primary/20 text-brand-cream py-16" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-primary p-2 rounded-lg text-white">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-black tracking-widest text-brand-cream">
                CEYLON IRON CLUB
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-medium">
              We focus purely on raw compound lift mechanics, biomechanical joint-safety, and local whole-food protein diet guides. No mirrors, no ego—just pure iron foundations.
            </p>
            <p className="text-[10px] text-brand-accent tracking-widest font-mono font-bold uppercase pt-2">
              Sri Lanka • Established 2021
            </p>
          </div>

          {/* Column 2: Branch Locations */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-wider text-brand-accent uppercase">
              OUR SL BRANCHES
            </h4>
            <ul className="space-y-3 font-mono text-[11px] font-bold text-zinc-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                <span>No. 45, Independence Avenue, Colombo 07</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                <span>No. 12, Pedlar Street, Galle Fort, Galle</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                <span>No. 88, Anagarika Dharmapala Mawatha, Kandy</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-wider text-brand-accent uppercase">
              GET IN TOUCH
            </h4>
            <ul className="space-y-3 font-mono text-[11px] font-bold text-zinc-400">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-primary" />
                <span>+94 11 234 5678 (Colombo HQ)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-primary" />
                <span className="hover:text-brand-primary transition-colors cursor-pointer">support@ceyloniron.lk</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-brand-primary" />
                <span>Daily 05:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Portals links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-wider text-brand-accent uppercase">
              RESOURCES
            </h4>
            <div className="flex flex-col space-y-2.5 font-display text-xs font-bold text-zinc-400">
              <button 
                onClick={() => setActiveTab('portal')} 
                className="text-left hover:text-brand-primary transition-colors cursor-pointer"
              >
                Client Booking Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('portal')} 
                className="text-left hover:text-brand-primary transition-colors cursor-pointer"
              >
                Administrator Console Login
              </button>
              <button 
                onClick={() => setActiveTab('schedule')} 
                className="text-left hover:text-brand-primary transition-colors cursor-pointer"
              >
                Weekly Training Timetable
              </button>
              <button 
                onClick={() => setActiveTab('services')} 
                className="text-left hover:text-brand-primary transition-colors cursor-pointer"
              >
                Gym Facilities & Equipment
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-zinc-850 text-center flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Ceylon Iron Club. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted for premium performance in Sri Lanka</span>
            <Heart className="h-3 w-3 text-brand-primary fill-brand-primary animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}