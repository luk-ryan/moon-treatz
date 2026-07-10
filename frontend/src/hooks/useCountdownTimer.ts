/**
 * useCountdownTimer Hook
 * ======================
 * Tracks the time remaining until the next pre-order release date and ticks every second.
 */

import { useState, useEffect } from "react";
import { getTimeUntilNextRelease } from "../config/preOrderForm";

export const useCountdownTimer = () => {
  // Initialise with the current value immediately so there's no blank frame on mount
  const [time, setTime] = useState(getTimeUntilNextRelease);

  useEffect(() => {
    // Tick once per second; cancel on unmount
    const id = setInterval(() => setTime(getTimeUntilNextRelease()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
};
