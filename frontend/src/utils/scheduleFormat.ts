/**
 * scheduleFormat.ts
 * =================
 * Shared helpers for converting internal pickupDate values into human-readable { label, time } pairs.
 */

import { preOrderCloseDate } from "../config/preOrderForm";

// Returns Fri/Sat/Sun of the week containing preOrderCloseDate.
function getPickupWeekDates() {
  const anchor = new Date(preOrderCloseDate + "T00:00:00");

  // Sunday that starts the anchor's own week.
  const sunday = new Date(anchor);
  sunday.setDate(anchor.getDate() - anchor.getDay());

  // Friday/Sat/Sun of that same week — no rolling forward if they've already passed.
  const fri = new Date(sunday); fri.setDate(sunday.getDate() + 5);
  const sat = new Date(fri);    sat.setDate(fri.getDate() + 1);
  const sun = new Date(fri);    sun.setDate(fri.getDate() + 2);

  return { fri, sat, sun };
}

// e.g. → "Friday, July 10, 2025"
const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// Maps every weekly slot to its day key and display time label.
const WEEKLY_SLOT_LABELS: Record<string, { day: "fri" | "sat" | "sun"; time: string }> = {
  "friday-morning":     { day: "fri", time: "Morning" },
  "friday-afternoon":   { day: "fri", time: "Afternoon" },
  "friday-evening":     { day: "fri", time: "Evening" },
  "saturday-morning":   { day: "sat", time: "Morning" },
  "saturday-afternoon": { day: "sat", time: "Afternoon" },
  "saturday-evening":   { day: "sat", time: "Evening" },
  "sunday-morning":     { day: "sun", time: "Morning" },
  "sunday-afternoon":   { day: "sun", time: "Afternoon" },
  "sunday-evening":     { day: "sun", time: "Evening" },
};

/**
 * Parse a pickupDate into a { label, time } pair.
 */
export function parsePickupDate(pickupDate: string): { label: string; time: string } | null {
  const { fri, sat, sun } = getPickupWeekDates();
  const dayMap = { fri, sat, sun };

  // NKS format: "nks-friday-430-500pm" — Friday is the only weekly NKS day.
  const nksMatch = pickupDate.match(/^nks-friday-(.+)$/);
  if (nksMatch) {
    // "430-500pm" → groups: ["4","30","5","00","pm"] → "4:30 – 5:00 pm"
    // Falls back to the raw string if the format doesn't match.
    const timeMatch = nksMatch[1].match(/^(\d{1,2})(\d{2})-(\d{1,2})(\d{2})(am|pm)$/);
    const timeStr = timeMatch
      ? `${timeMatch[1]}:${timeMatch[2]} \u2013 ${timeMatch[3]}:${timeMatch[4]} ${timeMatch[5]}`
      : nksMatch[1];
    return { label: fmtDate(fri), time: `${timeStr} (NKS)` };
  }

  // Regular weekly slot
  const slot = WEEKLY_SLOT_LABELS[pickupDate];
  if (slot) {
    return { label: fmtDate(dayMap[slot.day]), time: slot.time };
  }

  return null;
}
