/**
 * MenuItem Component
 * ==================
 * Displays a single catering menu option with quantity, flavour choices, and pricing.
 * Used to present the different bulk order tiers available to customers.
 */

import { useNavigate } from "react-router-dom";
import type { MenuItemProps } from "../../types/types";
import { useCart } from "../../context/CartContext";

// Maps macaron quantity → the matching cart key used in CartState
const QTY_TO_KEY: Record<number, "c20" | "c30" | "c60" | "c90"> = {
  20: "c20", 30: "c30", 60: "c60", 90: "c90",
};

// Slight icon tilt per tier
const rotations = [5, -8, 12, -5];

const MenuItem = ({ quantity, price, flavours, bestValue }: MenuItemProps) => {
  const { setCart } = useCart();
  const navigate = useNavigate();
  const rotationIndex = (quantity / 10 - 2) % rotations.length;
  const rotation = rotations[rotationIndex];
  const unitPrice = (price / quantity).toFixed(2);
  const cartKey = QTY_TO_KEY[quantity];

  const handleClick = () => {
    // Add one of this package to the cart, then jump to the catering step
    if (cartKey) {
      setCart(prev => ({ ...prev, [cartKey]: prev[cartKey] + 1 }));
    }
    navigate("/pre-order#catering");
  };

  return (
    <div
      className={`menu-list-row${bestValue ? " menu-list-row--best" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && handleClick()}
      title={`Add ${quantity} macarons to cart`}
    >
      {/* LEFT — quantity, icon, flavour count */}
      <div className="menu-item-left">
        <div className="menu-item-info">
          <span className="menu-item-qty">{quantity}</span>
          <img
            src="/icons/macaron-icon.png"
            alt="Macarons"
            className="macaron-icon"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <span className="menu-item-flavours">{flavours} flavours</span>
        </div>
        {bestValue && <span className="menu-best-badge">Best Value</span>}
      </div>

      {/* RIGHT — per-unit price, total, arrow */}
      <div className="menu-item-right">
        <span className="menu-item-unit">${unitPrice} ea</span>
        <span className="menu-item-price">${price}</span>
        <span className="menu-item-arrow">→</span>
      </div>
    </div>
  );
};

export default MenuItem;
