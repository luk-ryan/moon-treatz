/**
 * Animation Configuration Module
 * ==============================
 * Animation Types:
 * - Page transitions: Smooth fade effects when navigating between routes
 * - View mode transitions: Animations for switching between different views within a page
 * - Macaron floating: Floating motion for macaron decorations
 * - Butterfly motion: Flight patterns for butterfly decorations
 */

/**
 * Page Transition Animation
 * =========================
 * A smooth fade-in/fade-out effect when navigating between pages.
 */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1 }
};

/**
 * View Mode Transition Animation
 * ==============================
 * A fade slide-in effect when switching between different view modes within a page (e.g., Weekly vs All Flavours views).
 */
export const viewModeTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: 0.4 }
};

/**
 * Macaron Floating Animation Preset
 * =================================
 * Defines the movement pattern for floating macaron decorations.
 */
export const macaronFloat = {
  y: [-15, 3, -15],
  x: [0, -10, 0],
  rotate: [-8, -4, 0, -4, -8],
  scale: [1, 1.04, 1]
};

/**
 * Macaron Transition Timing
 * =========================
 * Timing configuration for macaron floating animations, basically used to prevent synchronized floating.
 */
export const macaronTransition = (delay: number = 0) => ({
  duration: 5,
  repeat: Infinity,
  ease: "easeInOut",
  delay
});

/**
 * Butterfly Floating Animation
 * ============================
 * Flight patterns for butterfly decorations.
 * Creates realistic butterfly movement with irregular patterns, and wing flapping (scaleX).
 */
export const butterflyFloat = {
  x: [0, 35, 15, -25, -45, -15, 30, 0],
  y: [0, -15, -25, -20, -10, -18, -8, 0],
  scaleX: [1, 0.85, 1.15, 0.9, 1.1, 0.88, 1.08, 1],
  rotate: [0, -3, 2, -2, 3, -1, 2, 0]
};

/**
 * Butterfly Transition Timing
 * ===========================
 * Timing configuration for butterfly flight animations, basically used to prevent synchronized flapping.
 */
export const butterflyTransition = (delay: number = 0) => ({
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut",
  delay
});

/**
 * Butterfly Entrance Animation
 * ============================
 * The initial appearance animation for butterflies when they first enter the viewport.
 * Creates a bounce entrance fade-in effect.
 * 
 * Animation sequence:
 * 1. Starts off-screen to the left (-200) and small (0.3 scale)
 * 2. Flies into position with bouncy-like motion
 * 
 * Viewport trigger:
 * - Activates when 30% of element is visible
 * - Enable animation to retrigger upon scroll (once: false)
 */
export const butterflyEntrance = {
  initial: { opacity: 0, x: -200, scale: 0.3 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: {
    opacity: { duration: 0.6 },
    x: { duration: 0.8, type: "spring", bounce: 0.6 },
    scale: { duration: 0.8, type: "spring", bounce: 0.5 }
  }
};
