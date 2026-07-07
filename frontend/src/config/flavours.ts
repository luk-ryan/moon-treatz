/**
 * Flavours Configuration
 * ======================
 * The single source for all macaron flavour data in the application.
 */

import type { FlavourCardProps } from "../types/types";

/**
 * Full flavour catalogue
 * ======================
 * Each entry powers one FlavourCard on the Flavours page.
 * To make a flavour unavailable, comment it out — do NOT delete it.
 */
export const flavours: FlavourCardProps[] = [
  {
    id: 1,
    name: "Vanilla",
    src: "/flavours/vanilla.jpg",
    description: "Blue macaron shells filled with a smooth vanilla French buttercream.",
  },
  {
    id: 2,
    name: "Chocolate",
    src: "/flavours/chocolate.jpg",
    description: "Chocolate-flavoured shells filled with a rich, dark chocolate ganache.",
  },
  {
    id: 3,
    name: "Matcha",
    src: "/flavours/matcha.jpg",
    description: "Matcha-flavoured shells filled with a white chocolate, matcha buttercream.",
  },
  {
    id: 4,
    name: "Cookies and Cream",
    src: "/flavours/cookies_and_cream.jpg",
    description: "Oreo-inspired macaron shells filled with creamy Oreo buttercream and Oreo pieces.",
  },
  {
    id: 5,
    name: "Salted Caramel",
    src: "/flavours/salted_caramel.jpg",
    description: "Classic macaron shells filled with salted caramel buttercream filling and a caramel centre.",
  },
  {
    id: 6,
    name: "Red Velvet",
    src: "/flavours/red_velvet.jpg",
    description: "Light chocolate shells with a red tint filled with tangy-sweet cream cheese buttercream filling.",
  },
  // {
  //   id: 7,
  //   name: "Coffee",
  //   src: "/flavours/unavailable.jpg",
  //   description: "Coffee Flavour description",
  // },
  // {
  //   id: 8,
  //   name: "Strawberry",
  //   src: "/flavours/unavailable.jpg",
  //   description: "Strawberry Flavour description",
  // },
  // {
  //   id: 9,
  //   name: "Lemon",
  //   src: "/flavours/unavailable.jpg",
  //   description: "Lemon Flavour description",
  // },
];

/**
 * All flavours available for catering orders
 * -------------------------------------------
 * Flat name list used to populate the flavour checkbox pickers in the pre-order form.
 */
export const ALL_FLAVOURS: string[] = [
  "Vanilla",
  "Chocolate",
  "Matcha",
  "Cookies and Cream",
  "Salted Caramel",
  "Red Velvet",
  "Pistachio",
  "Coffee",
  "Lemon",
  "Strawberry",
];
