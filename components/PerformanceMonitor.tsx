'use client';

import { useEffect } from 'react';

// Define custom interfaces for Web Vitals entries that are not present in standard PerformanceEntry definitions
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Check for Kaspersky extension
    const kasperskyScripts = document.querySelectorAll('script[src*="kaspersky"]');
    if (kasperskyScripts.length > 0) {
      console.warn('⚠️ Kaspersky extension detected - may affect performance');
      // You could optionally show a non-intrusive notice
    }

    // Check for other performance-heavy extensions
    const extensionScripts = document.querySelectorAll('script[src*="chrome-extension"]');
    if (extensionScripts.length > 3) {
      console.warn(`⚠️ ${extensionScripts.length} browser extensions detected - may affect performance`);
    }

    // Log Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('📊 LCP:', entry.startTime, 'ms');
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // CLS
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as LayoutShift[]) {
          if (!entry.hadRecentInput) {
            console.log('📊 CLS:', entry.value);
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });

      // FID
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as PerformanceEventTiming[]) {
          console.log('📊 FID:', entry.processingStart - entry.startTime, 'ms');
        }
      }).observe({ type: 'first-input', buffered: true });
    }
  }, []);

  return null; // This component doesn't render anything
}