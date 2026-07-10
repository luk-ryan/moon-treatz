/**
 * Header
 * ======
 * Site header containing the Moon Treatz title with ornamental typography,
 * L-bracket corner accents, and the ribbon Navbar below.
 */

import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="title-container">
        <div className="title-ornament-row">
          {/* Left ornament row — star, dot, moon, dot, diamond + trailing line */}
          <div className="ornament-side ornament-left">
            <span className="ornament-line"></span>
            <span className="ornament-symbol ornament-star subtle">✦</span>
            <span className="ornament-symbol ornament-dot">•</span>
            <span className="ornament-symbol ornament-moon">☾</span>
            <span className="ornament-symbol ornament-dot">•</span>
            <span className="ornament-symbol ornament-diamond subtle">◇</span>
          </div>

          <h1 className="text-center">Moon Treatz</h1>

          {/* Right ornament row — mirror of the left, uses ☽ (crescent faces the other way) */}
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

      {/* Top-left L-bracket corner */}
      <div className="corner-group corner-group-left">
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
      </div>

      {/* Top-right L-bracket corner */}
      <div className="corner-group corner-group-right">
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
