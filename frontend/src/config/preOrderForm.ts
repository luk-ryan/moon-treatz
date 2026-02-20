/**
 * Pre-Order Form Configuration
 * ============================
 * Stores the current pre-order form link and manages availability based on schedule.
 *
 * Pre-order forms are automatically available:
 * - Opens: Friday
 * - Closes: Sunday at 11:59 PM
 *
 * To update the form link:
 * 1. Update the `preOrderFormLink` with the new Google Form URL
 * 2. The button will automatically show/hide based on the current day/time
 *
 * To manually disable (override schedule):
 * 1. Set `preOrderFormLink` to an empty string ""
 * 2. The button will be disabled regardless of the schedule
 */

/**
 * Current Pre-Order Form Link
 * ===========================
 */
export const preOrderFormLink: string = "https://forms.gle/uKmMGiT498rhAY9B9";

/**
 * Force Enable Override
 * =====================
 * For Debugging purposes, set to true to always enable the pre-order form button.
 */
const forceEnable: boolean = true;

/**
 * Check if current time is within pre-order window
 * =================================================
 * Pre-order window: Friday 6:00 PM - Sunday 11:59 PM
 */
const isWithinPreOrderWindow = (): boolean => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday

  // All day Friday
  if (dayOfWeek === 5) {
    return true;
  }

  // All day Saturday
  if (dayOfWeek === 6) {
    return true;
  }

  // All day Sunday
  if (dayOfWeek === 0) {
    return true;
  }

  return false;
};

/**
 * Helper function to check if pre-order form is available
 * ========================================================
 * Form is available when:
 * - forceEnable is true (always enabled for debugging, OR
 * - (A form link is provided AND current time is within Friday 6PM - Sunday 11:59PM)
 */
export const isPreOrderFormAvailable = (): boolean => {
  return (
    forceEnable ||
    (preOrderFormLink.trim().length > 0 && isWithinPreOrderWindow())
  );
};
