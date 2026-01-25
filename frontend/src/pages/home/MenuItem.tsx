/**
 * MenuItem Component
 * ==================
 * Displays a single catering menu option with quantity, flavour choices, and pricing.
 * Used to present the different bulk order tiers available to customers.
 * 
 * Display Format:
 * - Left: Quantity and number of flavour choices
 * - Right: Price in CAD
 */

import type { MenuItemProps } from "../../types/types";

/**
 * Rotation angles for each menu item to add visual variety
 */
const rotations = [5, -8, 12, -5];

/**
 * MenuItem Component Implementation
 * =================================
 */
const MenuItem = ({ quantity, price, flavours }: MenuItemProps) => {
  // Calculate rotation based on quantity: (quantity/10 - 2) converts 20→0, 30→1, 60→4, 90→7, then % 4 wraps to array index
  const rotationIndex = (quantity / 10 - 2) % rotations.length;
  const rotation = rotations[rotationIndex];
  
  return (
    // Container for single menu item row
    <div className="menu-list-row">
      {/* Left side: quantity and flavour info */}
      <div className="menu-item-info">
        {/* Display number of macarons in this option with icon */}
        <span>
          <span className="bold">{quantity}</span>
          <img 
            src="/icons/macaron-icon.png" 
            alt="Macarons" 
            className="macaron-icon" 
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </span>
        {/* Display number of flavour choices available */}
        <span className="menu-item-flavours"><span className="bold">{flavours}</span> flavours</span>
      </div>
      {/* Right side: price with dollar sign */}
      <span className="bold">${price}</span>
    </div>
  );
};

export default MenuItem;
