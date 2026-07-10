/**
 * SpecialtyGallery Component
 * ==========================
 * Carousel gallery for decorative/specialty flavour photos.
 * Reuses the WeeklyGallery visual shell (arrows, corners, nameplate, dots, bottom strip)
 * with specialty-specific styling overrides (specialty-nameplate, specialty-caption).
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { specialtyFlavours } from "../../config/specialtyFlavours";

const SpecialtyGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrentIndex(i => (i - 1 + specialtyFlavours.length) % specialtyFlavours.length);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex(i => (i + 1) % specialtyFlavours.length);
  };

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const current = specialtyFlavours[currentIndex];

  return (
    <section className="weekly-gallery-section specialty-gallery-section">

      <div className="weekly-gallery-container">
        <button className="gallery-arrow gallery-arrow-left" onClick={prev} aria-label="Previous">❮</button>

        <div className="gallery-image-wrapper">
          {/* Nameplate */}
          <div className="gallery-nameplate specialty-nameplate">
            <span className="fmh-diamond">✧</span>
            <span className="gallery-nameplate-title">Specialty Flavours</span>
            <span className="fmh-diamond">✧</span>
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
                <img src={current.src} alt={current.name} className="gallery-image" loading="lazy" decoding="async" />
              </div>

              <div className="gallery-caption specialty-caption">
                <h3>{current.name}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="gallery-bottom-strip">
            {currentIndex + 1} / {specialtyFlavours.length}
          </div>
        </div>

        <button className="gallery-arrow gallery-arrow-right" onClick={next} aria-label="Next">❯</button>
      </div>

      <div className="gallery-dots">
        {specialtyFlavours.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot${i === currentIndex ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${specialtyFlavours[i].name}`}
          />
        ))}
      </div>
    </section>
  );
};

export default SpecialtyGallery;

