/**
 * Home Decorations Configuration
 * ================================
 * Static data for the hero section's floating polaroid collage on the Home page.
 *
 * Each polaroid has:
 *   - `id`      — unique key for React + click state
 *   - `rotate`  — CSS rotation string (slight tilt for a natural, scattered look)
 *   - `top/left`— percentage-based position within the hero collage container
 *   - `dur`     — float animation duration in seconds (varied so they don't sync)
 *   - `delay`   — animation start delay in seconds (staggers the initial float-in)
 *   - `caption` — main text shown at the bottom of the polaroid
 *   - `sub`     — smaller subtitle text below the caption
 *
 * To add a new polaroid: append a new entry with a unique `id`.
 * To remove one: delete its entry — no other changes needed.
 */

export interface Polaroid {
  id: string;
  rotate: string;
  top: string;
  left: string;
  dur: number;
  delay: number;
  caption: string;
  sub: string;
}

export const POLAROIDS: Polaroid[] = [
  { id: "1",  rotate: "-14deg", top: "5%",   left: "5%",   dur: 3.8, delay: 0,    caption: "Weekly Specials",  sub: "Fresh every two weeks"      },
  { id: "2",  rotate: "11deg",  top: "2%",   left: "52%",  dur: 4.3, delay: 0.6,  caption: "Handcrafted",      sub: "Made with love in Vaughan"  },
  { id: "3",  rotate: "-7deg",  top: "35%",  left: "-2%",  dur: 3.5, delay: 1.1,  caption: "Pistachio Dream",  sub: "One of our fan favourites"  },
  { id: "4",  rotate: "15deg",  top: "32%",  left: "42%",  dur: 4.7, delay: 0.3,  caption: "Cookies & Cream",  sub: "A classic done right"       },
  { id: "5",  rotate: "-11deg", top: "28%",  left: "78%",  dur: 3.9, delay: 0.9,  caption: "Matcha Bliss",     sub: "Earthy, sweet & delicate"   },
  { id: "6",  rotate: "9deg",   top: "62%",  left: "8%",   dur: 4.1, delay: 0.5,  caption: "The Box",          sub: "7 assorted · $12"           },
  { id: "7",  rotate: "-13deg", top: "60%",  left: "50%",  dur: 4.5, delay: 1.4,  caption: "Order Today",      sub: "Forms open Fri – Sun"       },
];
