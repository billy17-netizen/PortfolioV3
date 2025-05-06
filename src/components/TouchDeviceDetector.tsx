'use client';

import { useEffect } from 'react';

// This client component adds a 'touch-device' class to the HTML element
// when a touch device is detected, allowing for CSS targeting
const TouchDeviceDetector = () => {
  useEffect(() => {
    const checkTouchDevice = () => {
      const isTouchDevice = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0;
      
      if (isTouchDevice) {
        document.documentElement.classList.add('touch-device');
      } else {
        document.documentElement.classList.remove('touch-device');
      }
    };

    // Check on initial mount
    checkTouchDevice();

    // Also check on orientation change which may happen on tablets/phones
    window.addEventListener('orientationchange', checkTouchDevice);
    window.addEventListener('resize', checkTouchDevice);

    return () => {
      window.removeEventListener('orientationchange', checkTouchDevice);
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default TouchDeviceDetector; 