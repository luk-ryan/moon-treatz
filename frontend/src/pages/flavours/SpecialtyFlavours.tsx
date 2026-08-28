/**
 * SpecialtyFlavours Component
 * ===========================
 * Carousel gallery for decorative/specialty flavour photos.
 * Reuses the WeeklyGallery visual shell (arrows, corners, nameplate, dots, bottom strip)
 * with specialty-specific styling overrides (specialty-nameplate, specialty-caption).
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { specialtyFlavours } from "../../config/specialtyFlavours";
import { useFlavourSelection } from "../../hooks/useFlavourSelection";

type SpecialtyFlavoursProps = {
  // Notifies the parent whenever the background macarons should scatter close-in —
  // true in Gallery mode, or when a single flavour is selected in List mode.
  onScatterChange?: (shouldScatter: boolean) => void;
};

const SpecialtyFlavours = ({ onScatterChange }: SpecialtyFlavoursProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel"); // carousel vs scrollable list layout
  const { selectedIndex: selectedFlavourIndex, select: selectFlavour, itemsToShow: flavoursToShow, contentRef, hasPrev, hasNext, goPrev, goNext } = useFlavourSelection(specialtyFlavours);

  useEffect(() => {
    onScatterChange?.(viewMode === "carousel" || selectedFlavourIndex !== null);
  }, [viewMode, selectedFlavourIndex, onScatterChange]);

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
    <section className={`weekly-gallery-section specialty-gallery-section${viewMode === "list" ? " specialty-list-active" : ""}`}>

      {/* Flavour Quick-Jump Menu — same restaurant-menu treatment as the Classic tab */}
      <div className="flavour-menu-box narrow-wrapper">
        <div className="flavour-menu-header">
          <span className="fmh-diamond">✧</span>
          <span className="fmh-text">Specialty Flavours</span>
          <span className="fmh-diamond">✧</span>
        </div>
        <div className="fmc-corner fmc-corner--tl" />
        <div className="fmc-corner fmc-corner--tr" />
        <div className="fmc-corner fmc-corner--bl" />
        <div className="fmc-corner fmc-corner--br" />
        <div className="flavour-menu-list">
          <button
            onClick={() => selectFlavour(null)}
            className={`flavour-menu-item flavour-menu-item--show-all${viewMode === "list" && selectedFlavourIndex === null ? " flavour-menu-item--active" : ""}`}
          >
            <span className="fmi-diamond">◆</span>
            <span className="fmi-name">Show All</span>
          </button>
          {specialtyFlavours.map((f, i) => (
            <button
              key={f.name}
              onClick={() => { selectFlavour(i); goTo(i); }}
              className={`flavour-menu-item${(viewMode === "carousel" && currentIndex === i) || (viewMode === "list" && selectedFlavourIndex === i) ? " flavour-menu-item--active" : ""}`}
            >
              <span className="fmi-diamond">◆</span>
              <span className="fmi-name">{f.name}</span>
              <span className="fmi-dots" aria-hidden="true" />
              <span className="fmi-num">{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery / List Toggle */}
      <div ref={contentRef} className={`gallery-view-toggle${viewMode === "list" && selectedFlavourIndex !== null ? " gallery-view-toggle--single" : ""}`}>
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
        /* Nested AnimatePresence for smooth transitions when filtering flavours */
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFlavourIndex ?? "specialty-flavours"}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className={selectedFlavourIndex === null ? "wide-wrapper" : "wrapper"}
          >
            <div className="flavour-card-list">
              {flavoursToShow.map((f) => (
                <div key={f.name} className="flavour-card">
                  <h3>{f.name}</h3>
                  <img src={f.src} loading="lazy" alt={f.name} />
                </div>
              ))}
            </div>
            {/* Page-flip navigation — only when a single flavour is selected */}
            {selectedFlavourIndex !== null && (
              <div className="flavour-pagination">
                <button
                  className="flavour-page-btn flavour-page-btn--prev"
                  onClick={goPrev}
                  disabled={!hasPrev}
                >
                  <span className="page-btn-arrow">❮</span>
                  <span className="page-btn-label">{hasPrev ? specialtyFlavours[selectedFlavourIndex - 1].name : "–"}</span>
                </button>
                <div className="flavour-page-indicator">
                  <span className="page-num">{selectedFlavourIndex + 1}</span>
                  <span className="page-sep">of</span>
                  <span className="page-total">{specialtyFlavours.length}</span>
                </div>
                <button
                  className="flavour-page-btn flavour-page-btn--next"
                  onClick={goNext}
                  disabled={!hasNext}
                >
                  <span className="page-btn-label">{hasNext ? specialtyFlavours[selectedFlavourIndex + 1].name : "–"}</span>
                  <span className="page-btn-arrow">❯</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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

export default SpecialtyFlavours;
