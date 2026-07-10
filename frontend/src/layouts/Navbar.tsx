/**
 * Navbar
 * ======
 * Three-section ribbon navigation: Home link — centered Logo — Flavours link.
 * The active link gets the `active` class for gold highlighting via CSS.
 */

import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const path = useLocation();

  return (
    <nav className="ribbon-navbar">
      <div className="ribbon-bar">
        <div className="ribbon-section ribbon-left">
          <Link to="/" className={path.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </div>

        {/* Logo sits inside a double-ring rosette frame in the center */}
        <div className="ribbon-center">
          <div className="rosette-frame">
            <div className="rosette-inner">
              <Logo />
            </div>
          </div>
        </div>

        <div className="ribbon-section ribbon-right">
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
