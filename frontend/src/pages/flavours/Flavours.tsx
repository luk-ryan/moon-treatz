/**
 * Flavours Page Component
 * =======================
 * The main flavours showcase page displaying all available macaron flavours and a gallery of past weekly specials.
 * 
 * Page Features:
 * - Two view modes: Weekly Specials Gallery and All Flavours
 * - Animated macaron decorations floating in background
 * - Filter system to view specific flavours
 * - Smooth transitions between views and filters
 * 
 * View Modes:
 * 1. Weekly Specials: Image gallery of past weekly box offerings
 * 2. All Flavours: Complete catalogue with individual flavour cards
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import FlavourCard from "./FlavourCard";
import WeeklyGallery from "./WeeklyGallery";
import { pageTransition } from "../../config/animations";
import { flavours } from "../../config/flavours";
import { macaronDecorations } from "../../components/decorations/macaronDecorations";

// Flavour data lives in src/config/flavours.ts — imported above.

/**
 * Flavours Component Implementation
 * =================================
 */
const Flavours = () => {
  // Get current location from React Router for hash detection
  const location = useLocation();
  
  // Check if viewport is mobile (600px or below)
  const isMobile = useIsMobile();
  
  // State for controlling which view mode is active (weekly gallery or all flavours)
  const [viewMode, setViewMode] = useState<"weekly" | "all">("weekly");
  
  // State for tracking which flavour is selected for filtering (null = show all)
  const [selectedFlavourId, setSelectedFlavourId] = useState<number | null>(
    null
  );

  const selectedIndex = selectedFlavourId === null ? -1 : flavours.findIndex(f => f.id === selectedFlavourId);
  const prevFlavour = selectedIndex > 0 ? flavours[selectedIndex - 1] : null;
  const nextFlavour = selectedIndex < flavours.length - 1 ? flavours[selectedIndex + 1] : null;

  // Effect to check for #all hash in URL and switch to all flavours view
  useEffect(() => {
    // If URL has #all hash, automatically switch to all flavours view
    if (location.hash === "#all") {
      setViewMode("all");
    }
  }, [location]); // Re-run when location changes

  // Determine which flavours to display based on filter selection
  const flavoursToShow =
    selectedFlavourId === null
      ? flavours
      : flavours.filter((f) => f.id === selectedFlavourId);

  return (
    // Wrap in motion.div for page transition animation
    <motion.div 
      {...pageTransition} 
      className={`${viewMode === "weekly" ? "weekly-view-active" : ""} ${selectedFlavourId !== null ? "flavour-selected-active" : ""}`}
    >
      {/* Render floating macaron decorations in background */}
      {macaronDecorations.map((macaron, index) => (
        <motion.img
          key={index}
          src={macaron.src}
          className={macaron.className}
          animate={isMobile ? {} : macaron.animate}
          transition={isMobile ? {} : macaron.transition}
          loading="lazy"
        />
      ))}

      {/* Main View Mode Selector */}
      <div className="view-mode-selector narrow-wrapper">
        {/* Weekly Specials button - switches to gallery view */}
        <button
          onClick={() => setViewMode("weekly")}
          className={viewMode === "weekly" ? "active" : ""}
        >
          Weekly Specials
        </button>
        {/* All Flavours button - switches to catalogue view */}
        <button
          onClick={() => setViewMode("all")}
          className={viewMode === "all" ? "active" : ""}
        >
          All Flavours
        </button>
      </div>

      {/* AnimatePresence for smooth transitions when switching between views */}
      {/* mode="wait" makes the exit animation complete before the enter animation starts */}
      <AnimatePresence mode="wait">
        {viewMode === "weekly" ? (
          // Weekly Specials Gallery View
          <motion.div
            key="weekly" // Unique key helps AnimatePresence track this element
            initial={{ opacity: 0, y: 50 }} // Start invisible, shifted down
            animate={{ opacity: 1, y: 0 }} // Fade in, slide up to position
            exit={{ opacity: 0, y: -50 }} // Fade out, slide up when leaving
            transition={{ duration: 0.4 }}
          >
            <WeeklyGallery />
          </motion.div>
        ) : (
          // All Flavours Catalogue View
          <motion.div
            key="all" // Unique key for AnimatePresence tracking
            initial={{ opacity: 0, y: 50 }} // Start invisible, shifted down
            animate={{ opacity: 1, y: 0 }} // Fade in, slide up to position
            exit={{ opacity: 0, y: -50 }} // Fade out, slide up when leaving
            transition={{ duration: 0.4 }}
          >
            {/* Restaurant-style menu */}
            <div className="flavour-menu-box narrow-wrapper">
              <div className="flavour-menu-header">
                <span className="fmh-diamond">✦</span>
                <span className="fmh-text">Our Flavours</span>
                <span className="fmh-diamond">✦</span>
              </div>
              <div className="fmc-corner fmc-corner--tl" />
              <div className="fmc-corner fmc-corner--tr" />
              <div className="fmc-corner fmc-corner--bl" />
              <div className="fmc-corner fmc-corner--br" />
              <div className="flavour-menu-list">
                <button
                  onClick={() => setSelectedFlavourId(null)}
                  className={`flavour-menu-item${selectedFlavourId === null ? " flavour-menu-item--active" : ""}`}
                >
                  <span className="fmi-diamond">◆</span>
                  <span className="fmi-name">Show All</span>
                </button>
                {flavours.map((flavour, i) => (
                  <motion.button
                    key={flavour.id}
                    onClick={() => setSelectedFlavourId(flavour.id)}
                    className={`flavour-menu-item${selectedFlavourId === flavour.id ? " flavour-menu-item--active" : ""}`}
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

            {/* Nested AnimatePresence for smooth transitions when filtering flavours */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlavourId ?? "all-flavours"}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className={selectedFlavourId === null ? "wide-wrapper" : "wrapper"}
              >
                {/* Flavour card grid */}
                <div className="flavour-card-list">
                  {flavoursToShow.map((flavour, i) => (
                    <motion.div
                      key={flavour.id}
                      initial={{ opacity: 0, y: 24, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <FlavourCard key={flavour.id} {...flavour} />
                    </motion.div>
                  ))}
                </div>
                {/* Page-flip navigation — only when a single flavour is selected */}
                {selectedFlavourId !== null && (
                  <div className="flavour-pagination">
                    <button
                      className="flavour-page-btn flavour-page-btn--prev"
                      onClick={() => prevFlavour && setSelectedFlavourId(prevFlavour.id)}
                      disabled={!prevFlavour}
                    >
                      <span className="page-btn-arrow">❮</span>
                      <span className="page-btn-label">{prevFlavour?.name ?? "–"}</span>
                    </button>
                    <div className="flavour-page-indicator">
                      <span className="page-num">{selectedIndex + 1}</span>
                      <span className="page-sep">of</span>
                      <span className="page-total">{flavours.length}</span>
                    </div>
                    <button
                      className="flavour-page-btn flavour-page-btn--next"
                      onClick={() => nextFlavour && setSelectedFlavourId(nextFlavour.id)}
                      disabled={!nextFlavour}
                    >
                      <span className="page-btn-label">{nextFlavour?.name ?? "–"}</span>
                      <span className="page-btn-arrow">❯</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Flavours;
