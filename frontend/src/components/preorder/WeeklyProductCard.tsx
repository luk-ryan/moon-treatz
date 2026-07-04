/**
 * WeeklyProductCard
 * =================
 * Product card for the Weekly Special Box on the cart step.
 *
 * Available state:  shows the LIMITED TIME badge + quantity Stepper.
 * Unavailable state: shows a CLOSED badge + live countdown (or static label if no release date is set).
 */

import CountdownTimer from "../CountdownTimer";
import Stepper from "./primitives/Stepper";
import { getTimeUntilNextRelease } from "../../config/preOrderForm";
import { motion } from "framer-motion";

interface WeeklyProductCardProps {
  isAvailable: boolean;
  qty: number;
  onChange: (n: number) => void;
  flavours: string[];
}

const WeeklyProductCard = ({ isAvailable, qty, onChange, flavours }: WeeklyProductCardProps) => {
  // desc: if the weekly special config has flavours listed, show them;
  // otherwise fall back to a generic label so the card is never blank.
  const desc = flavours.length > 0 ? `7 macarons · ${flavours.join(", ")}` : "7 macarons · Weekly Special";
  if (isAvailable) {
    return (
      <div className={`preorder-product-card${qty > 0 ? " preorder-card-active" : ""}`}>
        <motion.div
          className="limited-time-badge-wrap"
          aria-label="Limited time offer"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 8 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.2 }}
        >
          <div className="limited-time-badge">
            <span>LIMITED</span>
            <span>TIME</span>
          </div>
        </motion.div>
        <div className="preorder-product-img-wrap">
          <img src="/form/WeeklyBox2.jpg" alt="Weekly Special Box" className="preorder-product-img" />
        </div>
        <div className="preorder-product-card-body">
          <div className="preorder-product-info">
            <span className="preorder-product-name">Weekly Special Box</span>
            <span className="preorder-product-price">
              $12 <span className="preorder-product-per">/ box</span>
            </span>
            <span className="preorder-product-desc">{desc}</span>
          </div>
          {/* max=100: effectively unlimited */}
          <Stepper value={qty} min={0} max={100} onChange={onChange} />
        </div>
      </div>
    );
  }

  return (
    <div className="preorder-product-card preorder-product-card-unavailable">
      <span className="preorder-unavailable-badge">UNAVAILABLE</span>
      <div className="preorder-product-img-wrap preorder-product-img-wrap--unavailable">
        <img src="/form/WeeklyBox2.jpg" alt="Weekly Special Box" className="preorder-product-img" />
      </div>
      <div className="preorder-product-card-body">
        <div className="preorder-product-info">
          <span className="preorder-product-name">Weekly Special Box</span>
          <span className="preorder-product-price">
            $12 <span className="preorder-product-per">/ box</span>
          </span>
          <span className="preorder-product-desc">{desc}</span>
        </div>
        {/* Show a live countdown if the next release is in the future, otherwise a static label */}
        <div className="preorder-weekly-unavailable">
          {getTimeUntilNextRelease().total > 0 ? (
            <>
              <span className="preorder-weekly-unavailable-label">Opens in</span>
              <CountdownTimer />
            </>
          ) : (
            <span className="preorder-weekly-unavailable-label">Currently unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyProductCard;
