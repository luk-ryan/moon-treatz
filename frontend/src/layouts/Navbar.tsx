import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const path = useLocation();
  return (
    <div className="wide-wrapper">
      <nav className="primary-navigation">
        <ul>
          <li>
            <Link to="/" className={path.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>LOGO</li>
          <li>
            <Link
              to="/flavours"
              className={path.pathname === "/flavours" ? "active" : ""}
            >
              Flavours
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
