/**
 * WeeklyGallery Component
 * =======================
 * An interactive image carousel showcasing past weekly macaron box specials.
 * Allows customers to browse through previous offerings with multiple views per box (box view, side view, top view).
 * 
 * Navigation:
 * - Left/Right arrows to change between weeks
 * - Dot indicators to jump to specific week
 * - Auto-cycles through multiple photos of current box (5 second intervals)
 */

// DEPENDENCIES
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weeklySpecials, getLatestSpecialIndex } from "../../config/weeklySpecials";

/**
 * WeeklyGallery Component Implementation
 * ======================================
 * Manages a two-level carousel:
 * 1. Primary level: Navigate between different weekly boxes
 * 2. Secondary level: Auto-rotate through photos of current box
 * 
 * Data Source:
 * - Uses weeklySpecials from shared config (auto-updates when new specials are added)
 * - Starts at the latest weekly special (highest id)
 * 
 * State Management:
 * - currentIndex: Tracks which weekly box is displayed
 * - currentImageIndex: Tracks which photo of current box is shown
 * - direction: Tracks swipe direction (1 = right, -1 = left) for animations
 * 
 * Navigation Functions:
 * - nextSlide(): Move to next weekly box, reset to first photo
 * - prevSlide(): Move to previous weekly box, reset to first photo
 * - goToSlide(index): Jump to specific weekly box via dot indicator
 * 
 * Auto-Rotation:
 * - useEffect with setInterval cycles through photos every 5 seconds
 * - Resets when currentIndex changes (new weekly box selected)
 * - Cleans up interval on unmount or index change
 */
const WeeklyGallery = () => {
  // State: Index of currently displayed weekly box (starts at latest)
  const [currentIndex, setCurrentIndex] = useState(getLatestSpecialIndex);
  
  // State: Index of current photo within the selected weekly box
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State: Direction of slide animation (1 = right, -1 = left)
  const [direction, setDirection] = useState(1);

  // Function: Move to next weekly box
  const nextSlide = () => {
    setDirection(1); // Set animation direction to right
    // Increment index with wrap-around using modulo
    setCurrentIndex((prev) => (prev + 1) % weeklySpecials.length);
    setCurrentImageIndex(0); // Reset to first image of new box
  };

  // Function: Move to previous weekly box
  const prevSlide = () => {
    setDirection(-1); // Set animation direction to left
    // Decrement index with wrap-around (add length to avoid negative)
    setCurrentIndex((prev) => (prev - 1 + weeklySpecials.length) % weeklySpecials.length);
    setCurrentImageIndex(0); // Reset to first image of new box
  };

  // Function: Jump to specific weekly box via dot navigation
  const goToSlide = (index: number) => {
    // Determine direction based on target vs current position
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index); // Set to target index
    setCurrentImageIndex(0); // Reset to first image
  };

  // Effect: Auto-scroll through images of current weekly box
  useEffect(() => {
    // Set up interval to change image every 5 seconds
    const interval = setInterval(() => {
      // Cycle through images with wrap-around
      setCurrentImageIndex((prev) => (prev + 1) % weeklySpecials[currentIndex].images.length);
    }, 5000); // 5 second delay

    // Cleanup: Clear interval when component unmounts or currentIndex changes
    return () => clearInterval(interval);
  }, [currentIndex]); // Re-run effect when weekly box changes

  return (
    <section className="weekly-gallery-section">
      {/* Section title */}
      <h2 className="text-center">Weekly Flavour Gallery</h2>
      {/* Subtitle */}
      <p className="text-center weekly-gallery-subtitle">
        Explore our past weekly flavour boxes
      </p>

      {/* Main gallery container with navigation */}
      <div className="weekly-gallery-container">
        {/* Left arrow button for previous weekly box */}
        <button
          className="gallery-arrow gallery-arrow-left"
          onClick={prevSlide}
          aria-label="Previous image"
        >
          ❮
        </button>

        {/* GALLERY IMAGE DISPLAY */}
        <div className="gallery-image-wrapper">
          {/* AnimatePresence enables exit animations when content changes */}
          <AnimatePresence mode="wait"> {/* Wait for exit animation before entering new content */}
            {/* Outer motion div: Animates weekly box transitions */}
            <motion.div
              key={currentIndex}
              // Initial state: Off-screen with blur
              initial={{ opacity: 0, x: 100 * direction, filter: "blur(10px) brightness(1.3)" }}
              // Animate to: Centered, clear, normal brightness
              animate={{ opacity: 1, x: 0, filter: "blur(0px) brightness(1)" }}
              // Exit state: Off-screen opposite direction with blur
              exit={{ opacity: 0, x: -100 * direction, filter: "blur(10px) brightness(1.3)" }}
              transition={{ duration: 0.3 }}
              className="gallery-image-content"
            >
              {/* Container for the actual image */}
              <div className="gallery-image-container">
                {/* AnimatePresence: Handles photo cycling within same weekly box */}
                <AnimatePresence mode="wait">
                  {/* Inner motion.img: Animates between different views of same box */}
                  <motion.img
                    key={currentImageIndex}
                    src={weeklySpecials[currentIndex].images[currentImageIndex]}
                    className="gallery-image"
                    loading="lazy"
                    // Fade transition with blur effect
                    initial={{ opacity: 0, filter: "blur(10px) brightness(1.3)" }}
                    animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
                    exit={{ opacity: 0, filter: "blur(10px) brightness(1.3)" }}
                    transition={{ duration: 1 }} 
                  />
                </AnimatePresence>
              </div>
              
              {/* Caption area showing week flavours and image counter */}
              <div className="gallery-caption">
                {/* Weekly box flavours */}
                <h3>{weeklySpecials[currentIndex].flavours.join(", ")}</h3>
                {/* Image counter showing current view */}
                <p className="image-counter">
                  Image {currentImageIndex + 1} of {weeklySpecials[currentIndex].images.length}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow button for next weekly box */}
        <button
          className="gallery-arrow gallery-arrow-right"
          onClick={nextSlide}
          aria-label="Next image"
        >
          ❯
        </button>
      </div>

      {/* Dot indicators for quick navigation */}
      <div className="gallery-dots">
        {/* Map through weekly boxes to create dot for each */}
        {weeklySpecials.map((_, index) => (
          <button
            key={index}
            // Add 'active' class to currently displayed box's dot
            className={`gallery-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default WeeklyGallery;
