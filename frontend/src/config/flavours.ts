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
    name: "Chocolate",
    src: "/flavours/decorative_chocolate_profile.jpg",
    carouselSrc: "/flavours/decorative_chocolate.jpg",
    description: "Chocolate-flavoured shells filled with a rich, dark chocolate ganache.",
  },
  {
    id: 2,
    name: "Coffee",
    src: "/flavours/decorative_coffee_profile.jpg",
    carouselSrc: "/flavours/decorative_coffee.jpg",
    description: "Coffee-flavoured shells filled with a smooth, bittersweet coffee buttercream.",
  },
  {
    id: 3,
    name: "Cookies & Cream",
    src: "/flavours/decorative_cookies_and_cream_profile.jpg",
    carouselSrc: "/flavours/decorative_cookies_and_cream.jpg",
    description: "Oreo-inspired macaron shells filled with creamy Oreo buttercream and Oreo pieces.",
  },
  {
    id: 4,
    name: "Matcha",
    src: "/flavours/matcha.jpg",
    carouselSrc: "/flavours/decorative_matcha.jpg",
    description: "Matcha green tea shells filled with a delicate matcha white chocolate ganache.",
  },
  {
    id: 5,
    name: "Mint Chocolate",
    src: "/flavours/mint_chocolate.jpg",
    carouselSrc: "/flavours/decorative_mint_chocolate.jpg",
    description: "Mint-flavoured shells filled with a rich, cool chocolate ganache.",
  },
  {
    id: 6,
    name: "Pistachio",
    src: "/flavours/pistachio.jpg",
    carouselSrc: "/flavours/decorative_pistachio.jpg",
    description: "Green macaron shells filled with a pistachio buttercream and chopped pistachios.",
  },
  {
    id: 7,
    name: "Red Velvet",
    src: "/flavours/red_velvet.jpg",
    carouselSrc: "/flavours/decorative_red_velvet.jpg",
    description: "Light chocolate shells with a red tint filled with tangy-sweet cream cheese buttercream filling.",
  },
  {
    id: 8,
    name: "Salted Caramel",
    src: "/flavours/salted_caramel.jpg",
    carouselSrc: "/flavours/decorative_salted_caramel.jpg",
    description: "Buttery caramel-flavoured shells filled with a salted caramel buttercream and a touch of sea salt.",
  },
  {
    id: 9,
    name: "Strawberry Cheesecake",
    src: "/flavours/strawberry.jpg",
    carouselSrc: "/flavours/decorative_strawberry.jpg",
    description: "Pink macaron shells filled with a tangy cream cheese buttercream and strawberry jam.",
  },
  {
    id: 10,
    name: "Vanilla",
    src: "/flavours/close_up_vanilla.jpg",
    carouselSrc: "/flavours/close_up_vanilla.jpg",
    description: "Blue macaron shells filled with a smooth vanilla French buttercream.",
  },
];
