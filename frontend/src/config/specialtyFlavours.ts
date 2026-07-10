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
  { src: "/flavours/specialty_flavours/decorative_biscoff.jpg",              name: "Biscoff" },
  { src: "/flavours/specialty_flavours/decorative_chocolate.jpg",            name: "Chocolate" },
  { src: "/flavours/specialty_flavours/decorative_chocolate_peanutbutter.jpg", name: "Chocolate Peanut Butter" },
  { src: "/flavours/specialty_flavours/decorative_coconut.jpg",              name: "Coconut" },
  { src: "/flavours/specialty_flavours/decorative_coffee.jpg",               name: "Coffee" },
  { src: "/flavours/specialty_flavours/decorative_cookies_and_cream.jpg",    name: "Cookies & Cream" },
  { src: "/flavours/specialty_flavours/decorative_lemon.jpg",                name: "Lemon" },
  { src: "/flavours/specialty_flavours/decorative_matcha.jpg",               name: "Matcha" },
  { src: "/flavours/specialty_flavours/decorative_mint_chocolate.jpg",       name: "Mint Chocolate" },
  { src: "/flavours/specialty_flavours/decorative_pistachio.jpg",            name: "Pistachio" },
  { src: "/flavours/specialty_flavours/decorative_salted_caramel.jpg",       name: "Salted Caramel" },
  { src: "/flavours/specialty_flavours/decorative_strawberry.jpg",           name: "Strawberry" },
];
