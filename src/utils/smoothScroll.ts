import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Store the Lenis instance globally
let lenisInstance: Lenis | null = null;

// Initialize Lenis smooth scrolling
export const initSmoothScroll = () => {
  // Only run on client side
  if (typeof window === 'undefined') return null;
  
  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Create Lenis instance with smooth scroll settings
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Set up a RAF loop to update Lenis
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  // Start the loop
  requestAnimationFrame(raf);

  // Update ScrollTrigger when Lenis scrolls
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Helper function to normalize GSAP/Lenis scroll events
  gsap.ticker.lagSmoothing(0);
  
  // Store instance for external access
  lenisInstance = lenis;

  // Allow external access to the Lenis instance
  return lenis;
};

// Utility function to scroll to a specific element or position
export const scrollTo = (target: string | HTMLElement | number, options?: { offset?: number, duration?: number }) => {
  if (!lenisInstance) return;
  
  const { offset = 0, duration } = options || {};
  
  // If target is a string (like '#section-id')
  if (typeof target === 'string') {
    const element = document.querySelector(target);
    if (element instanceof HTMLElement) {
      lenisInstance.scrollTo(element, { offset, duration });
    }
  } 
  // If target is a DOM element
  else if (target instanceof HTMLElement) {
    lenisInstance.scrollTo(target, { offset, duration });
  } 
  // If target is a number (scroll position)
  else if (typeof target === 'number') {
    lenisInstance.scrollTo(target, { duration });
  }
}; 