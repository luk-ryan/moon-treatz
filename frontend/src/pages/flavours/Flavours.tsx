import React, { useState } from "react";
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
    src: "/flavours/unavailable.jpg",
    description: "Matcha Flavour description",
  },
  {
    id: 5,
    name: "Cookies and Cream",
    src: "/flavours/unavailable.jpg",
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
  // null means "Show All"
  const [selectedFlavourId, setSelectedFlavourId] = useState<number | null>(
    null
  );

  // Filter which flavors to display cards for
  const flavoursToShow =
    selectedFlavourId === null
      ? flavours
      : flavours.filter((f) => f.id === selectedFlavourId);

  return (
    <div className="wrapper">
      <div>
        <button onClick={() => setSelectedFlavourId(null)}>Show All</button>
        {flavours.map((flavour) => (
          <button
            key={flavour.id}
            onClick={() => setSelectedFlavourId(flavour.id)}
          >
            {flavour.name}
          </button>
        ))}
      </div>

      <div>
        {flavoursToShow.map((flavour) => (
          <FlavourCard
            key={flavour.id}
            id={flavour.id}
            name={flavour.name}
            src={flavour.src}
            description={flavour.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Flavours;
