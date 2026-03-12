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

import { useState } from "react";
import { Link } from "react-router-dom";
import { getLatestSpecial } from "../../config/weeklySpecials";
import OrderButton from "../../components/OrderButton";
import {
  preOrderFormLink,
  studentPreOrderFormLink,
} from "../../config/preOrderForm";

// Get the latest weekly special (auto-updates when new specials are added)
const latestSpecial = getLatestSpecial();

/**
 * WeeklyBox Component Implementation
 * ==================================
 * Renders the weekly special section with:
 * 1. Title and description
 * 2. Product image with price tag overlay (auto-updates based on latest id)
 * 3. "This Week's Flavours" heading with decorative styling
 * 4. List of current flavours (linked to Flavours page)
 */
const WeeklyBox = () => {
  const [showTimeslots, setShowTimeslots] = useState(false);

  return (
    <div className="weekly-special">
      {/* Main section title */}
      <h1>Weekly Special</h1>

      {/* Description explaining the weekly box offering */}
      <p>
        Here is our weekly special box of macarons, where we make a box of 7
        assorted macarons with three different flavours of our choice once every
        2 weeks. Pre-orders will be made available here and on our Instagram
        page the week before — forms open on weekends (Fri - Sun).
      </p>

      {/* Pre-Order Form Button Section */}
      <div className="weekly-order-buttons">
        <OrderButton href={preOrderFormLink}>Pre-Order Form</OrderButton>
        <OrderButton
          href={studentPreOrderFormLink}
          className="pre-order-button-nks-student"
        >
          <span>NKS STUDENT</span>
          <span>PRE-ORDER FORM</span>
        </OrderButton>
      </div>

      {/* Schedule + pre-order info above buttons */}
      <div className="weekly-info">
        <p className="order-intro">
          With our current schedule, weekly boxes of macarons will be made
          available for pickup/delivery with 2 timeslots every other Thursday,
          Friday, and Saturday of the week.
          {!showTimeslots && (
            <button
              className="see-more-button"
              onClick={() => setShowTimeslots(true)}
            >
              See more
            </button>
          )}
          {showTimeslots && (
            <button
              className="see-more-button"
              onClick={() => setShowTimeslots(false)}
            >
              See less
            </button>
          )}
        </p>
        {showTimeslots && (
          <ul className="timeslots-list">
            <li>Thursday (2:00pm - 3:00pm)</li>
            <li>Thursday (6:30pm - 7:30pm)</li>
            <li>Friday (2:00pm - 3:00pm)</li>
            <li>Friday (6:30pm - 7:30pm)</li>
            <li>Saturday (12:00pm - 1:00pm)</li>
            <li>Saturday (4:00pm - 5:00pm)</li>
          </ul>
        )}

        <p className="order-intro">
          While there is a chance that you may be able to purchase a weekly
          special box after it has been made, we highly recommend that you fill
          out our pre-order form, which will be released the week prior to
          pickup/delivery dates so that you can guarantee an order for the week.
        </p>
      </div>

      <div className="narrow-wrapper">
        <div className="weekly-special-content">
          {/* Left side: Product image with price tag overlay */}
          <div className="weekly-special-image">
            <div className="weekly-special-imgframe">
              {/* Weekly special box image - uses displayImage from config */}
              <img
                src={latestSpecial.displayImage}
                alt="Weekly Special Box"
                loading="lazy" // Lazy load for performance
              />
              {/* Price tag overlay positioned on image */}
              <div className="price-tag">
                <span>$12</span>
              </div>
            </div>
          </div>

          {/* Right side: Flavours list section */}
          <div className="weekly-special-flavours">
            {/* "THIS WEEK'S FLAVOURS" heading with line break */}
            <h3>
              <span className="flavour-title-main">LAST WEEK'S</span>
              <br />
              <span className="flavour-title-main">FLAVOURS</span>
              <br />
              <span className="order-note">[Mar 5-7]</span>
            </h3>
            {/* Decorative divider line */}
            <div className="flavour-divider"></div>
            {/* List of current week's flavours */}
            <ul>
              {/* Map through flavours from latest special */}
              {latestSpecial.flavours.map((flavour) => (
                <li key={flavour}>
                  {/* Link to Flavours page with #all anchor to show all flavours view */}
                  <Link to="/flavours#all">{flavour}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Refrigeration reminder note */}
        <p className="order-note">* Keep macaron box orders refrigerated.*</p>
      </div>
    </div>
  );
};

export default WeeklyBox;
