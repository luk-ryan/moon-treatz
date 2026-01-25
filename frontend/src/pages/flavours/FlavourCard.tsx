/**
 * FlavourCard Component
 * =====================
 * Displays a single macaron flavour with its image, name, and description.
 * Used in the Flavours view to showcase individual macaron options.
 * 
 * Content Structure:
 * 1. Flavour name as heading
 * 2. Product image (lazy loaded)
 * 3. Description of shells and filling
 * 
 * Performance:
 * - Images use lazy loading to improve initial page load (small optimization).
 */

import type { FlavourCardProps } from "../../types/types";

/**
 * FlavourCard Component Implementation
 * ====================================
 */
const FlavourCard = ({ name, src, description }: FlavourCardProps) => {
  return (
    // Container for individual flavour card
    <div className="flavour-card">
      {/* Flavour name as heading */}
      <h3>{name}</h3>
      {/* Macaron image with lazy loading for performance */}
      <img src={src} loading="lazy" />
      {/* Detailed description of the macaron */}
      <p>{description}</p>
    </div>
  );
};

export default FlavourCard;
