/**
 * WeeklyProductCard
 * =================
 * Product card for the Weekly Special Box on the cart step.
 *
 * Available state:  shows the LIMITED TIME badge + live countdown to the close cutoff + quantity Stepper.
 * Unavailable state: shows a CLOSED badge, static label.
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
  // Only show specific flavours when the box is available — if it's closed,
  // the flavours may have changed by the time it reopens, so show a generic label instead.
  const availableDesc = flavours.length > 0 ? `7 macarons · ${flavours.join(", ")}` : "7 macarons · Weekly Special";
  const desc = isAvailable ? availableDesc : "7 macarons · Weekly Special";
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
          <div className="preorder-product-action">
            {/* Show a live countdown to the close cutoff while orders are still open */}
            {getTimeUntilNextRelease().total > 0 && (
              <div className="preorder-weekly-available">
                <span className="preorder-weekly-available-label">Closes in</span>
                <CountdownTimer />
              </div>
            )}
            {/* max=100: effectively unlimited */}
            <Stepper value={qty} min={0} max={100} onChange={onChange} />
          </div>
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
        {/* No automatic reopen date once closed, so just show a static label */}
        <div className="preorder-weekly-unavailable">
          <span className="preorder-weekly-unavailable-label">Currently unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProductCard;
