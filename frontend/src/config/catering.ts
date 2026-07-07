/**
 * Catering Configuration
 * =======================
 * Central config for all catering-related data used across the site.
 */

import type { MenuItemProps } from "../types/types";

/**
 * Catering package size definitions
 * -----------------------------------
 * Each entry represents one orderable catering tier.
 */
export const CATERING_SIZES = [
  { key: "c20" as const, label: "20 Macarons", flavourCount: "2 flavours", price: "$35",  unitPrice: 35,  maxFlavours: 2 },
  { key: "c30" as const, label: "30 Macarons", flavourCount: "3 flavours", price: "$50",  unitPrice: 50,  maxFlavours: 3 },
  { key: "c60" as const, label: "60 Macarons", flavourCount: "3 flavours", price: "$95",  unitPrice: 95,  maxFlavours: 3 },
  { key: "c90" as const, label: "90 Macarons", flavourCount: "3 flavours", price: "$135", unitPrice: 135, maxFlavours: 3 },
];

/**
 * Package card images
 * --------------------
 * Cover photo shown on each catering package card in the pre-order form.
 * Keys match CATERING_SIZES `key` values.
 */
export const CATERING_IMAGES: Partial<Record<string, string>> = {
  c20: "/form/CateringBox_20.jpg",
  c30: "/form/CateringBox_30.jpg",
  c60: "/form/CateringBox_60.jpg",
  c90: "/form/CateringBox_90.jpg",
};

/**
 * Available pickup locations
 * ---------------------------
 * Dropdown options for the pickup location field in the pre-order schedule step.
 * Comment out entries to hide a location without deleting it.
 */
export const PICKUP_LOCATIONS = [
  { value: "thornhill-woods", label: "Thornhill Woods", sublabel: "exact location given later" },
  // { value: "york-university", label: "York University" },
];

/**
 * Home page menu items
 * ---------------------
 * Simplified list of catering tiers for the Menu component on the home page.
 */
export const MENU_ITEMS: MenuItemProps[] = [
  { quantity: 20, price: 35,  flavours: 2 },
  { quantity: 30, price: 50,  flavours: 3 },
  { quantity: 60, price: 95,  flavours: 3 },
  { quantity: 90, price: 135, flavours: 3, bestValue: true },
];
