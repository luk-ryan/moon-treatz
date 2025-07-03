import React, { useState } from "react";
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

      <div className="wide-wrapper">
        <div className="flavour-card-list">
          <AnimatePresence mode="wait">
            {flavoursToShow.map((flavour) => (
              <motion.div
                key={flavour.id}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.7 }}
              >
                <FlavourCard {...flavour} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Flavours;

// import React, { useState } from "react";
// import FlavourCard from "./FlavourCard";
// import type { FlavourCardProps } from "../../types/types";

// const flavours: FlavourCardProps[] = [
//   {
//     id: 1,
//     name: "Vanilla",
//     src: "/flavours/vanilla.jpg",
//     description: "Vanilla Flavour description",
//   },
//   {
//     id: 2,
//     name: "Chocolate",
//     src: "/flavours/chocolate.jpg",
//     description: "Chocolate Flavour description",
//   },
//   {
//     id: 3,
//     name: "Coffee",
//     src: "/flavours/unavailable.jpg",
//     description: "Coffee Flavour description",
//   },
//   {
//     id: 4,
//     name: "Matcha",
//     src: "/flavours/unavailable.jpg",
//     description: "Matcha Flavour description",
//   },
//   {
//     id: 5,
//     name: "Cookies and Cream",
//     src: "/flavours/unavailable.jpg",
//     description: "Cookies and Cream Flavour description",
//   },
//   {
//     id: 6,
//     name: "Salted Caramel",
//     src: "/flavours/salted_caramel.jpg",
//     description: "Salted Caramel Flavour description",
//   },
//   {
//     id: 7,
//     name: "Strawberry",
//     src: "/flavours/unavailable.jpg",
//     description: "Strawberry Flavour description",
//   },
//   {
//     id: 8,
//     name: "Lemon",
//     src: "/flavours/unavailable.jpg",
//     description: "Lemon Flavour description",
//   },
// ];

// const Flavours = () => {
//   // Default to first flavour selected
//   const [selectedFlavourId, setSelectedFlavourId] = useState(flavours[0].id);

//   // Find active index from selectedFlavourId
//   const activeIndex = flavours.findIndex((f) => f.id === selectedFlavourId);

//   return (
//     <div className="wrapper">
//       <div className="flavour-selection narrow-wrapper">
//         {flavours.map((flavour) => (
//           <button
//             key={flavour.id}
//             onClick={() => setSelectedFlavourId(flavour.id)}
//             className={selectedFlavourId === flavour.id ? "active" : ""}
//           >
//             {flavour.name}
//           </button>
//         ))}
//       </div>

//       <div className="flavour-carousel">
//         {flavours.map((flavour, index) => {
//           let position = "next";

//           if (index === activeIndex) position = "active";
//           else if (
//             index === activeIndex - 1 ||
//             (activeIndex === 0 && index === flavours.length - 1)
//           )
//             position = "prev";

//           return (
//             <div key={flavour.id} className={`carousel-item ${position}`}>
//               <FlavourCard
//                 id={flavour.id}
//                 name={flavour.name}
//                 src={flavour.src}
//                 description={flavour.description}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Flavours;
