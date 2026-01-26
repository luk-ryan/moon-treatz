/**
 * useIsMobile Hook
 * ================
 * Detects if the current viewport width is mobile size (600px or below).
 * Updates on window resize.
 */

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 600;

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
