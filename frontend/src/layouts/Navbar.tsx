/**
 * Navbar Component
 * ================
 * The main navigation bar for the Moon Treatz website, featuring a unique ribbon design with a centered logo.
 * Provides navigation between Home and Flavours pages.
 * 
 * Navigation Links:
 * - Home (/): Main landing page
 * - Flavours (/flavours): Gallery of macaron flavours
 */

import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

/**
 * Navbar Component Implementation
 * ===============================
 * Creates a three-section ribbon navigation:
 * 1. Left section: Home link
 * 2. Center: Logo in decorative frame
 * 3. Right section: Flavours link
 * 
 * Uses React Router's useLocation hook to determine which link should
 * display as active based on the current pathname.
 */
const Navbar = () => {
  // Get current route path for active link highlighting
  const path = useLocation();
  
  return (
    <nav className="ribbon-navbar">
      {/* Main ribbon bar container */}
      <div className="ribbon-bar">
        
        {/* Left section - HOME LINK */}
        <div className="ribbon-section ribbon-left">
          {/* Add 'active' class if currently on home page */}
          <Link to="/" className={path.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </div>
        
        {/* Center section - LOGO WITH DECORATIVE FRAME */}
        <div className="ribbon-center">
          {/* Outer frame */}
          <div className="rosette-frame">
            {/* Inner frame containing the logo */}
            <div className="rosette-inner">
              <Logo /> {/* Animated Moon Treatz logo */}
            </div>
          </div>
        </div>
        
        {/* Right section - FLAVOURS LINK */}
        <div className="ribbon-section ribbon-right">
          {/* Add 'active' class if currently on flavours page */}
          <Link
            to="/flavours"
            className={path.pathname === "/flavours" ? "active" : ""}
          >
            Flavours
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
