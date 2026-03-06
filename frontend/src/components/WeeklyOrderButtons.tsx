/**
 * WeeklyOrderButtons Component
 * =============================
 * Renders the weekly special pre-order buttons (general + NKS student).
 * Automatically enables/disables each button based on link availability from config.
 *
 * Used in:
 * - WeeklyBox (home page)
 */

import OrderButton from "./OrderButton";
import {
  preOrderFormLink,
  studentPreOrderFormLink,
} from "../config/preOrderForm";

const WeeklyOrderButtons = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        margin: "2rem 0",
      }}
    >
      {/* Notice about when pre-order forms open */}
      <p className="pre-order-notice">
        Weekly special box pre-order forms open on weekends (Fri - Sun)
      </p>

      {/* Pre-order button - enabled only when a link is provided */}
      <OrderButton href={preOrderFormLink}>Pre-Order Form</OrderButton>

      {/* NKS Student Pre-Order button - enabled only when a link is provided */}
      <OrderButton
        href={studentPreOrderFormLink}
        className="pre-order-button-nks-student"
      >
        <span>NKS STUDENT</span>
        <span>PRE-ORDER FORM</span>
      </OrderButton>
    </div>
  );
};

export default WeeklyOrderButtons;
