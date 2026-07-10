/**
 * Home Page Component
 * ===================
 * The main landing page for Moon Treatz, introducing the business and displaying
 * key information about services, weekly specials, catering menu, and contact details.
 *
 * Page Structure:
 * 1. Introduction section - Business story and overview
 * 2. Weekly Special Box - Current week's macaron flavours
 * 3. Catering Menu - Bulk order options with pricing
 * 4. Contact section - Location and contact information
 */

// DEPENDENCIES
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import Contact from "./Contact";
import WeeklyBox from "./WeeklyBox";
import OrderButton from "../../components/home/OrderButton";
import { pageTransition } from "../../config/animations";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getRandomPolaroids } from "../../config/polaroids";

// Layout slots for the hero polaroid collage.
const POLAROID_SLOTS = [
  { id: "1", rotate: "-14deg", top: "5%",  left: "5%",  dur: 3.8, delay: 0,   scatterX: -250, scatterY: -200, scatterR: -40 },
  { id: "2", rotate: "11deg",  top: "2%",  left: "52%", dur: 4.3, delay: 0.6, scatterX:  150, scatterY: -250, scatterR:  30 },
  { id: "3", rotate: "-7deg",  top: "35%", left: "-2%", dur: 3.5, delay: 1.1, scatterX: -300, scatterY:   80, scatterR: -35 },
  { id: "4", rotate: "15deg",  top: "32%", left: "42%", dur: 4.7, delay: 0.3, scatterX:   80, scatterY: -180, scatterR:  45 },
  { id: "5", rotate: "-11deg", top: "28%", left: "78%", dur: 3.9, delay: 0.9, scatterX:  280, scatterY: -120, scatterR: -25 },
  { id: "6", rotate: "9deg",   top: "62%", left: "8%",  dur: 4.1, delay: 0.5, scatterX: -260, scatterY:  200, scatterR:  20 },
  { id: "7", rotate: "-13deg", top: "60%", left: "50%", dur: 4.5, delay: 1.4, scatterX:   60, scatterY:  250, scatterR: -50 },
  { id: "8", rotate: "6deg",   top: "68%", left: "72%", dur: 4.0, delay: 0.8, scatterX:  240, scatterY:  180, scatterR:  35 },
];

const Home = () => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<string | null>(null);
  const [images, setImages] = useState(() => getRandomPolaroids(8)); // 8 random polaroids, picked fresh on mount
  const [shuffleKey, setShuffleKey] = useState(0);                   // bumping this key re-mounts all cards, triggering entry animations
  const [isShuffling, setIsShuffling] = useState(false);             // true while scatter-out animation is playing
  const [isFloating, setIsFloating] = useState(false);               // false during spring entry, true once cards have landed and idle float begins
  const floatTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // After cards spring into place, hand off to idle float animation.
  // Re-runs whenever new cards mount (shuffleKey changes).
  useEffect(() => {
    if (floatTimer.current) clearTimeout(floatTimer.current);
    floatTimer.current = setTimeout(() => setIsFloating(true), 1500);
    return () => { if (floatTimer.current) clearTimeout(floatTimer.current); };
  }, [shuffleKey]);

  // Merge polaroid layout slot config with the current random image data
  const POLAROIDS = POLAROID_SLOTS.map((slot, i) => ({
    ...slot,
    src: images[i].src,
    caption: images[i].name,
    sub: images[i].description,
  }));

  const activePolaroid = POLAROIDS.find(p => p.id === active) ?? null;

  // Shuffle handler: scatter cards out → swap images → fly new cards in
  const handleShuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setIsFloating(false); // guarantee entry animation plays when new cards mount
    setActive(null);      // close lightbox if open
    setTimeout(() => {
      setImages(getRandomPolaroids(8)); // pick 8 new random images
      setShuffleKey(k => k + 1);        // re-mount all cards so entry animation replays
      setIsShuffling(false);
    }, 580);
  };

  return (
    <motion.div className="wrapper" {...(isMobile ? {} : pageTransition)}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="home-hero">
        <img src="/flavours/weekly_specials/weekly_special_11(box-view).jpg" alt="" className="home-hero-bg" aria-hidden="true" />
        <div className="home-hero-overlay" />
        <div className="home-hero-body">
          <div className="home-hero-text">
            <p className="home-hero-eyebrow">Handcrafted in Vaughan, ON</p>
            <h1 className="home-hero-title">French Macarons<br /><span>Made with Love</span></h1>
            <p className="home-hero-sub">
              Weekly special boxes &amp; custom bulk orders — fresh, flavourful, and made just for you.
            </p>
            <div className="home-hero-actions">
              <OrderButton href="/pre-order">Order Now</OrderButton>
            </div>
          </div>
          <div className="home-hero-img-wrap">
            <div className="hero-collage">
              {!isMobile && (
                <>
                  {/* AnimatePresence mode="sync" lets all cards exit/enter simultaneously */}
                  <AnimatePresence mode="sync">
                    {POLAROIDS.map((p, i) => (
                      <motion.div
                        key={`${p.id}-${shuffleKey}`} // key changes on shuffle → forces re-mount + fresh animation
                        className="hero-polaroid-float"
                        style={{ top: p.top, left: p.left }}
                        // Entry: Drop in from slightly above, tilted and scaled down, then spring to final position.
                        initial={{ opacity: 0, y: -70, scale: 0.75, rotate: parseFloat(p.rotate) - 12 }}
                        animate={isShuffling
                          // Scatter-out (EXIT): fly out to a directional vector with a spin + scale down
                          ? { opacity: 0, x: p.scatterX, y: p.scatterY, rotate: p.scatterR * 2.5, scale: 0.15 }
                          // Drop-in(ENTRY): drop-in → then idle float (controlled by isFloating)
                          : isFloating
                            ? { opacity: 1, x: 0, y: [0, -7, 0], rotate: [parseFloat(p.rotate), parseFloat(p.rotate) + 2, parseFloat(p.rotate)], scale: 1 }
                            : { opacity: 1, x: 0, y: 0, rotate: parseFloat(p.rotate), scale: 1 }
                        }
                        transition={isShuffling
                          ? {
                              // Stagger by index so cards scatter sequentially
                              duration: 0.42,
                              ease: [0.5, 0, 1, 0.6],
                              delay: i * 0.04,
                            }
                          : isFloating
                            ? {
                                // Idle float — infinite gentle bob once in position
                                y:      { duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" },
                              }
                            : {
                                // Spring drop-in — staggered by index, each card placed after the previous
                                opacity: { duration: 0.45, delay: 0.1 + i * 0.07 },
                                x:       { type: "spring", stiffness: 160, damping: 20, delay: 0.1 + i * 0.07 },
                                y:       { type: "spring", stiffness: 140, damping: 16, delay: 0.1 + i * 0.07 },
                                scale:   { type: "spring", stiffness: 180, damping: 18, delay: 0.1 + i * 0.07 },
                                rotate:  { type: "spring", stiffness: 120, damping: 14, delay: 0.1 + i * 0.07 },
                              }
                        }
                      >
                        <motion.div
                          className="hero-polaroid"
                          whileHover={{ scale: 1.15, zIndex: 15 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          onClick={() => !isShuffling && setActive(p.id)}
                        >
                          <div className="hero-polaroid-img">
                            <img src={p.src} alt={p.caption} loading="lazy" decoding="async" />
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Shuffle button */}
                  <motion.button
                    className="hero-collage-shuffle"
                    onClick={handleShuffle}
                    disabled={isShuffling}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    animate={isShuffling ? { opacity: 0.55 } : { opacity: 1 }}
                  >
                    <div className="hero-collage-shuffle-icon">
                      <motion.span
                        animate={isShuffling ? { rotate: 360 } : { rotate: 0 }}
                        transition={isShuffling ? { duration: 0.5, ease: "easeInOut" } : {}}
                        style={{ display: "inline-block" }}
                      >
                        ↻
                      </motion.span>
                    </div>
                    <span className="hero-collage-shuffle-label">
                      {isShuffling ? "Shuffling…" : "Shuffle photos"}
                    </span>
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── POLAROID LIGHTBOX ────────────────────────────────────────────── */}
      {!isMobile && <AnimatePresence>
        {activePolaroid && (
          <motion.div
            className="polaroid-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="polaroid-lightbox-card"
              initial={{ scale: 0.3, rotate: activePolaroid.rotate, opacity: 0 }}
              animate={{ scale: 1,   rotate: "0deg",                opacity: 1 }}
              exit={{    scale: 0.3, rotate: activePolaroid.rotate, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="polaroid-lightbox-img"><img src={activePolaroid.src} alt={activePolaroid.caption} /></div>
              <div className="polaroid-lightbox-caption">
                <p className="polaroid-lightbox-title">{activePolaroid.caption}</p>
                <p className="polaroid-lightbox-sub">{activePolaroid.sub}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>}

      {/* ── ABOUT STRIP ──────────────────────────────────────────────────── */}
      <motion.section
        className="home-about"
        {...(isMobile ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: false, amount: 0.5 }, transition: { duration: 0.7, ease: "easeOut" } })}
      >
        <div className="home-about-inner">
          <motion.div
            className="home-about-col"
            {...(isMobile ? {} : { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: false, amount: 0.5 }, transition: { duration: 0.6, delay: 0.15, ease: "easeOut" } })}
          >
            <p className="home-about-eyebrow">Our Story</p>
            <h2 className="home-about-heading">Made by hand.<br />Made for you.</h2>
          </motion.div>
          <motion.div
            className="home-about-col"
            {...(isMobile ? {} : { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: false, amount: 0.5 }, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } })}
          >
            <p className="home-about-text">
              Hi, I'm <strong>Rachel</strong> — the baker behind MoonTreatz, alongside my brother <strong>Ryan</strong>.
              We're a small <strong>Vaughan-based</strong> business with a big passion for French macarons, dedicated to creating treatz catered toward you.
            </p>
            <p className="home-about-text">
              We offer two options: <strong>weekly special boxes</strong> — 7 assorted macarons, perfect for family &amp; friends —
              and <strong>bulk catering orders</strong>, ideal for larger events. Have a flavour idea? We'd love to hear it and will do our best to accommodate.
            </p>
            <p className="home-about-text">
              As a small business we're always growing, and we truly appreciate your support.
              Feel free to <strong>email or DM us on Instagram</strong> with any questions, preferences, or input!
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── WEEKLY BOX + MENU ────────────────────────────────────────────── */}
      <div className="text-center" id="weekly-special">
        <WeeklyBox />
        <Menu />
      </div>
      <Contact />
    </motion.div>
  );
};

export default Home;
