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

const INTERVAL = 5000; // ms between auto-advancing photos within a box

const WeeklyGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(getLatestSpecialIndex);  // which weekly special is shown
  const [currentImageIndex, setCurrentImageIndex] = useState(0);            // which photo of that special
  const [direction, setDirection] = useState(1);                            // slide direction: 1 = forward, -1 = back
  const [progressKey, setProgressKey] = useState(0);                        // bumped to restart progress bar animation

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % weeklySpecials.length);
    setCurrentImageIndex(0);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + weeklySpecials.length) % weeklySpecials.length);
    setCurrentImageIndex(0);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setCurrentImageIndex(0);
  };

  // Auto-cycle through images of the current special; resets when currentIndex changes
  useEffect(() => {
    setProgressKey(k => k + 1);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % weeklySpecials[currentIndex].images.length;
        setProgressKey(k => k + 1); // restart progress bar for new image
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const special = weeklySpecials[currentIndex];
  const totalImages = special.images.length;

  return (
    <section className="weekly-gallery-section">

      <div className="weekly-gallery-container">
        <button className="gallery-arrow gallery-arrow-left" onClick={prevSlide} aria-label="Previous image">❮</button>

        <div className="gallery-image-wrapper">
          {/* Engraved nameplate */}
          <div className="gallery-nameplate">
            <span className="fmh-diamond">✦</span>
            <span className="gallery-nameplate-title">Flavour Gallery</span>
            <span className="fmh-diamond">✦</span>
          </div>

          <div className="gallery-corner-tl"></div>
          <div className="gallery-corner-tr"></div>
          <div className="gallery-corner-bl"></div>
          <div className="gallery-corner-br"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 * direction, filter: "blur(10px) brightness(1.3)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px) brightness(1)" }}
              exit={{ opacity: 0, x: -100 * direction, filter: "blur(10px) brightness(1.3)" }}
              transition={{ duration: 0.3 }}
              className="gallery-image-content"
            >
              <div className="gallery-image-container">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={special.images[currentImageIndex]}
                    className="gallery-image"
                    loading="lazy"
                    initial={{ opacity: 0, filter: "blur(10px) brightness(1.3)" }}
                    animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
                    exit={{ opacity: 0, filter: "blur(10px) brightness(1.3)" }}
                    transition={{ duration: 1 }}
                  />
                </AnimatePresence>
              </div>

              <div className="gallery-caption">
                <div className="gallery-flavour-pills">
                  {special.flavours.map(f => (
                    <span key={f} className="gallery-flavour-pill">{f}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          {totalImages > 1 && (
            <div className="gallery-progress-track">
              {Array.from({ length: totalImages }).map((_, i) => (
                <div
                  key={i}
                  className={`gallery-progress-seg${i === currentImageIndex ? " gallery-progress-seg--active" : i < currentImageIndex ? " gallery-progress-seg--done" : ""}`}
                >
                  {i === currentImageIndex && (
                    <motion.div
                      key={progressKey}
                      className="gallery-progress-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="gallery-bottom-strip">
            2026 &nbsp;·&nbsp; Image {currentImageIndex + 1} of {totalImages}
          </div>
        </div>

        <button className="gallery-arrow gallery-arrow-right" onClick={nextSlide} aria-label="Next image">❯</button>
      </div>

      <div className="gallery-dots">
        {weeklySpecials.map((_, index) => (
          <button
            key={index}
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

