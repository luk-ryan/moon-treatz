/**
 * ClassicFlavours Component
 * =========================
 * Classic flavour catalogue tab: a restaurant-menu quick-jump list always shown
 * above a Gallery/List toggle — Gallery is a carousel, List is either the full
 * card grid ("Show All") or a single selected flavour card with page-flip nav.
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlavourCard from "./FlavourCard";
import { flavours } from "../../config/flavours";
import { useFlavourSelection } from "../../hooks/useFlavourSelection";

type ClassicFlavoursProps = {
  // Notifies the parent whenever the background macarons should scatter close-in —
  // true in Gallery mode, or when a single flavour is selected in List mode.
  onScatterChange?: (shouldScatter: boolean) => void;
};

const ClassicFlavours = ({ onScatterChange }: ClassicFlavoursProps) => {
  // "list" = menu + card grid (default), "gallery" = carousel
  const [classicViewMode, setClassicViewMode] = useState<"gallery" | "list">("list");
  const [classicIndex, setClassicIndex] = useState(0);
  const [classicDirection, setClassicDirection] = useState(1);

  const classicPrev = () => {
    setClassicDirection(-1);
    setClassicIndex(i => (i - 1 + flavours.length) % flavours.length);
  };
  const classicNext = () => {
    setClassicDirection(1);
    setClassicIndex(i => (i + 1) % flavours.length);
  };
  const classicGoTo = (index: number) => {
    setClassicDirection(index > classicIndex ? 1 : -1);
    setClassicIndex(index);
  };
  const currentClassicFlavour = flavours[classicIndex];

  // Menu filter state (selected flavour / "Show All", scroll-to-content, pagination)
  const {
    selectedIndex: selectedFlavourIndex,
    select: selectFlavour,
    itemsToShow: flavoursToShow,
    contentRef: classicContentRef,
    hasPrev,
    hasNext,
    goPrev,
    goNext,
  } = useFlavourSelection(flavours);

  useEffect(() => {
    onScatterChange?.(classicViewMode === "gallery" || selectedFlavourIndex !== null);
  }, [classicViewMode, selectedFlavourIndex, onScatterChange]);

  return (
    <>
      {/* Restaurant-style menu — always shown above the gallery/list toggle */}
      <div className="flavour-menu-box narrow-wrapper">
        <div className="flavour-menu-header">
          <span className="fmh-diamond">✦</span>
          <span className="fmh-text">Classic Flavours</span>
          <span className="fmh-diamond">✦</span>
        </div>
        <div className="fmc-corner fmc-corner--tl" />
        <div className="fmc-corner fmc-corner--tr" />
        <div className="fmc-corner fmc-corner--bl" />
        <div className="fmc-corner fmc-corner--br" />
        <div className="flavour-menu-list">
          <button
            onClick={() => selectFlavour(null)}
            className={`flavour-menu-item flavour-menu-item--show-all${selectedFlavourIndex === null ? " flavour-menu-item--active" : ""}`}
          >
            <span className="fmi-diamond">◆</span>
            <span className="fmi-name">Show All</span>
          </button>
          {flavours.map((flavour, i) => (
            <motion.button
              key={flavour.id}
              onClick={() => { selectFlavour(i); classicGoTo(i); }}
              className={`flavour-menu-item${selectedFlavourIndex === i ? " flavour-menu-item--active" : ""}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <span className="fmi-diamond">◆</span>
              <span className="fmi-name">{flavour.name}</span>
              <span className="fmi-dots" aria-hidden="true"/>
              <span className="fmi-num">{String(i + 1).padStart(2, "0")}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gallery / List Toggle */}
      <div ref={classicContentRef} className={`gallery-view-toggle narrow-wrapper${classicViewMode === "list" && selectedFlavourIndex !== null ? " gallery-view-toggle--single" : ""}`}>
        <span className={`gallery-view-toggle-label${classicViewMode === "gallery" ? " active" : ""}`}>Gallery</span>
        <button
          type="button"
          role="switch"
          aria-checked={classicViewMode === "list"}
          aria-label="Toggle between gallery and list view"
          className={`gallery-view-switch${classicViewMode === "list" ? " on" : ""}`}
          onClick={() => setClassicViewMode(classicViewMode === "gallery" ? "list" : "gallery")}
        >
          <span className="gallery-view-switch-knob" />
        </button>
        <span className={`gallery-view-toggle-label${classicViewMode === "list" ? " active" : ""}`}>List</span>
      </div>

      {classicViewMode === "gallery" ? (
        <>
          <div className="weekly-gallery-container classic-gallery-active">
            <button className="gallery-arrow gallery-arrow-left" onClick={classicPrev} aria-label="Previous">❮</button>

            <div className="gallery-image-wrapper">
              {/* Carousel Nameplate */}
              <div className="gallery-nameplate">
                <span className="fmh-diamond">✦</span>
                <span className="gallery-nameplate-title">Classic Flavours</span>
                <span className="fmh-diamond">✦</span>
              </div>

              {/* Gallery Corners */}
              <div className="gallery-corner-tl"></div>
              <div className="gallery-corner-tr"></div>
              <div className="gallery-corner-bl"></div>
              <div className="gallery-corner-br"></div>

              {/* Carousel Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={classicIndex}
                  initial={{ opacity: 0, x: 100 * classicDirection, filter: "blur(10px) brightness(1.3)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px) brightness(1)" }}
                  exit={{ opacity: 0, x: -100 * classicDirection, filter: "blur(10px) brightness(1.3)" }}
                  transition={{ duration: 0.3 }}
                  className="gallery-image-content"
                >
                  <div className="gallery-image-container">
                    <img src={currentClassicFlavour.carouselSrc ?? currentClassicFlavour.src} alt={currentClassicFlavour.name} className="gallery-image" loading="lazy" decoding="async" />
                  </div>

                  {/* Flavour Title (top-left) */}
                  <div className="classic-title-topleft">
                    <h3>{currentClassicFlavour.name}</h3>
                  </div>

                  {/* Flavour Description */}
                  <div className="gallery-caption classic-caption">
                    <p>{currentClassicFlavour.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Image Counter */}
              <div className="gallery-bottom-strip">
                {classicIndex + 1} / {flavours.length}
              </div>
            </div>

            <button className="gallery-arrow gallery-arrow-right" onClick={classicNext} aria-label="Next">❯</button>
          </div>

          {/* Navigation Dots */}
          <div className="gallery-dots">
            {flavours.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot${i === classicIndex ? " active" : ""}`}
                onClick={() => classicGoTo(i)}
                aria-label={`Go to ${flavours[i].name}`}
              />
            ))}
          </div>
        </>
      ) : (
        /* Nested AnimatePresence for smooth transitions when filtering flavours */
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFlavourIndex ?? "classic-flavours"}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className={selectedFlavourIndex === null ? "wide-wrapper" : "wrapper"}
          >
            {/* Flavour card grid */}
            <div className="flavour-card-list">
              {flavoursToShow.map((flavour) => (
                <FlavourCard key={flavour.id} {...flavour} />
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
                  <span className="page-btn-label">{hasPrev ? flavours[selectedFlavourIndex - 1].name : "–"}</span>
                </button>
                <div className="flavour-page-indicator">
                  <span className="page-num">{selectedFlavourIndex + 1}</span>
                  <span className="page-sep">of</span>
                  <span className="page-total">{flavours.length}</span>
                </div>
                <button
                  className="flavour-page-btn flavour-page-btn--next"
                  onClick={goNext}
                  disabled={!hasNext}
                >
                  <span className="page-btn-label">{hasNext ? flavours[selectedFlavourIndex + 1].name : "–"}</span>
                  <span className="page-btn-arrow">❯</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default ClassicFlavours;
