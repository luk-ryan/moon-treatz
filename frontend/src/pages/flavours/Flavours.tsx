/**
 * Flavours Page Component
 * =======================
 * Tab router for the three flavour views. Each tab is its own lazy-loaded
 * component (WeeklyGallery / SpecialtyFlavours / ClassicFlavours) — this file
 * just switches between them and tracks background macaron decoration state.
 *
 * View Modes:
 * 1. Weekly Specials: Image carousel of past weekly box offerings (WeeklyGallery.tsx)
 * 2. Specialty Flavours: Carousel + list of decorative/specialty flavour shots (SpecialtyFlavours.tsx)
 * 3. Classic Flavours: Menu + carousel/grid catalogue (ClassicFlavours.tsx)
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { pageTransition } from "../../config/animations";
import { macaronDecorations } from "../../components/decorations/macaronDecorations";

// Code-split — only the active tab's gallery ever needs to load.
const WeeklyGallery = lazy(() => import("./WeeklyGallery"));
const SpecialtyFlavours = lazy(() => import("./SpecialtyFlavours"));
const ClassicFlavours = lazy(() => import("./ClassicFlavours"));

/**
 * Flavours Component Implementation
 * =================================
 */
const Flavours = () => {
  // Get current location from React Router for hash detection
  const location = useLocation();
  
  // Check if viewport is mobile (600px or below)
  const isMobile = useIsMobile();
  
  // "weekly" | "specialty" | "classic" — controls which gallery/view is rendered
  const [viewMode, setViewMode] = useState<"weekly" | "classic" | "specialty">("weekly");

  // Tracks whether Specialty/Classic should show the scattered/close-in decorations:
  // true whenever Gallery mode is active, or a single flavour is selected in List mode
  // (vs "Show All") — reported up from each tab's own component.
  const [specialtyHasScatter, setSpecialtyHasScatter] = useState(false);
  const [classicHasScatter, setClassicHasScatter] = useState(false);

  // Effect to check for #classic hash in URL and switch to the classic flavours view
  useEffect(() => {
    // If URL has #classic hash, automatically switch to classic flavours view
    if (location.hash === "#classic") {
      setViewMode("classic");
    }
  }, [location]); // Re-run when location changes

  return (
    // Wrap in motion.div for page transition animation
    <motion.div 
      {...pageTransition} 
      // flavour-selected-active: repositions macarons close-in on desktop, hides them on mobile —
      // applies whenever Gallery mode is active, or a single flavour is selected in List mode.
      className={`${viewMode === "weekly" ? "weekly-view-active" : ""} ${((viewMode === "classic" && classicHasScatter) || (viewMode === "specialty" && specialtyHasScatter)) ? "flavour-selected-active" : ""}`}
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
        <button
          onClick={() => setViewMode("specialty")}
          className={viewMode === "specialty" ? "active" : ""}
        >
          Specialty Flavours
        </button>
        <button
          onClick={() => setViewMode("classic")}
          className={viewMode === "classic" ? "active" : ""}
        >
          Classic Flavours
        </button>
      </div>

      {/* AnimatePresence for smooth transitions when switching between views */}
      {/* mode="wait" makes the exit animation complete before the enter animation starts */}
      <AnimatePresence mode="wait">
        {viewMode === "weekly" ? (
          <motion.div key="weekly" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.4 }}>
            <Suspense fallback={null}>
              <WeeklyGallery />
            </Suspense>
          </motion.div>
        ) : viewMode === "specialty" ? (
          <motion.div key="specialty" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.4 }}>
            <Suspense fallback={null}>
              <SpecialtyFlavours onScatterChange={setSpecialtyHasScatter} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="classic" // Unique key for AnimatePresence tracking
            className="classic-flavours-view"
            initial={{ opacity: 0, y: 50 }} // Start invisible, shifted down
            animate={{ opacity: 1, y: 0 }} // Fade in, slide up to position
            exit={{ opacity: 0, y: -50 }} // Fade out, slide up when leaving
            transition={{ duration: 0.4 }}
          >
            <Suspense fallback={null}>
              <ClassicFlavours onScatterChange={setClassicHasScatter} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Flavours;
