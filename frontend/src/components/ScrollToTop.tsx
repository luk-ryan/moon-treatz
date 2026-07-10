/**
 * ScrollToTop
 * ===========
 * Imperatively scrolls to the top of the page on every route change.
 * Renders nothing — it's a side-effect-only component mounted once in App.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
