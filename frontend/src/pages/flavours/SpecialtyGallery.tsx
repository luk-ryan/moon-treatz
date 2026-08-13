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
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel"); // carousel vs scrollable list layout

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

  // Jumps the carousel to a given flavour in carousel view.
  const openInCarousel = (index: number) => {
    goTo(index);
    setViewMode("carousel");
  };

  const current = specialtyFlavours[currentIndex];

  return (
    <section className="weekly-gallery-section specialty-gallery-section">

      {/* Gallery / List Toggle */}
      <div className="gallery-view-toggle">
        <span className={`gallery-view-toggle-label${viewMode === "carousel" ? " active" : ""}`}>Gallery</span>
        <button
          type="button"
          role="switch"
          aria-checked={viewMode === "list"}
          aria-label="Toggle between gallery and list view"
          className={`gallery-view-switch${viewMode === "list" ? " on" : ""}`}
          onClick={() => setViewMode(viewMode === "carousel" ? "list" : "carousel")}
        >
          <span className="gallery-view-switch-knob" />
        </button>
        <span className={`gallery-view-toggle-label${viewMode === "list" ? " active" : ""}`}>List</span>
      </div>

      {viewMode === "list" ? (
        <div className="gallery-list-frame">
          {/* Specialty Flavours Nameplate */}
          <div className="gallery-nameplate specialty-nameplate">
            <span className="fmh-diamond">✧</span>
            <span className="gallery-nameplate-title">Specialty Flavours</span>
            <span className="fmh-diamond">✧</span>
          </div>

          {/* Gallery Corners */}
          <div className="gallery-corner-tl"></div>
          <div className="gallery-corner-tr"></div>
          <div className="gallery-corner-bl"></div>
          <div className="gallery-corner-br"></div>

          {/* Gallery List */}
          <div className="gallery-list">
            {specialtyFlavours.map((f, index) => (
              <button
                key={f.name}
                type="button"
                className="gallery-list-item gallery-list-item--photo"
                onClick={() => openInCarousel(index)}
              >
                <div className="gallery-list-photo-wrap">
                  <img src={f.src} alt="" loading="lazy" className="gallery-list-photo" />
                  <div className="gallery-list-photo-caption">
                    <span className="gallery-list-photo-caption-text">{f.name}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="weekly-gallery-container">
            <button className="gallery-arrow gallery-arrow-left" onClick={prev} aria-label="Previous">❮</button>

            <div className="gallery-image-wrapper">
              {/* Carousel Nameplate */}
              <div className="gallery-nameplate specialty-nameplate">
                <span className="fmh-diamond">✧</span>
                <span className="gallery-nameplate-title">Specialty Flavours</span>
                <span className="fmh-diamond">✧</span>
              </div>

              {/* Gallery Corners */}
              <div className="gallery-corner-tl"></div>
              <div className="gallery-corner-tr"></div>
              <div className="gallery-corner-bl"></div>
              <div className="gallery-corner-br"></div>

              {/* Carousel Image */}
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

                  {/* Flavour Caption */}
                  <div className="gallery-caption specialty-caption">
                    <h3>{current.name}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Image Counter */}
              <div className="gallery-bottom-strip">
                {currentIndex + 1} / {specialtyFlavours.length}
              </div>
            </div>

            <button className="gallery-arrow gallery-arrow-right" onClick={next} aria-label="Next">❯</button>
          </div>

          {/* Navigation Dots */}
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
        </>
      )}
    </section>
  );
};

export default SpecialtyGallery;

