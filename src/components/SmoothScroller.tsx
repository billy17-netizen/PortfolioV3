'use client';

import { useEffect } from 'react';
import { initSmoothScroll } from '../utils/smoothScroll';

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = initSmoothScroll();
    
    // Clean up function
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
} 