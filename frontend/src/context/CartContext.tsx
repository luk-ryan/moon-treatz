/**
 * CartContext
 * ===========
 * Global cart state shared across all pages.
 */

import { createContext, useContext, useState, type ReactNode } from "react";

export type CartState = { weekly: number; c20: number; c30: number; c60: number; c90: number };

const CART_INIT: CartState = { weekly: 0, c20: 0, c30: 0, c60: 0, c90: 0 };
const STORAGE_KEY = "mt_cart"; // localStorage key

interface CartContextType {
  cart: CartState;
  setCart: (update: CartState | ((prev: CartState) => CartState)) => void;
  totalItems: number; // sum of all quantities — drives the floating badge
  clearCart: () => void;
}

// Default context value (used outside CartProvider — should never happen in practice)
const CartContext = createContext<CartContextType>({
  cart: CART_INIT,
  setCart: () => {},
  totalItems: 0,
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialise from localStorage so cart survives page navigation
  const [cart, setCartState] = useState<CartState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...CART_INIT, ...JSON.parse(saved) } : CART_INIT;
    } catch {
      return CART_INIT;
    }
  });

  // Accepts a new state or an updater function; persists to localStorage on every change
  const setCart = (update: CartState | ((prev: CartState) => CartState)) => {
    setCartState(prev => {
      const next = typeof update === "function" ? update(prev) : update;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  // Resets all quantities to zero and removes the localStorage entry
  const clearCart = () => {
    setCartState(CART_INIT);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const totalItems = Object.values(cart).reduce((sum, v) => sum + v, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, totalItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
