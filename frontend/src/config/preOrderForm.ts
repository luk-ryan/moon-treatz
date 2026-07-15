/**
 * Pre-Order Form Configuration
 * ============================
 * Controls when the pre-order form is open.
 *
 * HOW IT WORKS
 * ------------
 * 1. Set `preOrderOpenDate` to the date the form should automatically open.
 *    A countdown timer will show on the site until that date arrives.
 * 2. Once the date passes the form opens automatically and stays open.
 * 3. To manually close the form at any time, set `preOrderClosed` to true.
 * 4. To re-open, set `preOrderClosed` back to false (and update `preOrderOpenDate`
 *    to the next opening date if you want a new countdown).
 */

/**
 * Pre-Order Open Date
 * ===================
 * The date the form automatically opens. Used for the countdown timer.
 * Format: "YYYY-MM-DD"
 */
export const preOrderOpenDate: string = "2026-07-07";

/**
 * Manual Close Override
 * =====================
 * Set to true to close the form immediately regardless of the open date.
 */
export const preOrderClosed: boolean = false;

/**
 * Returns time remaining until preOrderOpenDate as { days, hours, minutes, seconds, total }.
 * `total` is milliseconds remaining (0 when the date has passed / form is open).
 */
export const getTimeUntilNextRelease = () => {
  const release = new Date(preOrderOpenDate);
  release.setHours(0, 0, 0, 0);
  const total = Math.max(0, release.getTime() - Date.now());
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
 * - the open date has been reached
 */
export const isPreOrderFormAvailable = (): boolean => {
  if (preOrderClosed) return false;
  return Date.now() >= new Date(preOrderOpenDate).getTime();
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
