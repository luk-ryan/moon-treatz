/**
 * scheduleFormat.ts
 * =================
 * Shared helpers for converting internal pickupDate values into human-readable { label, time } pairs.
 */

import { preOrderOpenDate } from "../config/preOrderForm";

// Returns Thu/Fri/Sat of the week containing preOrderOpenDate.
// Only advances to the following week if Saturday of that week has already passed today.
function getPickupWeekDates() {
  const anchor = new Date(preOrderOpenDate + "T00:00:00");
  const today  = new Date(); today.setHours(0, 0, 0, 0);

  const daysToThu = ((4 - anchor.getDay() + 3) % 7) - 3;
  const thu = new Date(anchor);
  thu.setDate(anchor.getDate() + daysToThu);
  const sat = new Date(thu); sat.setDate(thu.getDate() + 2);

  if (sat < today) thu.setDate(thu.getDate() + 7);

  const fri = new Date(thu);
  fri.setDate(thu.getDate() + 1);
  const satFinal = new Date(thu);
  satFinal.setDate(thu.getDate() + 2);
  return { thu, fri, sat: satFinal };
}

// e.g. → "Thursday, July 10, 2025"
const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// Maps every weekly slot to its day key and display time label.
const WEEKLY_SLOT_LABELS: Record<string, { day: "thu" | "fri" | "sat"; time: string }> = {
  "thursday-morning":   { day: "thu", time: "Morning" },
  "thursday-afternoon": { day: "thu", time: "Afternoon" },
  "thursday-evening":   { day: "thu", time: "Evening" },
  "friday-morning":     { day: "fri", time: "Morning" },
  "friday-afternoon":   { day: "fri", time: "Afternoon" },
  "friday-evening":     { day: "fri", time: "Evening" },
  "saturday-morning":   { day: "sat", time: "Morning" },
  "saturday-afternoon": { day: "sat", time: "Afternoon" },
  "saturday-evening":   { day: "sat", time: "Evening" },
};

/**
 * Parse a pickupDate into a { label, time } pair.
 */
export function parsePickupDate(pickupDate: string): { label: string; time: string } | null {
  const { thu, fri, sat } = getPickupWeekDates();
  const dayMap = { thu, fri, sat };

  // NKS format: "nks-thursday-430-500pm" / "nks-friday-740-810pm"
  const nksMatch = pickupDate.match(/^nks-(thursday|friday)-(.+)$/);
  if (nksMatch) {
    const dateObj = nksMatch[1] === "thursday" ? thu : fri;
    // "430-500pm" → groups: ["4","30","5","00","pm"] → "4:30 – 5:00 pm"
    // Falls back to the raw string if the format doesn't match.
    const timeMatch = nksMatch[2].match(/^(\d{1,2})(\d{2})-(\d{1,2})(\d{2})(am|pm)$/);
    const timeStr = timeMatch
      ? `${timeMatch[1]}:${timeMatch[2]} \u2013 ${timeMatch[3]}:${timeMatch[4]} ${timeMatch[5]}`
      : nksMatch[2];
    return { label: fmtDate(dateObj), time: `${timeStr} (NKS)` };
  }

  // Regular weekly slot
  const slot = WEEKLY_SLOT_LABELS[pickupDate];
  if (slot) {
    return { label: fmtDate(dayMap[slot.day]), time: slot.time };
  }

  return null;
}
