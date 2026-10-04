/**
 * Pre-Order Form Configuration
 * ============================
 * Controls when the pre-order form is open.
 *
 * HOW IT WORKS
 * ------------
 * 1. Set `preOrderCloseDate` to the date orders should stop being accepted.
 *    The form is available any time before 9:00am on that date.
 * 2. Once 9:00am on that date passes, the form automatically closes.
 * 3. `preOrderClosed` / `preOrderForceOpen` are manual overrides — not needed
 *    for normal weekly use, but still there in case you need to force open/closed.
 */

/**
 * Pre-Order Close Date
 * =====================
 * The order window closes at 9:00am on this date. Also used for the countdown timer.
 * Format: "YYYY-MM-DD"
 */
export const preOrderCloseDate: string = "2026-09-11";

/**
 * Manual Close Override
 * =====================
 * Set to true to close the form immediately regardless of the close date.
 */
export const preOrderClosed: boolean = false;

/**
 * Force Open Override
 * ===================
 * Set to true to force the weekly box form open regardless of the close date.
 * Useful when taking orders early without changing the close date.
 */
export const preOrderForceOpen: boolean = false;

/**
 * Next Week's Flavours
 * ====================
 * Overrides the flavours shown on the weekly box card in the pre-order form.
 * Set these to next week's actual flavours without touching the gallery config.
 * Leave as an empty array [] to fall back to the latest weekly special entry.
 */
export const nextWeekFlavours: string[] = [
  "Earl Grey",
  "Salted Caramel",
  "Cookies & Cream",
];
// Example: export const nextWeekFlavours: string[] = ["Pistachio", "Lemon", "Biscoff"];

/**
 * The exact moment the order window closes: 9:00am on preOrderCloseDate.
 */
const getCloseCutoff = (): Date => {
  const cutoff = new Date(preOrderCloseDate);
  cutoff.setHours(9, 0, 0, 0);
  return cutoff;
};

/**
 * Returns time remaining until the 9:00am close cutoff as { days, hours, minutes, seconds, total }.
 * `total` is milliseconds remaining (0 once the cutoff has passed / form is closed).
 */
export const getTimeUntilNextRelease = () => {
  const total = Math.max(0, getCloseCutoff().getTime() - Date.now());
  const s = Math.floor(total / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    total,
  };
};

/**
 * Returns true when the pre-order form should be accessible:
 * - not manually closed, AND
 * - it's still before 9:00am on preOrderCloseDate
 */
export const isPreOrderFormAvailable = (): boolean => {
  if (preOrderClosed) return false;
  return Date.now() < getCloseCutoff().getTime();
};

/**
 * Catering Blocked Dates
 * ======================
 * Dates that are NOT available for catering orders.
 * Format: "YYYY-MM-DD"
 * Past dates are automatically disabled — only add future unavailable dates here.
 * Prob won't be used for a bit.
 */
export const cateringBlockedDates: string[] = [
  // e.g. "2026-04-18",
];
