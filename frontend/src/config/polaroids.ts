/**
 * Polaroid Image Configuration
 * ============================
 * Full catalogue of polaroid-style photos used in the hero collage on the Home page.
 */
export type PolaroidEntry = {
  src: string;
  name: string;
  description: string;
};

export const ALL_POLAROIDS: PolaroidEntry[] = [
  { src: "/flavours/polaroids/box.jpg",                                                              name: "The Box",                                    description: "Assorted macarons, made fresh" },
  { src: "/flavours/polaroids/boxes_white_chocolate_raspberry+chocolate+red_velvet.jpg",             name: "White Chocolate Raspberry · Chocolate · Red Velvet", description: "A trio of crowd favourites" },
  { src: "/flavours/polaroids/box_coffee+chocolate_vanilla_swirl+salted_caramel.jpg",                name: "Coffee · Chocolate Vanilla Swirl · Salted Caramel",  description: "Bold flavours, perfectly balanced" },
  { src: "/flavours/polaroids/box_cookies_and_cream+coconut+salted_caramel.jpg",                     name: "Cookies & Cream · Coconut · Salted Caramel",    description: "Sweet, tropical & indulgent" },
  { src: "/flavours/polaroids/box_lemon+biscoff+peanut_butter_chocolate.jpg",                        name: "Lemon · Biscoff · Peanut Butter Chocolate",          description: "Zesty, buttery & rich" },
  { src: "/flavours/polaroids/box_mint_chocolate+strawberry_cheesecake+chocolate.jpg",               name: "Mint Chocolate · Strawberry Cheesecake · Chocolate", description: "Fresh, fruity & indulgent" },
  { src: "/flavours/polaroids/box_vanilla+red_velvet+biscoff.jpg",                                   name: "Vanilla · Red Velvet · Biscoff",                description: "Classic meets bold" },
  { src: "/flavours/polaroids/box_white_chocolate_raspberry+chocolate+red_velvet.jpg",               name: "White Chocolate Raspberry · Chocolate · Red Velvet", description: "A fan-favourite trio" },
  { src: "/flavours/polaroids/chocolate_chip_cookie_dough_close_up.jpg",                             name: "Chocolate Chip Cookie Dough",                   description: "A nostalgic, indulgent bite" },
  { src: "/flavours/polaroids/chocolate_hazelnut_close_up.jpg",                                      name: "Chocolate Hazelnut",                            description: "Silky, nutty perfection" },
  { src: "/flavours/polaroids/close_up_biscoff.jpg",                                                 name: "Biscoff",                                       description: "Warm spiced cookie in a shell" },
  { src: "/flavours/polaroids/close_up_chocolate.jpg",                                               name: "Chocolate",                                     description: "Dark, rich & smooth" },
  { src: "/flavours/polaroids/close_up_coconut.jpg",                                                 name: "Coconut",                                       description: "Light, tropical & delicate" },
  { src: "/flavours/polaroids/close_up_cookies_and_cream.jpg",                                       name: "Cookies & Cream",                               description: "A classic done right" },
  { src: "/flavours/polaroids/close_up_pistachio.jpg",                                               name: "Pistachio",                                     description: "One of our fan favourites" },
  { src: "/flavours/polaroids/close_up_red_velvet.jpg",                                              name: "Red Velvet",                                    description: "Tangy cream cheese buttercream" },
  { src: "/flavours/polaroids/close_up_salted_caramel.jpg",                                          name: "Salted Caramel",                                description: "Sweet, salty, irresistible" },
  { src: "/flavours/polaroids/close_up_vanilla.jpg",                                                 name: "Vanilla",                                       description: "Classic French buttercream" },
  { src: "/flavours/polaroids/coffee_close_up.jpg",                                                  name: "Coffee",                                        description: "Espresso-touched buttercream" },
  { src: "/flavours/polaroids/cookies_and_cream_close_up.jpg",                                       name: "Cookies & Cream",                               description: "Oreo buttercream inside" },
  { src: "/flavours/polaroids/matcha_close_up.jpg",                                                  name: "Matcha",                                        description: "Earthy, sweet & delicate" },
  { src: "/flavours/polaroids/plate_lemon+biscoff+peanut_butter_chocolate.jpg",                      name: "Lemon · Biscoff · Peanut Butter Chocolate",          description: "A trio worth savouring" },
  { src: "/flavours/polaroids/plate_pistachio+salted_caramel+chocolate.jpg",                         name: "Pistachio · Salted Caramel · Chocolate",        description: "Our most-loved trio" },
  { src: "/flavours/polaroids/single_chocolate.jpg",                                                 name: "Chocolate",                                     description: "Rich dark ganache filling" },
  { src: "/flavours/polaroids/single_dubai_chocolate.jpg",                                           name: "Dubai Chocolate",                               description: "Trending & decadent" },
  { src: "/flavours/polaroids/single_earl_grey.jpg",                                                 name: "Earl Grey",                                     description: "Floral, fragrant & refined" },
  { src: "/flavours/polaroids/single_strawberry_matcha.jpg",                                         name: "Strawberry Matcha",                             description: "Fruity meets earthy" },
  { src: "/flavours/polaroids/single_white_chocolate_raspberry.jpg",                                 name: "White Chocolate Raspberry",                          description: "Bright, tangy & sweet" },
  { src: "/flavours/polaroids/strawberry_cheesecake_close_up.jpg",                                   name: "Strawberry Cheesecake",                         description: "Creamy, fruity & indulgent" },
  { src: "/flavours/polaroids/top_cookies_and_cream+vanilla+pistachio.jpg",                          name: "Cookies & Cream · Vanilla · Pistachio",         description: "Three essential flavours" },
  { src: "/flavours/polaroids/top_dubai_chocolate+earl_grey+strawverry_matche.jpg",                  name: "Dubai Chocolate · Earl Grey · Strawberry Matcha",    description: "Unique, bold & beautiful" },
  { src: "/flavours/polaroids/top_lemon+biscoff+peanut_butter_chocolate.jpg",                        name: "Lemon · Biscoff · Peanut Butter Chocolate",          description: "A colourful trio" },
  { src: "/flavours/polaroids/top_strawberry_coffee.jpg",                                            name: "Strawberry & Coffee",                           description: "Fruity meets bold" },
  { src: "/flavours/polaroids/top_white_chocolate_raspberry+chocolate+red_velvet.jpg",               name: "White Chocolate Raspberry · Chocolate · Red Velvet", description: "Vibrant colours, bold flavours" },
  { src: "/flavours/polaroids/trio_chocolate_chip_cookie_dough+chocolate_hazelnut+matcha.jpg",       name: "Cookie Dough · Chocolate Hazelnut · Matcha",         description: "Sweet indulgence, elevated" },
  { src: "/flavours/polaroids/trio_coffee+chocolate_vanilla_swirl+salted_caramel.jpg",               name: "Coffee · Chocolate Vanilla Swirl · Salted Caramel",  description: "A rich, balanced trio" },
  { src: "/flavours/polaroids/trio_cookies_and_cream+coconut+salted_caramel.jpg",                    name: "Cookies & Cream · Coconut · Salted Caramel",    description: "Sweet, tropical & bold" },
  { src: "/flavours/polaroids/trio_cookies_and_cream+vanilla+pistachio.jpg",                         name: "Cookies & Cream · Vanilla · Pistachio",         description: "Three crowd-pleasers" },
  { src: "/flavours/polaroids/trio_dubai_chocolate+earl_grey+strawverry_matche.jpg",                 name: "Dubai Chocolate · Earl Grey · Strawberry Matcha",    description: "Daring, delicate & delightful" },
  { src: "/flavours/polaroids/trio_lemon+biscoff+peanut_butter_chocolate.jpg",                       name: "Lemon · Biscoff · Peanut Butter Chocolate",          description: "Bright, spiced & bold" },
  { src: "/flavours/polaroids/trio_matcha+mint+pistachio.jpg",                                       name: "Matcha · Mint · Pistachio",                     description: "A trio of greens" },
  { src: "/flavours/polaroids/trio_mint_chocolate+strawberry_cheesecake+chocolate.jpg",              name: "Mint Chocolate · Strawberry Cheesecake · Chocolate", description: "Refreshing and indulgent" },
  { src: "/flavours/polaroids/trio_red_velvet+chocolate+jasmine_tea.jpg",                            name: "Red Velvet · Chocolate · Jasmine Tea",          description: "Bold, rich & floral" },
  { src: "/flavours/polaroids/trio_vanilla+ferrero_rocher+earl_grey.jpg",                            name: "Vanilla · Ferrero Rocher · Earl Grey",          description: "Elegant and refined" },
  { src: "/flavours/polaroids/trio_vanilla+red_velvet+biscoff.jpg",                                  name: "Vanilla · Red Velvet · Biscoff",                description: "Classic with a twist" },
];

/** Returns n unique random entries from ALL_POLAROIDS. */
export function getRandomPolaroids(n: number): PolaroidEntry[] {
  const shuffled = [...ALL_POLAROIDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}