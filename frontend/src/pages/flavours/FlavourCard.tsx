/**
 * FlavourCard
 * ===========
 * Displays a single macaron flavour: name, image (lazy-loaded), and filling description.
 * Rendered in a grid by Flavours.tsx — one card per entry in the flavours config.
 */

import type { FlavourCardProps } from "../../types/types";

const FlavourCard = ({ name, src, description }: FlavourCardProps) => {
  return (
    <div className="flavour-card">
      <h3>{name}</h3>
      <img src={src} loading="lazy" />
      <p>{description}</p>
    </div>
  );
};

export default FlavourCard;
