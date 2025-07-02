import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const path = useLocation();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={path.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
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
  );
};

export default Navbar;
