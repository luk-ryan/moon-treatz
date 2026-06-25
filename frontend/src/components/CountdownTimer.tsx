/**
 * CountdownTimer Component
 * ========================
 * Displays a live countdown to the next pre-order release date.
 * Renders nothing when the release date has already passed.
 *
 * On mobile: shows a simple "X Days" display.
 * On desktop: shows a ticking DD:HH:MM:SS segment display inside the button.
 *
 * The `nextReleaseDate` in preOrderForm config should be updated manually each week to the upcoming release date.
 */

import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { getTimeUntilNextRelease } from "../config/preOrderForm";

// Zero-pads a number to 2 digits: 9 → "09", 42 → "42"
const pad = (n: number) => String(n).padStart(2, "0");

const CountdownTimer = () => {
  // Initialise state immediately with current time-until-release (avoids a blank frame on mount)
  const [time, setTime] = useState(getTimeUntilNextRelease);
  const isMobile = useIsMobile();

  // Tick every second; clear the interval on unmount to prevent memory leaks
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilNextRelease()), 1000);
    return () => clearInterval(id);
  }, []);

  // Hide the timer entirely once the release date has passed
  if (time.total <= 0) return null;

  // Mobile: compact single-line "X Days" display
  if (isMobile) {
    return (
      <span className="countdown-days-mobile">
        {time.days} {time.days === 1 ? "Day" : "Days"}
      </span>
    );
  }

  // Desktop: full DD:HH:MM:SS segment display
  return (
    <span className="countdown-segments">
      <span className="countdown-seg">
        <span className="countdown-val">{pad(time.days)}</span>
        <span className="countdown-lbl">DAYS</span>
      </span>
      <span className="countdown-colon">:</span>
      <span className="countdown-seg">
        <span className="countdown-val">{pad(time.hours)}</span>
        <span className="countdown-lbl">HRS</span>
      </span>
      <span className="countdown-colon">:</span>
      <span className="countdown-seg">
        <span className="countdown-val">{pad(time.minutes)}</span>
        <span className="countdown-lbl">MIN</span>
      </span>
      <span className="countdown-colon">:</span>
      <span className="countdown-seg">
        <span className="countdown-val">{pad(time.seconds)}</span>
        <span className="countdown-lbl">SEC</span>
      </span>
    </span>
  );
};

export default CountdownTimer;
