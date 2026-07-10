/**
 * FloatingCart
 * ============
 * Persistent cart icon fixed in the corner of every page except /pre-order
 * (no point showing it when you're already on the form).
 *
 * Shows an animated badge with the live item count whenever the cart is non-empty.
 * Tapping it navigates straight to /pre-order.
 */

import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function FloatingCart() {
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  // Hide on the pre-order page itself
  if (pathname === "/pre-order") return null;

  return (
    <Link
      to="/pre-order"
      className="floating-cart"
      aria-label={`Pre-order form${totalItems > 0 ? `, ${totalItems} item${totalItems !== 1 ? "s" : ""} in cart` : ""}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            className="floating-cart-badge"
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
