/**
 * Butterfly Decoration Configuration
 * ==================================
 * The positioning and animation properties for all butterfly decorations.
 * Butterflies are arranged in two distinct trails (left and right) to kinda like create visual interest and maybe guide
 * the user's eye through the page content.
 * 
 * Design Pattern:
 * - Left trail: 8 butterflies along the left side of the page
 * - Right trail: 8 butterflies along the right side of the page
 */

import type { ButterflyDecor } from "../types/types";

// Re-export the type for convenience
export type { ButterflyDecor };

/**
 * Left Butterfly Trail Configuration
 * ==================================
 * Defines 8 butterflies positioned along the left side of the home page.
 */
export const leftButterflies: ButterflyDecor[] = [
  // Butterfly 1: Top of left trail, no delay
  { className: "butterfly-left-1", delay: 0, xValues: [0, 35, 15, -25, -45, -15, 30, 0] },
  // Butterfly 2: 0.5s delay for staggered effect
  { className: "butterfly-left-2", delay: 0.5, xValues: [0, 40, 20, -30, -50, -20, 35, 0] },
  // Butterfly 3: 1s delay
  { className: "butterfly-left-3", delay: 1, xValues: [0, 30, 10, -20, -40, -10, 25, 0] },
  // Butterfly 4: 1.5s delay
  { className: "butterfly-left-4", delay: 1.5, xValues: [0, 45, 25, -35, -55, -25, 40, 0] },
  // Butterfly 5: 2s delay
  { className: "butterfly-left-5", delay: 2, xValues: [0, 38, 18, -28, -48, -18, 33, 0] },
  // Butterfly 6: 2.5s delay
  { className: "butterfly-left-6", delay: 2.5, xValues: [0, 42, 22, -32, -52, -22, 37, 0] },
  // Butterfly 7: 3s delay
  { className: "butterfly-left-7", delay: 3, xValues: [0, 36, 16, -26, -46, -16, 31, 0] },
  // Butterfly 8: Bottom of trail, 3.5s delay
  { className: "butterfly-left-8", delay: 3.5, xValues: [0, 50, 30, -40, -60, -30, 45, 0] }
];

/**
 * Right Butterfly Trail Configuration
 * ===================================
 * Defines 8 butterflies positioned along the right side of the home page.
 */
export const rightButterflies: ButterflyDecor[] = [
  // Right butterfly 1: 0.7s delay
  { className: "butterfly-right-1", delay: 0.7, xValues: [0, -35, -15, 25, 45, 15, -30, 0] },
  // Right butterfly 2: 1.2s delay
  { className: "butterfly-right-2", delay: 1.2, xValues: [0, -40, -20, 30, 50, 20, -35, 0] },
  // Right butterfly 3: 1.7s delay
  { className: "butterfly-right-3", delay: 1.7, xValues: [0, -30, -10, 20, 40, 10, -25, 0] },
  // Right butterfly 4: 0.3s delay
  { className: "butterfly-right-4", delay: 0.3, xValues: [0, -45, -25, 35, 55, 25, -40, 0] },
  // Right butterfly 5: 0.8s delay
  { className: "butterfly-right-5", delay: 0.8, xValues: [0, -38, -18, 28, 48, 18, -33, 0] },
  // Right butterfly 6: 1.3s delay
  { className: "butterfly-right-6", delay: 1.3, xValues: [0, -42, -22, 32, 52, 22, -37, 0] },
  // Right butterfly 7: 1.8s delay
  { className: "butterfly-right-7", delay: 1.8, xValues: [0, -36, -16, 26, 46, 16, -31, 0] },
  // Right butterfly 8: Bottom of trail, 2.3s delay
  { className: "butterfly-right-8", delay: 2.3, xValues: [0, -50, -30, 40, 60, 30, -45, 0] }
];

/**
 * Vertical Movement Pattern
 * =========================
 * Shared Y-axis keyframes for all butterflies.
 * Creates a gentle up-and-down flying pattern.
 * Range: 0 to -25 (upward motion)
 * Pattern: Wave-like motion with 8 keyframes
 */
export const butterflyYValues = [0, -15, -25, -20, -10, -18, -8, 0];

/**
 * Horizontal Scale Pattern (Wing Flapping)
 * ========================================
 * Shared X-axis scale animation keyframes for all butterflies.
 * Creates a wing-flapping effect by horizontally stretching and compressing the butterfly.
 * Range: 0.85 to 1.15 (85% to 115% of original width)
 * Effect: Mimics natural butterfly wing flapping movement
 */
export const butterflyScaleX = [1, 0.85, 1.15, 0.9, 1.1, 0.88, 1.08, 1];

/**
 * Rotation Pattern
 * ================
 * Shared rotation keyframes for all butterflies.
 * Adds subtle tilting to butterflies as they fly, adds more realism.
 * Range: -3 to +3 degrees
 * Effect: Natural body tilting during flight
 */
export const butterflyRotate = [0, -3, 2, -2, 3, -1, 2, 0];
// Keyframes: Start -> tilt left -> tilt right -> tilt left -> tilt right -> slight left -> slight right -> return to center