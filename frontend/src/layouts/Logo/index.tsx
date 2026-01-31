/**
 * Logo Component
 * ==============
 * The animated Moon Treatz logo with interactive features.
 * 
 * Features:
 * 1. Eye tracking that follows mouse cursor upon hover
 * 2. Pet cloud animation on click+hold
 *    - Floating hearts when interacting
 *    - Excited wiggle animation during interaction
 */

// DEPENDENCIES
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./Logo.css";

/**
 * HEARTS ANIMATION CONFIGURATIONS
 * ===============================
 */
const HEART_CONFIGS = [
  { left: '35%', y: -80, x: -30, duration: 1.5, delay: 0, emoji: '❤️' },
  { left: '65%', y: -90, x: 30, duration: 1.8, delay: 0.3, emoji: '💕' },
  { left: '50%', y: -100, x: 0, duration: 2, delay: 0.6, emoji: '❤️' },
];

/**
 * Logo Component Implementation
 * =============================
 * Assembles the logo from five separate image layers:
 * 1. Moon (crescent shape background) - subtle floating animation
 * 2. Cloud (body of the character) - floating + excited wiggle on click
 * 3. Left eye - follows cursor upon hover effect (with wink on click)
 * 4. Right eye - follows cursor upon hover effect (with wink on click)
 * 5. Mouth - synchronized with cloud wiggle animation
 * 6. Floating hearts particle effect on click
 * 
 * Interactive States:
 * 1. isHovered: Eyes follow mouse cursor position
 * 2. isHolding: Triggered on mouse down, shows wink + hearts + excited wiggle
 */
const Logo = () => {
  const isMobile = useIsMobile();
  
  // ================
  // STATE MANAGEMENT
  // ================
  
  /** Tracks if mouse is hovering over logo (enables eye tracking) */
  const [isHovered, setIsHovered] = useState(false);
  
  /** Tracks if mouse button is held down (enables wink + hearts + wiggle) */
  const [isHolding, setIsHolding] = useState(false);
  
  /** Reference to logo container for calculating mouse position relative to center */
  const containerRef = useRef<HTMLDivElement>(null);

  // ===================
  // EYE TRACKING SYSTEM
  // ===================
  
  /** Raw mouse X/Y position (set by mousemove handler) */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /** Smooth animated eye movement (left eye) */
  const leftEyeX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const leftEyeY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  /** Smooth animated eye movement (right eye) */
  const rightEyeX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const rightEyeY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  /**
   * HOVER EFFECT TRANSFORMS
   * =======================
   * - Left eye moves MORE when cursor is on the right (1.5x)
   * - Left eye moves LESS when cursor is on the left (0.7x)
   * - Creates cooler looking effect
   */
  const leftEyeTransformX = useTransform(leftEyeX, (value) => {
    return value > 0 ? value * 1.5 : value * 0.7;
  });
  
  /**
   * HOVER EFFECT TRANSFORMS (Opposite of left eye)
   * ==============================================
   * - Right eye moves MORE when cursor is on the left (1.5x)
   * - Right eye moves LESS when cursor is on the right (0.7x)
   */
  const rightEyeTransformX = useTransform(rightEyeX, (value) => {
    return value < 0 ? value * 1.5 : value * 0.7;
  });

  // ==============
  // EVENT HANDLERS
  // ==============
  
  /* Tracks mouse position and converts to normalized eye movement */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Calculate mouse position relative to logo center
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize to -1 to 1 range
    const deltaX = (event.clientX - centerX) / (rect.width / 2);
    const deltaY = (event.clientY - centerY) / (rect.height / 2);
    
    // Movement limit
    const maxMovement = 4; // Maximum pixel movement for eyes

    // Update motion values for eye positions
    mouseX.set(deltaX * maxMovement);
    mouseY.set(deltaY * maxMovement);
  };

  /* Resets hover state and eye positions when cursor leaves logo */
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };


  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    // Wrap entire logo in Link to make it clickable and navigate to homepage
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
