/**
 * Logo Component
 * ==============
 * The animated Moon Treatz logo.
 */

// DEPENDENCIES
import { Link } from "react-router-dom";
import "./Logo.css";

/**
 * Logo Component Implementation
 * =============================
 * Assembles the logo from five separate image layers:
 * 1. Moon (crescent shape background)
 * 2. Cloud (body of the character)
 * 3. Left eye
 * 4. Right eye
 * 5. Mouth
 */
const Logo = () => {
  return (
    // Wrap entire logo in Link to make it clickable
    <Link to="/" className="logo">
      <div className="logo-container">
        {/* Layer 1: Crescent moon background */}
        <img src="/logo/moon.png" className="logo-moon"/>
        
        {/* Layer 2: Cloud body (main character base) */}
        <img src="/logo/cloud.png" className="logo-cloud"/>
        
        {/* Layer 3: Left eye */}
        <img src="/logo/eye.png" className="logo-eye logo-eye-left"/>
        
        {/* Layer 4: Right eye (same image, positioned differently) */}
        <img src="/logo/eye.png" className="logo-eye logo-eye-right"/>
        
        {/* Layer 5: Mouth */}
        <img src="/logo/mouth.png" className="logo-mouth"/>
      </div>
    </Link>
  );
};

export default Logo;
