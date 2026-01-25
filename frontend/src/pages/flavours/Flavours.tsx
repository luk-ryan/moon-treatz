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
 * - URL hash support (#all) for direct linking to All Flavours view
 * 
 * View Modes:
 * 1. Weekly Specials: Image gallery of past weekly box offerings
 * 2. All Flavours: Complete catalogue with individual flavour cards
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import FlavourCard from "./FlavourCard";
import WeeklyGallery from "./WeeklyGallery";
import type { FlavourCardProps } from "../../types/types";
import { pageTransition, viewModeTransition } from "../../config/animations";
import { macaronDecorations } from "../../config/macaronDecorations";

/**
 * Flavours Data Configuration
 * ===========================
 * Complete array of all available macaron flavours with their descriptions and images.
 * 
 * Each flavour includes:
 * - Unique ID for filtering and React keys
 * - Display name
 * - Image path
 * - Detailed description of shells and filling
 * 
 * Note: Some flavours are commented out (Coffee, Strawberry, Lemon) as they are currently unavailable.
 * 
 * @constant {FlavourCardProps[]} flavours
 */
const flavours: FlavourCardProps[] = [
  {
    id: 1,
    name: "Vanilla",
    src: "/flavours/vanilla.jpg",
    description: "Blue macaron shells filled with a smooth vanilla French meringue buttercream.",
  },
  {
    id: 2,
    name: "Chocolate",
    src: "/flavours/chocolate.jpg",
    description: "Chocolate-flavoured shells filled with a rich, dark chocolate ganache.",
  },
  {
    id: 3,
    name: "Matcha",
    src: "/flavours/matcha.jpg",
    description: "Matcha-flavoured shells filled with a white chocolate, matcha buttercream.",
  },
  {
    id: 4,
    name: "Cookies and Cream",
    src: "/flavours/cookies_and_cream.jpg",
    description: "Oreo-inspired macaron shells filled with creamy Oreo buttercream and Oreo pieces.",
  },
  {
    id: 5,
    name: "Salted Caramel",
    src: "/flavours/salted_caramel.jpg",
    description: "Classic macaron shells filled with salted caramel buttercream filling and a caramel centre.",
  },
  {
    id: 6,
    name: "Red Velvet",
    src: "/flavours/red_velvet.jpg",
    description: "Light chocolate shells with a red tint filled with tangy-sweet cream cheese buttercream filling.",
  },
  // {
  //   id: 3,
  //   name: "Coffee",
  //   src: "/flavours/unavailable.jpg",
  //   description: "Coffee Flavour description",
  // },
  // {
  //   id: 7,
  //   name: "Strawberry",
  //   src: "/flavours/unavailable.jpg",
  //   description: "Strawberry Flavour description",
  // },
  // {
  //   id: 8,
  //   name: "Lemon",
  //   src: "/flavours/unavailable.jpg",
  //   description: "Lemon Flavour description",
  // },
];

/**
 * Flavours Component Implementation
 * =================================
 * State Management:
 * - viewMode: Controls whether showing "weekly" gallery or "all" flavours
 * - selectedFlavourId: Tracks which flavour filter is active (null = show all)
 * 
 * URL Hash Support:
 * - Checks for #all hash on mount and route changes
 * - Automatically switches to "all" view if hash is present
 * 
 * Layout Adaptation:
 * - Wide wrapper when showing all flavours (grid layout)
 * - Regular wrapper when showing single flavour (larger display)
 * 
 * Components Rendered:
 * 1. Animated macaron decorations (background)
 * 2. View mode selector (Weekly Specials | All Flavours)
 * 3. Conditional content based on view mode:
 *    - WeeklyGallery component for weekly view
 *    - Flavour filter buttons + FlavourCard grid for all view
 */
const Flavours = () => {
  // Get current location from React Router for hash detection
  const location = useLocation();
  
  // State for controlling which view mode is active (weekly gallery or all flavours)
  const [viewMode, setViewMode] = useState<"weekly" | "all">("weekly");
  
  // State for tracking which flavour is selected for filtering (null = show all)
  const [selectedFlavourId, setSelectedFlavourId] = useState<number | null>(
    null
  );

  // Effect to check for #all hash in URL and switch to all flavours view
  useEffect(() => {
    // If URL has #all hash, automatically switch to all flavours view
    if (location.hash === "#all") {
      setViewMode("all");
    }
  }, [location]); // Re-run when location changes

  // Determine which flavours to display based on filter selection
  const flavoursToShow =
    selectedFlavourId === null // If no filter selected
      ? flavours // Show all flavours
      : flavours.filter((f) => f.id === selectedFlavourId); // Show only selected flavour

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
          animate={macaron.animate}
          transition={macaron.transition}
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
            {/* Filter buttons for selecting specific flavours */}
            <div className="flavour-selection narrow-wrapper">
        {/* Show All button - clears filter */}
        <button
          onClick={() => setSelectedFlavourId(null)}
          className={selectedFlavourId === null ? "active" : ""}
        >
          Show All
        </button>
        {/* Individual flavour filter buttons */}
        {flavours.map((flavour) => (
          <button
            key={flavour.id}
            onClick={() => setSelectedFlavourId(flavour.id)}
            className={selectedFlavourId === flavour.id ? "active" : ""}
          >
            {flavour.name}
          </button>
        ))}
            </div>

            {/* Nested AnimatePresence for smooth transitions when filtering flavours */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlavourId ?? "all-flavours"} // Key changes when filter changes, triggering animation
                {...viewModeTransition} // Pre-configured animation settings
                className={selectedFlavourId === null ? "wide-wrapper" : "wrapper"} // wide-wrapper = grid (all flavours), wrapper = single item (one flavour)
              >
                {/* Flavour card grid - displays filtered results */}
                <div className="flavour-card-list">
                  {flavoursToShow.map((flavour) => (
                    <FlavourCard key={flavour.id} {...flavour} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Flavours;
