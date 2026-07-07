/**
 * HomeDecorations Component
 * =========================
 * Renders all decorative animated elements that appear on the home page:
 * butterflies (left + right trails), floating clouds, and celestial sparkles.
 *
 * All decoration configs (positions, keyframes, delays) live in:
 *   - src/config/butterflyDecorations.ts
 *   - src/config/cloudDecorations.ts
 *   - src/config/sparkleDecorations.ts
 */

import { motion } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
import { butterflyEntrance, butterflyTransition } from "../../config/animations";
import {leftButterflies, rightButterflies, butterflyYValues, butterflyScaleX, butterflyRotate, type ButterflyDecor}
    from "../decorations/butterflyDecorations";
import { cloudDecorations, type CloudDecor } from "../decorations/cloudDecorations";
import { sparkleDecorations, type SparkleDecor } from "../decorations/sparkleDecorations";

const HomeDecorations = () => {
  // Disable animations on mobile — static spans only
  const isMobile = useIsMobile();

  return (
    <>
      {/* LEFT BUTTERFLY TRAIL */}
      {leftButterflies.map((butterfly: ButterflyDecor, index: number) =>
        isMobile ? (
          <span key={`left-${index}`} className={`butterfly ${butterfly.className}`}>🦋</span>
        ) : (
          <motion.span
            key={`left-${index}`}
            className={`butterfly ${butterfly.className}`}
            {...butterflyEntrance}
            animate={{
              x: butterfly.xValues,
              y: butterflyYValues,
              scaleX: butterflyScaleX,
              rotate: butterflyRotate,
              transition: butterflyTransition(butterfly.delay),
            }}
          >
            🦋
          </motion.span>
        )
      )}

      {/* RIGHT BUTTERFLY TRAIL */}
      {rightButterflies.map((butterfly: ButterflyDecor, index: number) =>
        isMobile ? (
          <span key={`right-${index}`} className={`butterfly ${butterfly.className}`}>🦋</span>
        ) : (
          <motion.span
            key={`right-${index}`}
            className={`butterfly ${butterfly.className}`}
            {...butterflyEntrance}
            animate={{
              x: butterfly.xValues,
              y: butterflyYValues,
              scaleX: butterflyScaleX,
              rotate: butterflyRotate,
              transition: butterflyTransition(butterfly.delay),
            }}
          >
            🦋
          </motion.span>
        )
      )}

      {/* FLOATING CLOUDS */}
      {cloudDecorations.map((cloud: CloudDecor, index: number) => (
        <motion.img
          key={index}
          src={cloud.src}
          className={cloud.className}
          animate={isMobile ? {} : cloud.animate}
          transition={isMobile ? {} : cloud.transition}
        />
      ))}

      {/* CELESTIAL SPARKLES */}
      {sparkleDecorations.map((sparkle: SparkleDecor, index: number) => (
        <motion.span
          key={index}
          className={sparkle.className}
          animate={isMobile ? {} : sparkle.animate}
          transition={isMobile ? {} : sparkle.transition}
        >
          {sparkle.character}
        </motion.span>
      ))}
    </>
  );
};

export default HomeDecorations;
