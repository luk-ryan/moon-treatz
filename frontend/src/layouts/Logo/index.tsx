/**
 * Logo
 * ====
 * Animated Moon Treatz logo assembled from layered images.
 * Interactive on desktop: eyes follow the cursor, click+hold shows floating hearts and a wiggle.
 *
 * Layers (bottom to top):
 *   1. Moon     — crescent background, gentle float
 *   2. Cloud    — character body, float + excited wiggle on hold
 *   3. Left eye — tracks cursor; winks on hold
 *   4. Right eye— tracks cursor; winks on hold
 *   5. Mouth    — synced with cloud wiggle
 *   6. Hearts   — particle burst on click+hold (desktop only)
 */

// DEPENDENCIES
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./Logo.css";

// Three hearts that float up at different positions/timings when the user clicks+holds
const HEART_CONFIGS = [
  { left: '35%', y: -80, x: -30, duration: 1.5, delay: 0,   emoji: '❤️' },
  { left: '65%', y: -90, x: 30,  duration: 1.8, delay: 0.3, emoji: '💕' },
  { left: '50%', y: -100, x: 0,  duration: 2,   delay: 0.6, emoji: '❤️' },
];

const Logo = () => {
  const isMobile = useIsMobile();

  // isHovered — enables eye tracking while the cursor is over the logo
  const [isHovered, setIsHovered] = useState(false);
  // isHolding — triggers the wink + heart burst + excited wiggle on mousedown
  const [isHolding, setIsHolding] = useState(false);
  // containerRef — needed to compute the cursor offset relative to the logo center
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw mouse position fed into spring animations for smooth eye lag
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const leftEyeX  = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const leftEyeY  = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const rightEyeX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const rightEyeY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Each eye has an asymmetric X transform so they diverge slightly —
  // left eye exaggerates rightward movement, right eye exaggerates leftward.
  // This creates a more natural-looking gaze effect.
  const leftEyeTransformX  = useTransform(leftEyeX,  (v) => v > 0 ? v * 1.5 : v * 0.7);
  const rightEyeTransformX = useTransform(rightEyeX, (v) => v < 0 ? v * 1.5 : v * 0.7);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect    = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    // Normalise to [-1, 1] then scale to a max pixel movement of 4px
    const deltaX = (event.clientX - centerX) / (rect.width  / 2);
    const deltaY = (event.clientY - centerY) / (rect.height / 2);
    const maxMovement = 4;
    mouseX.set(deltaX * maxMovement);
    mouseY.set(deltaY * maxMovement);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Snap eyes back to centre
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    // Clicking anywhere on the logo navigates back to home
    <Link to="/" className="logo">
      <div 
        ref={containerRef}
        className="logo-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* =================================
            LAYER 1: CRESCENT MOON BACKGROUND
            ================================= */}
        {isMobile ? (
          <img src="/logo/moon.png" className="logo-moon" />
        ) : (
          <motion.img 
            src="/logo/moon.png" 
            className="logo-moon"
            animate={{
              y: [0, -5, 0],           // Gentle up/down float
              rotate: [0, -2, 2, 0]    // Subtle rotation sway
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* ==========================================
            LAYER 2-5: INTERACTIVE FACE
            (Cloud body + Eyes + Mouth)
            Features:
            - Mouse hold triggers "excited wiggle"
            - Eyes track mouse cursor on hover
            - Eyes blink closed when mouse held down
            - Wink animation appears during mouse hold
            ========================================== */}
        {isMobile ? (
          <>
            <img src="/logo/cloud.png" className="logo-cloud"/>
            <img src="/logo/eye.png" className="logo-eye logo-eye-left"/>
            <img src="/logo/eye.png" className="logo-eye logo-eye-right"/>
            <img src="/logo/mouth.png" className="logo-mouth"/>
          </>
        ) : (
          <div
            className="logo-face-wrapper"
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
          >
            {/* CLOUD BODY */}
            <motion.img 
              src="/logo/cloud.png" 
              className="logo-cloud"
              draggable="false"
              animate={isHolding ? {
                // EXCITED WIGGLE
                scaleX: [1, 1.15, 0.85, 1.2, 0.9, 1.1],
                scaleY: [1, 0.95, 1.1, 0.9, 1.05, 1],
                rotate: [0, 8, -8, 10, -10, 5, -5, 0]       // Rapid back-and-forth rotation
              } : {
                // IDLE: Gentle floating animation
                y: [0, -4, 0],
                scaleX: [1, 1.05, 0.98, 1],
                scaleY: [1, 0.98, 1.05, 1],
                rotate: [0, 2, -2, 2, 0]
              }}
              transition={isHolding ? {
                duration: 0.8,          // Fast wiggle loop
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              } : {
                duration: 5,            // Slow gentle float
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
            
            {/* LEFT EYE */}
            <motion.img 
              src="/logo/eye.png" 
              className="logo-eye logo-eye-left"
              draggable="false"
              style={{
                // Eye tracking: uses hover transform, otherwise uses direct motion value
                x: isHovered ? leftEyeTransformX : 0,
                y: isHovered ? leftEyeY : 0
              }}
              animate={isHolding ? {
                scaleY: 0  // Blink shut in 0.15s before wink appears
              } : {
                // IDLE: Gentle floating animation synced with cloud
                y: [0, -4, 0],
                scaleY: [1, 0.98, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={isHolding ? {
                duration: 0.15  // Quick blink before wink shows
              } : {
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
            
            {/* RIGHT EYE */}
            <motion.img 
              src="/logo/eye.png" 
              className="logo-eye logo-eye-right"
              draggable="false"
              style={{
                // Eye tracking: uses hover transform, otherwise uses direct motion value
                x: isHovered ? rightEyeTransformX : 0,
                y: isHovered ? rightEyeY : 0
              }}
              animate={isHolding ? {
                scaleY: 0  // Blink shut in 0.15s before wink appears
              } : {
                // IDLE: Gentle floating animation (slightly different from left eye)
                y: [0, -4, 0],
                scaleY: [1, 1.05, 0.98, 1],
                rotate: [0, -2, 2, 0]
              }}
              transition={isHolding ? {
                duration: 0.15  // Quick blink before wink shows
              } : {
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
            
            {/* WINK EYES */}
            {isHolding && (
              <>
                {/* LEFT WINK */}
                <motion.img
                  src="/logo/wink.png"
                  className="wink-eye wink-eye-left"
                  draggable="false"
                  initial={{ opacity: 0, scale: 0.8, scaleX: -0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    scaleX: -1,  // Flip horizontally for left eye
                    rotate: [0, 2, -2, 2, -2, 0]  // Playful wiggle
                  }}
                  transition={{ 
                    opacity: { duration: 0.1, delay: 0.15 },      // Fade in after blink
                    scale: { duration: 0.3, delay: 0.15, type: "spring", stiffness: 300 },  // Bounce in
                    scaleX: { duration: 0.3, delay: 0.15, type: "spring", stiffness: 300 },
                    rotate: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.45 }  // Start wiggling after bounce
                  }}
                />
                {/* RIGHT WINK */}
                <motion.img
                  src="/logo/wink.png"
                  className="wink-eye wink-eye-right"
                  draggable="false"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: [0, -2, 2, -2, 2, 0]  // Playful wiggle (opposite direction)
                  }}
                  transition={{ 
                    opacity: { duration: 0.1, delay: 0.15 },
                    scale: { duration: 0.3, delay: 0.15, type: "spring", stiffness: 300 },
                    rotate: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.45 }
                  }}
                />
              </>
            )}
            
            {/* MOUTH */}
            <motion.img 
              src="/logo/mouth.png" 
              className="logo-mouth"
              draggable="false"
              animate={isHolding ? {
                // EXCITED WIGGLE: Same values as cloud for synchronized movement
                scaleX: [1, 1.15, 0.85, 1.2, 0.9, 1.1],
                scaleY: [1, 0.95, 1.1, 0.9, 1.05, 1],
                rotate: [0, 8, -8, 10, -10, 5, -5, 0]
              } : {
                // IDLE: Gentle floating synced with cloud
                y: [0, -4, 0],
                scaleY: [1, 0.98, 1.05, 1],
                rotate: [0, 2, -2, 2, 0]
              }}
              transition={isHolding ? {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              } : {
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
            
            {/* ==================================================
                LAYER 6: FLOATING HEARTS PARTICLE EFFECT
                Hearts drift upward from different positions
                - Staggered delays for cascading effect
                - Different trajectories (left/center/right drift)
                - Fade in/out with scale animation
                ================================================== */}
            {isHolding && (
              <>
                {HEART_CONFIGS.map((config, i) => (
                  <motion.div
                    key={i}
                    className="floating-heart"
                    style={{ left: config.left }}
                    initial={{ opacity: 0, y: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],            // Fade in → stay visible → fade out
                      y: config.y,                      // Float upward distance
                      scale: [0.5, 1, 1, 0.8],          // Grow → shrink slightly at end
                      x: config.x                       // Drift left/right/center
                    }}
                    transition={{ 
                      duration: config.duration,
                      delay: config.delay,              // Staggered start times
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    {config.emoji}
                  </motion.div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
