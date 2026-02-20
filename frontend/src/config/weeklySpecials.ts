/**
 * Weekly Specials Configuration
 * =============================
 * Config for all weekly special boxes.
 * Used by both WeeklyBox (home page) and WeeklyGallery (flavours page).
 *
 * To add a new weekly special:
 * 1. Add images to /public/flavours/weekly_specials/
 * 2. Add transparent version to /public/flavours/weekly_specials/transparent/
 * 3. Add new entry to weeklySpecials array with the highest id (flavours, displayImage, images, etc.)
 *
 * The latest special (highest id) will automatically be featured on the home page.
 */

import type { WeeklyFlavour } from "../types/types";

/**
 * Weekly Specials Data
 * ====================
 * Complete archive of all weekly special boxes.
 *
 * Image Types:
 * - box-view: Front view of the box
 * - side-view: Side angle of macarons
 * - top-view: Overhead view showing all macarons
 * - transparent: Cutout version for home page display
 */
export const weeklySpecials: WeeklyFlavour[] = [
  {
    id: 1,
    flavours: ["Chocolate", "Pistachio", "Salted Caramel"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_1.png",
    images: [
      "/flavours/weekly_specials/weekly_special_1(box-view).png",
      "/flavours/weekly_specials/weekly_special_1(side-view).png",
      "/flavours/weekly_specials/weekly_special_1(top-view).png",
    ],
  },
  {
    id: 2,
    flavours: ["Moon Treatz Vanilla", "Ferrero Rocher", "Earl Grey"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_2.png",
    images: [
      "/flavours/weekly_specials/weekly_special_2(box-view).png",
      "/flavours/weekly_specials/weekly_special_2(side-view).png",
      "/flavours/weekly_specials/weekly_special_2(top-view).jpg",
    ],
  },
  {
    id: 3,
    flavours: ["Moon Treatz Vanilla (Blue)", "Salted Caramel", "Red Velvet"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_3.png",
    images: [
      "/flavours/weekly_specials/weekly_special_3(box-view).png",
      "/flavours/weekly_specials/weekly_special_3(side-view).png",
      "/flavours/weekly_specials/weekly_special_3(top-view).png",
    ],
  },
  {
    id: 4,
    flavours: ["Oreo Cookies & Cream", "Biscoff", "Strawberry Cheesecake"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_4.png",
    images: [
      "/flavours/weekly_specials/weekly_special_4(box-view).png",
      "/flavours/weekly_specials/weekly_special_4(side-view).png",
      "/flavours/weekly_specials/weekly_special_4(top-view).png",
    ],
  },
  {
    id: 5,
    flavours: ["Oreo Cookies & Cream", "Chocolate Salted Caramel", "Pistachio"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_5.png",
    images: [
      "/flavours/weekly_specials/weekly_special_5(box-view).png",
      "/flavours/weekly_specials/weekly_special_5(side-view).png",
    ],
  },
  {
    id: 6,
    flavours: [
      "Matcha",
      "Chocolate Chip Cookie Dough",
      "Chocolate Hazelnut (Nutella)",
    ],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_6.png",
    images: [
      "/flavours/weekly_specials/weekly_special_6(box-view).jpg",
      "/flavours/weekly_specials/weekly_special_6(top-view).png",
      "/flavours/weekly_specials/weekly_special_6(side-view).jpg",
      "/flavours/weekly_specials/weekly_special_6(side-view2).jpg",
    ],
  },
  {
    id: 7,
    flavours: ["Strawberry Matcha", "Dubai Chocolate", "Earl Grey"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_7.png",
    images: [
      "/flavours/weekly_specials/weekly_special_7(box-view).png",
      "/flavours/weekly_specials/weekly_special_7(top-view).jpg",
      "/flavours/weekly_specials/weekly_special_7(side-view).jpg",
      "/flavours/weekly_specials/weekly_special_7(side-view2).jpg",
    ],
  },
  {
    id: 8,
    flavours: ["Red Velvet", "Chocolate", "White Chocolate Raspberry"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_8.png",
    images: [
      "/flavours/weekly_specials/weekly_special_8(box-view).jpg",
      "/flavours/weekly_specials/weekly_special_8(top-view).png",
    ],
  },
  {
    id: 9,
    flavours: ["Salted Caramel", "Chocolate Vanilla Swirl", "Coffee"],
    displayImage: "/flavours/weekly_specials/transparent/weekly_special_9.png",
    images: [
      "/flavours/weekly_specials/weekly_special_9(box-view).jpg",
      "/flavours/weekly_specials/weekly_special_9(top-view).jpg",
    ],
  },
];

/**
 * Get the latest weekly special (highest id)
 */
export const getLatestSpecial = () => {
  return weeklySpecials.reduce((latest, current) =>
    current.id > latest.id ? current : latest,
  );
};

/**
 Get the index of the latest special in the array (highest id)
 */
export const getLatestSpecialIndex = () => {
  const latest = getLatestSpecial();
  return weeklySpecials.findIndex((special) => special.id === latest.id);
};
