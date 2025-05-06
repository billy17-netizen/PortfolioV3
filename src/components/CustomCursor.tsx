'use client';

import { useEffect, useState } from 'react';
import RainbowCursor from './RainbowCursor';

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Only render on client-side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Check if device is mobile or touch-only
    const checkIsMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0;
      
      const isMobileViewport = window.innerWidth <= 768;
      
      setIsMobile(isTouchDevice || isMobileViewport);
    };
    
    // Check on mount
    checkIsMobile();
    
    // Check on resize
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  // Don't render on mobile or when not mounted
  if (!mounted || isMobile) return null;
  
  // Vibrant rainbow colors for smooth gradient
  const rainbowColors = [
    '#FF0000', // Red
    '#FF4500', // OrangeRed
    '#FFA500', // Orange
    '#FFD700', // Gold
    '#FFFF00', // Yellow
    '#7FFF00', // Chartreuse
    '#00FF00', // Lime
    '#00FA9A', // MediumSpringGreen
    '#00FFFF', // Cyan
    '#1E90FF', // DodgerBlue
    '#0000FF', // Blue
    '#8A2BE2', // BlueViolet
    '#FF00FF', // Magenta
  ];
  
  return (
    <RainbowCursor 
      colors={rainbowColors}
      length={40}         // Increased from 8 to make the trail much longer
      size={1}           // Reduced from 1.5
      trailSpeed={0.5}   // Increased for tighter following
      colorCycleSpeed={0.002}
      blur={0.2}         // Reduced from 0.3
      pulseSpeed={0.01}  
      pulseMin={0.9}     // Increased from 0.8
      pulseMax={1.1}     
    />
  );
};

export default CustomCursor; 