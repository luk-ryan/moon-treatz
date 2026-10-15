/**
 * Specialty Flavours Configuration
 * =================================
 * Decorative/specialty macaron flavour photos shown in the Specialty Flavours gallery tab on the Flavours page.
 */
export type SpecialtyFlavour = {
  src: string;
  name: string;
};

export const specialtyFlavours: SpecialtyFlavour[] = [
  {
    src: "/flavours/specialty_flavours/decorative_biscoff.jpg",
    name: "Biscoff",
  },
  {
    src: "/flavours/specialty_flavours/decorative_chocolate_peanutbutter.jpg",
    name: "Chocolate Peanut Butter",
  },
  {
    src: "/flavours/decorative_coconut.jpg",
    name: "Coconut",
  },
  {
    src: "/flavours/specialty_flavours/decorative_dubai_chocolate.jpg",
    name: "Dubai Chocolate",
  },
  {
    src: "/flavours/specialty_flavours/decorative_earl_gray.jpg",
    name: "Earl Grey",
  },
  { src: "/flavours/specialty_flavours/decorative_lemon.jpg", name: "Lemon" },
  {
    src: "/flavours/specialty_flavours/decorative_tiramisu.jpg",
    name: "Tiramisu",
  },
];
