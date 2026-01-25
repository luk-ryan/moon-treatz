/**
 * Header Component
 * ================
 * The main header of the Moon Treatz website.
 * 
 * Design Features:
 * - "Moon Treatz" title with decorative ornaments
 * - Typography designs on both sides (diamonds, stars, moons)
 * - Corner decorations
 * - Navigation bar
 */

import Navbar from "./Navbar";

/**
 * Header Component
 * ================
 */
const Header = () => {
  return (
    <header>
      <div className="title-container">
        {/* MAIN TITLE */}
        <div className="title-ornament-row">
          {/* Left ornaments - subtle decorative elements */}
          <div className="ornament-side ornament-left">
            <span className="ornament-line"></span>
            <span className="ornament-symbol ornament-star subtle">✦</span>
            <span className="ornament-symbol ornament-dot">•</span>
            <span className="ornament-symbol ornament-moon">☾</span>
            <span className="ornament-symbol ornament-dot">•</span>
            <span className="ornament-symbol ornament-diamond subtle">◇</span>
          </div>
          
          {/* Main site title */}
          <h1 className="text-center">Moon Treatz</h1>
          
          {/* Right ornaments - mirror of left side */}
          <div className="ornament-side ornament-right">
            <span className="ornament-symbol ornament-diamond subtle">◇</span>
            <span className="ornament-symbol ornament-dot">•</span>
            <span className="ornament-symbol ornament-moon">☽</span>
            <span className="ornament-symbol ornament-dot">•</span>
            <span className="ornament-symbol ornament-star subtle">✦</span>
            <span className="ornament-line"></span>
          </div>
        </div>
      </div>

      {/* CORNER DECORATION (TOP-LEFT) */}
      <div className="corner-group corner-group-left">
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
      </div>
        
      {/* CORNER DECORATION (TOP-RIGHT) */}
      <div className="corner-group corner-group-right">
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
      </div>

      {/* NAVIGATION BAR (RIBBON STYLE) */}
      <Navbar />
    </header>
  );
};

export default Header;
