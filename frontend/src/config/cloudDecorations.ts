/**
 * Cloud Decoration Configuration
 * ===============================
 * Configuration for floating cloud decorations displayed on the home page.
 */

import type { CloudDecor } from "../types/types";

// Re-export the type (vs-code error workaround)
export type { CloudDecor };

/**
 * Cloud Decorations Array
 * =======================
 * Contains all cloud decoration configurations for the home page.
 * 
 * Organization (top to bottom):
 * - Upper clouds (4), Middle clouds (3), Lower clouds (5)
 */
export const cloudDecorations: CloudDecor[] = [
  // Upper clouds (top 20-45%)
  {
    src: "/background/cloud_1.png",
    className: "cloud-image cloud-left-1",
    animate: { 
      scaleX: [1, 1.06, 0.96, 1.07, 1],
      scaleY: [1, 0.95, 1.05, 0.94, 1],
      rotate: [0, 2.5, -2, 3, 0]
    },
    transition: { duration: 4.5, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99] }
  },
  {
    src: "/background/cloud_2.png",
    className: "cloud-image cloud-right-1",
    animate: { 
      scaleX: [1, 1.07, 0.96, 1.08, 1],
      scaleY: [1, 0.94, 1.06, 0.93, 1],
      rotate: [0, 3.5, -2.5, 4, 0]
    },
    transition: { duration: 5, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 0.5 }
  },
  {
    src: "/background/cloud_1.png",
    className: "cloud-image cloud-center-1",
    animate: { 
      scaleX: [1, 1.06, 0.96, 1.07, 1],
      scaleY: [1, 0.95, 1.06, 0.94, 1],
      rotate: [0, 2, -2.5, 2.5, 0]
    },
    transition: { duration: 4, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 0.8 }
  },
  {
    src: "/background/cloud_1.png",
    className: "cloud-image cloud-left-3",
    animate: { 
      scaleX: [1, 1.07, 0.96, 1.07, 1],
      scaleY: [1, 0.95, 1.06, 0.94, 1],
      rotate: [0, 2.5, -2.5, 3.5, 0]
    },
    transition: { duration: 4, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 0.7 }
  },
  
  // Middle clouds (top 50-60%)
  {
    src: "/background/cloud_2.png",
    className: "cloud-image cloud-right-3",
    animate: { 
      scaleX: [1, 1.08, 0.96, 1.08, 1],
      scaleY: [1, 0.94, 1.07, 0.93, 1],
      rotate: [0, 4, -2, 4.5, 0]
    },
    transition: { duration: 5.2, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 1.2 }
  },
  {
    src: "/background/cloud_3.png",
    className: "cloud-image cloud-center-2",
    animate: { 
      scaleX: [1, 0.96, 1.07, 0.95, 1],
      scaleY: [1, 1.07, 0.96, 1.08, 1],
      rotate: [0, -3.5, 2.5, -4, 0]
    },
    transition: { duration: 3.8, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 1.8 }
  },
  {
    src: "/background/cloud_3.png",
    className: "cloud-image cloud-left-4",
    animate: { 
      scaleX: [1, 0.95, 1.08, 0.94, 1],
      scaleY: [1, 1.07, 0.95, 1.08, 1],
      rotate: [0, -2.5, 2, -3.5, 0]
    },
    transition: { duration: 4.5, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 2 }
  },
  
  // Lower clouds (bottom 15-30%)
  {
    src: "/background/cloud_3.png",
    className: "cloud-image cloud-left-2",
    animate: { 
      scaleX: [1, 0.95, 1.08, 0.94, 1],
      scaleY: [1, 1.07, 0.96, 1.08, 1],
      rotate: [0, -2.5, 2, -3.5, 0]
    },
    transition: { duration: 4, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 1 }
  },
  {
    src: "/background/cloud_4.png",
    className: "cloud-image cloud-right-2",
    animate: { 
      scaleX: [1, 0.96, 1.08, 0.95, 1],
      scaleY: [1, 1.07, 0.96, 1.08, 1],
      rotate: [0, -3.5, 2.5, -4, 0]
    },
    transition: { duration: 3.8, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 1.5 }
  },
  {
    src: "/background/cloud_1.png",
    className: "cloud-image cloud-lower-left",
    animate: { 
      scaleX: [1, 1.07, 0.96, 1.08, 1],
      scaleY: [1, 0.95, 1.06, 0.94, 1],
      rotate: [0, 3.5, -2, 4, 0]
    },
    transition: { duration: 4.5, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 0.9 }
  },
  {
    src: "/background/cloud_4.png",
    className: "cloud-image cloud-lower-center",
    animate: { 
      scaleX: [1, 0.96, 1.08, 0.95, 1],
      scaleY: [1, 1.06, 0.96, 1.07, 1],
      rotate: [0, -2.5, 2.5, -3.5, 0]
    },
    transition: { duration: 5, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 0.6 }
  },
  {
    src: "/background/cloud_1.png",
    className: "cloud-image cloud-lower-right",
    animate: { 
      scaleX: [1, 0.96, 1.08, 0.95, 1],
      scaleY: [1, 1.06, 0.96, 1.07, 1],
      rotate: [0, -2.5, 2.5, -3.5, 0]
    },
    transition: { duration: 5, repeat: Infinity, ease: [0.6, 0.01, 0.4, 0.99], delay: 0.6 }
  }
];
