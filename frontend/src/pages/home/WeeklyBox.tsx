/**
 * WeeklyBox Component
 * ===================
 * Showcases the current week's special macaron box offering.
 * Automatically displays the latest weekly special from the shared config.
 *
 * Product Details:
 * - Box contains 7 assorted macarons
 * - Three different flavours per box
 * - Price: $12
 * - Flavours change weekly
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getLatestSpecial } from "../../config/weeklySpecials";
import { fadeUp } from "../../config/animations";
import { preOrderOpenDate } from "../../config/preOrderForm";

const latestSpecial = getLatestSpecial();

// Build "Month Day–Day" label from preOrderOpenDate to (preOrderOpenDate + 2 days)
const getPreOrderDate = () => {
  const start = new Date(preOrderOpenDate + "T00:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 2);
  const month = start.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${start.getDate()}–${end.getDate()}`;
};
const preOrderDate = getPreOrderDate();

const WeeklyBox = () => {
  return (
    <div className="weekly-special">

      {/* ── SECTION HEADER ─────────────────────────────────────────── */}
      <motion.div className="ws-header" {...fadeUp(0)}>
        <h1 className="ws-title">Weekly Special</h1>
        <span className="ws-eyebrow">Every Two Weeks</span>
        <div className="ws-title-rule" />
      </motion.div>

      {/* ── CINEMATIC FEATURE CARD ─────────────────────────────────── */}
      <div className="ws-feature">

        {/* LEFT — image + schedule */}
        <motion.div className="ws-img-col" {...fadeUp(0.1)}>
          <div className="ws-img-wrap">
            <img src={latestSpecial.displayImage} alt="Weekly Special Box" loading="lazy" />
            <div className="ws-price-badge">$12</div>
          </div>
          <motion.div className="ws-schedule-block" {...fadeUp(0.55)}>
            <p className="ws-schedule-label">Pickup / Delivery Days</p>
            <div className="ws-schedule-pills">
              {["Thu", "Fri", "Sat"].map(d => (
                <span key={d} className="ws-pill">{d}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — info */}
        <div className="ws-info-col">

          {/* Flavours — staggered bullet reveal */}
          <motion.div className="ws-flavour-block" {...fadeUp(0.2)}>
            <p className="ws-flavour-eyebrow">Last Week's Flavours · {preOrderDate}</p>
            <ul className="ws-flavour-list">
              {latestSpecial.flavours.map((flavour, i) => (
                <motion.li
                  key={flavour}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                >
                  <Link to="/flavours#all">{flavour}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Description */}
          <motion.div className="ws-desc-block" {...fadeUp(0.45)}>
            <p className="ws-desc">
              A box of <strong>7 assorted macarons</strong> with three flavours of our choice,
              released every two weeks. Pre-orders open on{" "}
              <strong>weekends (Fri–Sun)</strong> the week before —
              fill out the form to guarantee your order.
            </p>
            <p className="ws-note ws-note--blue">* Keep refrigerated once received.</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default WeeklyBox;

