/**
 * Logo Component
 * ==============
 * The animated Moon Treatz logo.
 */

// DEPENDENCIES
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
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
  const isMobile = useIsMobile();

  return (
    // Wrap entire logo in Link to make it clickable
    <Link to="/" className="logo">
      <div className="logo-container">
        {/* Layer 1: Crescent moon background */}
        {isMobile ? (
          <img src="/logo/moon.png" className="logo-moon" />
        ) : (
          <motion.img 
            src="/logo/moon.png" 
            className="logo-moon"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
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
