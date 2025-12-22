import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlavourCard from "./FlavourCard";
import type { FlavourCardProps } from "../../types/types";

const flavours: FlavourCardProps[] = [
  {
    id: 1,
    name: "Vanilla",
    src: "/flavours/vanilla.jpg",
    description: "Vanilla Flavour description",
  },
  {
    id: 2,
    name: "Chocolate",
    src: "/flavours/chocolate.jpg",
    description: "Chocolate Flavour description",
  },
  {
    id: 3,
    name: "Coffee",
    src: "/flavours/unavailable.jpg",
    description: "Coffee Flavour description",
  },
  {
    id: 4,
    name: "Matcha",
    src: "/flavours/matcha.jpg",
    description: "Matcha Flavour description",
  },
  {
    id: 5,
    name: "Cookies and Cream",
    src: "/flavours/cookies_and_cream.jpg",
    description: "Cookies and Cream Flavour description",
  },
  {
    id: 6,
    name: "Salted Caramel",
    src: "/flavours/salted_caramel.jpg",
    description: "Salted Caramel Flavour description",
  },
  {
    id: 7,
    name: "Strawberry",
    src: "/flavours/unavailable.jpg",
    description: "Strawberry Flavour description",
  },
  {
    id: 8,
    name: "Lemon",
    src: "/flavours/unavailable.jpg",
    description: "Lemon Flavour description",
  },
];

const Flavours = () => {
  const [selectedFlavourId, setSelectedFlavourId] = useState<number | null>(
    null
  );

  const flavoursToShow =
    selectedFlavourId === null
      ? flavours
      : flavours.filter((f) => f.id === selectedFlavourId);

  return (
    <>
      <div className="flavour-selection narrow-wrapper">
        <button
          onClick={() => setSelectedFlavourId(null)}
          className={selectedFlavourId === null ? "active" : ""}
        >
          Show All
        </button>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFlavourId ?? "all"}
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className={selectedFlavourId === null ? "wide-wrapper" : "wrapper"}
        >
          <div className="flavour-card-list">
            {flavoursToShow.map((flavour) => (
              <FlavourCard {...flavour} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Flavours;
