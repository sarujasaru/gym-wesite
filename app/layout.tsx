import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles
import { GymProvider } from '@/context/GymContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ceylonironclub.lk'),
  title: 'Ceylon Iron Club | Premium Fitness & Coaching Sri Lanka',
  description: 'Premium strength and athletic training gym in Sri Lanka. Expert coaching, localized meal plans, and modern equipment in a highly polished Sophisticated Dark aesthetic.',
  keywords: [
    'gym Sri Lanka',
    'fitness club Sri Lanka',
    'strength training Sri Lanka',
    'Ceylon Iron Club',
    'bodybuilding Sri Lanka',
    'personal trainer Sri Lanka',
    'elite gym Colombo',
  ],
  openGraph: {
    title: 'Ceylon Iron Club | Premium Fitness & Coaching Sri Lanka',
    description: 'Premium strength and athletic training gym in Sri Lanka. Expert coaching, localized meal plans, and modern equipment.',
    type: 'website',
    locale: 'en_LK',
    siteName: 'Ceylon Iron Club',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceylon Iron Club | Premium Fitness & Coaching Sri Lanka',
    description: 'Premium strength and athletic training gym in Sri Lanka. Expert coaching, localized meal plans, and modern equipment.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      {/* Theme init script and early preconnections */}
      <head>
  {/* Preconnect to critical origins */}
  <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://ceylonironclub.netlify.app" />
  <link rel="preconnect" href="https://picsum.photos" />
  
  {/* Preload LCP image */}
  <link 
    rel="preload" 
    as="image" 
    href={process.env.NEXT_PUBLIC_LCP_IMAGE || "https://cdn.sanity.io/images/your-project/your-image.jpg"} 
    fetchPriority="high"
  />

  <style dangerouslySetInnerHTML={{
  __html: `
    /* Critical above-the-fold styles */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: normal;
      font-style: italic;
    }
    .hero-accent {
      color: var(--color-brand-primary);
    }
    /* Prevent layout shift */
    img, video, iframe {
      max-width: 100%;
      height: auto;
    }
  `
}} />

  <link
  rel="preload"
  href="/_next/static/media/inter-latin.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
  
  {/* Theme script */}
  <script
    dangerouslySetInnerHTML={{
      __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
    }}
  />
</head>
      <body className="bg-brand-dark text-brand-cream font-sans antialiased selection:bg-brand-primary/20 selection:text-brand-primary border-brand-border" suppressHydrationWarning>
        <GymProvider>
          {children}
        </GymProvider>
      </body>
    </html>
  );
}
