'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trophy, Quote } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

export default function GallerySection() {
  // 🌟 சானிட்டி கேலரி தரவிற்கான ஸ்டேட்ஸ்
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gym' | 'equipment' | 'success-story'>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'gym', label: 'Gym Facility' },
    { id: 'equipment', label: 'Heavy Equipment' },
    { id: 'success-story', label: 'Success Stories' },
  ];

  // 🌟 சானிட்டியிலிருந்து கேலரி விபரங்களை எடுக்கும் கியூரி
  useEffect(() => {
    async function fetchGallery() {
      try {
        const { client } = await import('@/sanity/lib/client');
        // நீங்கள் கொடுத்த அமைப்பின்படி `order` அடிப்படையில் வரிசைப்படுத்தி எடுக்கிறது
        const query = `*[_type == "gallery"] | order(order asc) {
          _id,
          title,
          category,
          description,
          image,
          order
        }`;
        const data = await client.fetch(query);
        setGalleryData(data);
      } catch (error) {
        console.error("Error fetching gallery from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filteredGallery = selectedCategory === 'all'
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-12 py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          VISUAL SHOWCASE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal italic text-brand-cream tracking-tight">
          Club Gallery & Stories
        </h1>
        <p className="text-brand-accent max-w-2xl mx-auto text-sm sm:text-base">
          Browse our raw, unfiltered training atmospheres, heavy biomechanical equipment plates, and our celebrated member success narratives.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2 border-b border-brand-border">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all ${
              selectedCategory === cat.id
                ? 'bg-brand-primary  text-white shadow-md shadow-brand-primary/10'
                : 'bg-brand-dark-card hover:bg-brand-primary/10 text-brand-accent border border-brand-border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center font-mono text-xs text-brand-cream py-12">
          Loading Visual Showcase from Sanity...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item) => {
            const isSuccessStory = item.category === 'success-story';
            
            // 🌟 சானிட்டி இமேஜ் ஆப்ஜெக்ட்டை நெக்ஸ்ட் ஜேஎஸ் இல் காட்டுவதற்கு URL ஆக மாற்றுகிறது
            const imageUrl = item.image ? urlFor(item.image).auto('format').width(800).height(600).quality(75).url() : '';

            return (
              <div 
                key={item._id}
                className={`group bg-brand-dark-card rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isSuccessStory 
                    ? 'border-brand-primary/30 hover:border-brand-primary/50 shadow-sm' 
                    : 'border-brand-border hover:border-brand-primary/20 shadow-sm'
                }`}
              >
                {/* Image Section */}
                <div className="relative h-64 sm:h-72 w-full bg-zinc-900 overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md uppercase">
                    {item.category === 'gym' ? 'FACILITY' : item.category === 'equipment' ? 'STEEL PLATE' : 'TRANSFORMATION'}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-brand-cream group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {isSuccessStory && (
                    <div className="bg-brand-primary/10 border border-brand-border p-4 rounded-2xl flex items-start space-x-2.5 mt-4">
                      <Quote className="h-5 w-5 text-brand-primary rotate-180 flex-shrink-0" />
                      <span className="text-zinc-400 font-mono text-[10px] leading-tight italic block">
                        Authentic results verified under physical bio-scans at Colombo Branch.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom callout */}
      <section className="bg-brand-dark-card border border-brand-border text-brand-cream rounded-3xl p-8 md:p-12 text-center space-y-6">
        <Trophy className="h-10 w-10 text-brand-primary mx-auto animate-bounce" />
        <h2 className="font-serif text-2xl sm:text-3xl font-normal italic max-w-xl mx-auto leading-tight">
          Ready to Write Your Own Success Story?
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Join a brotherhood of lifters pushing through hurdles daily. It requires zero experience to start. We adjust weights to fit your current capability and build upward step-by-step.
        </p>
      </section>
    </div>
  );
}
