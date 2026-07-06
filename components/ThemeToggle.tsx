'use client';

import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  const toggle = () => {
    const html = document.documentElement;
    const nowDark = !html.classList.contains('dark');
    html.classList.toggle('dark');
    try {
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    } catch {}
    setIsDark(nowDark);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
      className="p-2 rounded-lg text-zinc-500 hover:text-brand-cream hover:bg-brand-primary/10 transition-all duration-200"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-brand-accent" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
