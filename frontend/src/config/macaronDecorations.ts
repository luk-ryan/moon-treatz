/**
 * Macaron Decoration Configuration
 * ================================
 * Configuration for floating macaron decorations in the flavours page.
 */

import type { MacaronDecor } from "../types/types";

// Re-export the type (vs-code error workaround)
export type { MacaronDecor };

/**
 * Macaron Decorations Array
 * =========================
 * Contains all macaron decoration configurations for the application.
 * Each macaron uses a different flavor image, animation parameters, and timing for visual variety.
 * 
 * Organization:
 * - Top right stack (3 macarons): Red Velvet, Cookies & Cream, Salted Caramel
 * - Bottom left stack (3 macarons): Vanilla, Matcha, Chocolate
 * - Singles (8 macarons): Scattered across right, left, and bottom areas
 */
export const macaronDecorations: MacaronDecor[] = [
  // Top right stack
  {
    src: "/flavours/transparent/red_velvet_transparent.png",
    className: "macaron-decor macaron-top-right-1",
    animate: { y: [-20, 5, -20], x: [0, -8, 0], rotate: [10, 14, 18, 14, 10], scale: [1, 1.02, 1] },
    transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
  },
  {
    src: "/flavours/transparent/cookies_and_cream_transparent.png",
    className: "macaron-decor macaron-top-right-2",
    animate: { y: [-20, 5, -20], x: [0, 10, 0], rotate: [-10, -6, -2, -6, -10], scale: [1, 1.03, 1] },
    transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
  },
  {
    src: "/flavours/transparent/salted_caramel_transparent.png",
    className: "macaron-decor macaron-top-right-3",
    animate: { y: [-20, 5, -20], x: [0, -5, 0], rotate: [3, 7, 11, 7, 3], scale: [1, 1.02, 1] },
    transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
  },
  // Bottom left stack
  {
    src: "/flavours/transparent/vanilla_transparent.png",
    className: "macaron-decor macaron-bottom-left-stack-1",
    animate: { y: [-20, 5, -20], x: [0, 12, 0], rotate: [23, 27, 31, 27, 23], scale: [1, 1.03, 1] },
    transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
  },
  {
    src: "/flavours/transparent/matcha_transparent.png",
    className: "macaron-decor macaron-bottom-left-stack-2",
    animate: { y: [-20, 5, -20], x: [0, -10, 0], rotate: [-20, -16, -12, -16, -20], scale: [1, 1.02, 1] },
    transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
  },
  {
    src: "/flavours/transparent/chocolate_transparent.png",
    className: "macaron-decor macaron-bottom-left-stack-3",
    animate: { y: [-20, 5, -20], x: [0, 8, 0], rotate: [10, 14, 18, 14, 10], scale: [1, 1.03, 1] },
    transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
  },
  // Singles
  {
    src: "/flavours/transparent/salted_caramel_transparent.png",
    className: "macaron-decor macaron-right-single-1",
    animate: { y: [-12, 0, -12], x: [0, 0, 0], rotate: [18, 20, 22, 20, 18], scale: [1, 1, 1] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
  },
  {
    src: "/flavours/transparent/vanilla_transparent.png",
    className: "macaron-decor macaron-right-single-2",
    animate: { y: [-15, 3, -15], x: [0, -10, 0], rotate: [-8, -4, 0, -4, -8], scale: [1, 1.04, 1] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
  },
  {
    src: "/flavours/transparent/chocolate_transparent.png",
    className: "macaron-decor macaron-right-single-3",
    animate: { y: [-15, 3, -15], x: [0, 8, 0], rotate: [12, 16, 20, 16, 12], scale: [1, 1.05, 1] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
  },
    {
    src: "/flavours/transparent/cookies_and_cream_transparent.png",
    className: "macaron-decor macaron-right-single-4",
    animate: { y: [-14, 3, -14], x: [0, -12, 0], rotate: [8, 12, 16, 12, 8], scale: [1, 1.04, 1] },
    transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
  },
  {
    src: "/flavours/transparent/vanilla_transparent.png",
    className: "macaron-decor macaron-left-single-1",
    animate: { y: [-12, 2, -12], x: [0, 15, 0], rotate: [-8, -4, 0, -4, -8], scale: [1, 1.04, 1] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
  },
  {
    src: "/flavours/transparent/red_velvet_transparent.png",
    className: "macaron-decor macaron-left-single-2",
    animate: { y: [-12, 2, -12], x: [0, 15, 0], rotate: [5, 9, 13, 9, 5], scale: [1, 1.05, 1] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
  },
  {
    src: "/flavours/transparent/chocolate_transparent.png",
    className: "macaron-decor macaron-left-single-3",
    animate: { y: [-12, 2, -12], x: [0, 12, 0], rotate: [10, 14, 18, 14, 10], scale: [1, 1.05, 1] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.0 }
  },
  {
    src: "/flavours/transparent/matcha_transparent.png",
    className: "macaron-decor macaron-left-single-4",
    animate: { y: [-12, 2, -12], x: [0, 12, 0], rotate: [-15, -11, -7, -11, -15], scale: [1, 1.04, 1] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
  },

];
