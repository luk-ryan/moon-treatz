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
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import Contact from "./Contact";
import WeeklyBox from "./WeeklyBox";
import OrderButton from "../../components/home/OrderButton";
import { pageTransition } from "../../config/animations";
import { useIsMobile } from "../../hooks/useIsMobile";

const POLAROIDS = [
  { id: "1",  rotate: "-14deg", top: "5%",   left: "5%",   dur: 3.8, delay: 0,    caption: "Weekly Specials",  sub: "Fresh every two weeks"       },
  { id: "2",  rotate: "11deg",  top: "2%",   left: "52%",  dur: 4.3, delay: 0.6,  caption: "Handcrafted",       sub: "Made with love in Vaughan"  },
  { id: "3",  rotate: "-7deg",  top: "35%",  left: "-2%",  dur: 3.5, delay: 1.1,  caption: "Pistachio Dream",   sub: "One of our fan favourites"  },
  { id: "4",  rotate: "15deg",  top: "32%",  left: "42%",  dur: 4.7, delay: 0.3,  caption: "Cookies & Cream",   sub: "A classic done right"       },
  { id: "5",  rotate: "-11deg", top: "28%",  left: "78%",  dur: 3.9, delay: 0.9,  caption: "Matcha Bliss",      sub: "Earthy, sweet & delicate"   },
  { id: "6",  rotate: "9deg",   top: "62%",  left: "8%",   dur: 4.1, delay: 0.5,  caption: "The Box",           sub: "7 assorted · $12"           },
  { id: "7",  rotate: "-13deg", top: "60%",  left: "50%",  dur: 4.5, delay: 1.4,  caption: "Order Today",       sub: "Forms open Fri – Sun"       },
];

const Home = () => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<string | null>(null);
  const activePolaroid = POLAROIDS.find(p => p.id === active) ?? null;

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
              {!isMobile && POLAROIDS.map((p) => (
                <motion.div
                  key={p.id}
                  className="hero-polaroid-float"
                  style={{ top: p.top, left: p.left, rotate: parseFloat(p.rotate) }}
                  animate={{ y: [0, -7, 0], rotate: [parseFloat(p.rotate), parseFloat(p.rotate) + 2, parseFloat(p.rotate)] }}
                  transition={{
                    y:      { duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <motion.div
                    className="hero-polaroid"
                    whileHover={{ scale: 1.15, zIndex: 15 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => setActive(p.id)}
                  >
                    <div className="hero-polaroid-img">
                      {/* swap span for <img src="..." alt="..." loading="lazy" decoding="async" /> */}
                      <span>📸</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
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
              <div className="polaroid-lightbox-img"><span>📸</span></div>
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
