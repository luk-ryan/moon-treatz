/**
 * ScrollToTop Component
 * =====================
 * A component that automatically scrolls the page to the top whenever the route changes.
 */

// DEPENDENCIES
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * COMPONENT OUTPUT
 * ================
 * useEffect hook to perform scroll whenever the pathname changes. Runs after every route change.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
