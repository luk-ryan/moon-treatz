/**
 * scheduleFormat.ts
 * =================
 * Shared helpers for converting internal pickupDate values into human-readable { label, time } pairs.
 * Used by both the review modal (JSX) and the email builder (plain strings) so the logic only lives in one place.
 */

function getPickupWeekDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilThu = (4 - today.getDay() + 7) % 7 || 7;
  const thu = new Date(today);
  thu.setDate(today.getDate() + daysUntilThu);
  const fri = new Date(thu);
  fri.setDate(thu.getDate() + 1);
  const sat = new Date(thu);
  sat.setDate(thu.getDate() + 2);
  return { thu, fri, sat };
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
 * Parse a weekly pickupDate slug into a human-readable { label, time } pair.
 * Returns null if the slug is unrecognised.
 *
 * Handles regular weekly slots ("thursday-afternoon") and
 * NKS slots ("nks-friday-430-500pm").
 */
export function parsePickupDate(pickupDate: string): { label: string; time: string } | null {
  const { thu, fri, sat } = getPickupWeekDates();
  const dayMap = { thu, fri, sat };

  // NKS format: "nks-thursday-430-500pm" or "nks-friday-740-810pm"
  const nksMatch = pickupDate.match(/^nks-(thursday|friday)-(.+)$/);
  if (nksMatch) {
    const dateObj = nksMatch[1] === "thursday" ? thu : fri;
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
