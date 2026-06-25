/**
 * WeeklyOrderButtons Component
 * =============================
 * Renders the weekly special pre-order buttons (general + NKS student).
 * Automatically enables/disables each button based on link availability from config.
 *
 * Used in:
 * - WeeklyBox (home page)
 */

import { useState, useEffect } from "react";
import CountdownTimer from "../CountdownTimer";
import { getTimeUntilNextRelease } from "../../config/preOrderForm";

const WeeklyOrderButtons = () => {
  const [time, setTime] = useState(getTimeUntilNextRelease);
  const showCountdown = time.total > 0;

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilNextRelease()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`weekly-order-buttons-wrapper${showCountdown ? " countdown-active" : ""}`}>
      {/* Notice / countdown label above buttons */}
      <p className="pre-order-notice">
        {showCountdown
          ? "Next pre-order releases in"
          : "Weekly special box pre-order forms open on weekends (Fri - Sun)"}
      </p>

      {/* Pre-order button - shows live countdown inside when disabled, or links to form */}
      {showCountdown ? (
        <button className="pre-order-button pre-order-button-disabled" disabled>
          <CountdownTimer />
        </button>
      ) : (
        <a href="/pre-order" className="pre-order-button">
          Pre-Order Form
        </a>
      )}
    </div>
  );
};

export default WeeklyOrderButtons;
