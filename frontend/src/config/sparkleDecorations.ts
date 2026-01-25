/**
 * Sparkle Decoration Configuration
 * =================================
 * Configuration for sparkle decorations displayed across all pages.
 */

import type { SparkleDecor } from "../types/types";

// Re-export the type (vs-code error workaround)
export type { SparkleDecor };

/**
 * Sparkle Decorations Array
 * =========================
 * Contains all sparkle decoration configurations organized by position.
 * Total: 31 sparkles across the page.
 * 
 * Organization:
 * - Left side: 11 sparkles
 * - Right side: 12 sparkles
 * - Center top: 4 sparkles
 * - Bottom: 4 sparkles
 */
export const sparkleDecorations: SparkleDecor[] = [
  // Left side sparkles (11 total)
  { className: "sparkle sparkle-left-1", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 } },
  { className: "sparkle sparkle-left-2", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 } },
  { className: "sparkle sparkle-left-3", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 } },
  { className: "sparkle sparkle-left-4", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.1 } },
  { className: "sparkle sparkle-left-5", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.4 } },
  { className: "sparkle sparkle-left-6", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.7 } },
  { className: "sparkle sparkle-left-7", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 } },
  { className: "sparkle sparkle-left-8", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.3 } },
  { className: "sparkle sparkle-left-9", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.6 } },
  { className: "sparkle sparkle-left-10", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.9 } },
  { className: "sparkle sparkle-left-11", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 } },
  
  // Right side sparkles (12 total)
  { className: "sparkle sparkle-right-1", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 } },
  { className: "sparkle sparkle-right-2", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 } },
  { className: "sparkle sparkle-right-3", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 } },
  { className: "sparkle sparkle-right-4", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.3 } },
  { className: "sparkle sparkle-right-5", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.6 } },
  { className: "sparkle sparkle-right-6", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.9 } },
  { className: "sparkle sparkle-right-7", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.2 } },
  { className: "sparkle sparkle-right-8", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.5 } },
  { className: "sparkle sparkle-right-9", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.8 } },
  { className: "sparkle sparkle-right-10", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.1 } },
  { className: "sparkle sparkle-right-11", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 } },
  { className: "sparkle sparkle-right-12", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 } },
  
  // Center top sparkles (4 total)
  { className: "sparkle sparkle-center-1", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 } },
  { className: "sparkle sparkle-center-2", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } },
  { className: "sparkle sparkle-center-3", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.8 } },
  { className: "sparkle sparkle-center-4", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.1 } },
  
  // Bottom scattered sparkles (4 total)
  { className: "sparkle sparkle-bottom-1", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.4 } },
  { className: "sparkle sparkle-bottom-2", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.7 } },
  { className: "sparkle sparkle-bottom-3", character: "✦", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.15 } },
  { className: "sparkle sparkle-bottom-4", character: "✧", animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.45 } }
];
