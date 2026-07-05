'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 bg-brand-primary hover:bg-brand-primary-hover text-white p-3 rounded-full shadow-lg hover:shadow-brand-primary/40 hover:scale-110 transition-all duration-300"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
