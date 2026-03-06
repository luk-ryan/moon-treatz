/**
 * Menu Component
 * ==============
 * Displays the complete catering menu for Moon Treatz, including all bulk order options, dietary information, and ordering instructions.
 *
 * Content Sections:
 * 1. Menu Title and Description
 * 2. Menu Items (rendered from items array)
 * 3. Dietary Restrictions (allergen information)
 * 4. Order Instructions (how to order, pickup/delivery, payment)
 *
 * Menu Options:
 * - 20 macarons, 2 flavours: $40
 * - 30 macarons, 3 flavours: $55
 * - 60 macarons, 3 flavours: $100
 * - 90 macarons, 3 flavours: $135
 *
 * Important Information:
 * - Requires one week advance notice for large orders
 * - Contains almonds (allergen warning)
 * - Pickup and delivery available
 * - Cash and e-transfer payment accepted
 */

import MenuItem from "./MenuItem";
import type { MenuItemProps } from "../../types/types";
import { useState } from "react";
import OrderButton from "../../components/OrderButton";

/**
 * Menu Items Configuration
 * ========================
 * Static array defining all available catering options.
 * Each item specifies quantity, price, and number of flavour choices.
 */
const items: MenuItemProps[] = [
  { quantity: 20, price: 35, flavours: 2 }, // ($1.75 per macaron)
  { quantity: 30, price: 50, flavours: 3 }, // ($1.66 per macaron)
  { quantity: 60, price: 95, flavours: 3 }, // ($1.58 per macaron)
  { quantity: 90, price: 135, flavours: 3 }, // ($1.50 per macaron)
];

/**
 * Menu Component Implementation
 * =============================
 */
export const Menu = () => {
  const [showLocations, setShowLocations] = useState(false);

  return (
    <div className="menu-section">
      {/* Main menu heading */}
      <h1>Catering Menu</h1>

      {/* Introductory text explaining ordering requirements */}
      <p>
        Here are our options for catering, where you will get to choose up to 3
        flavours per order! Unlike our weekly boxes, you can place an order and
        have it ready at any time. Fill out our catering order form, and
        we will get back to you as soon as we can. We ask that you order at
        least one week in advanced so that we have enough time to prepare larger
        orders.
      </p>

      {/* Order Now button */}
      <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
        <OrderButton href="https://forms.gle/RW8MFNAEVEbrfEg5A">Order Now</OrderButton>
      </div>

      {/* Narrow wrapper */}
      <div className="narrow-wrapper">
        {/* List container for all menu items */}
        <div className="menu-list">
          {/* Map through items array to render each MenuItem component */}
          {items.map((item) => (
            <MenuItem key={item.quantity} {...item} />
          ))}
        </div>

        {/* Dietary restrictions section */}
        <div className="dietary-restrictions">
          {/* Almond allergen warning with icon */}
          <div className="restriction-label">
            <img className="icon" src="/labels/almond.png" />
            <span className="text-color-red">contains almonds</span>
          </div>
          {/* Dairy-free label (commented out for future use)
          <div className="restriction-label">
            <img className="icon" src="/labels/dairy-free.png" />
            <span className="text-color-green">dairy-free</span>
          </div>
          */}
        </div>

        {/* Order Instructions Section - How to place an order, pickup/delivery options, payment methods */}
        <div className="order-instructions">
          {/* Section heading */}
          <h3>Order Information</h3>

          {/* Pickup & Delivery Details Section */}
          <div className="order-section">
            {/* Section title for pickup and delivery information */}
            <p className="order-options-title">
              <strong>Pickup and Delivery Details:</strong>
            </p>
            {/* Details list for pickup and delivery options */}
            <ul className="order-list">
              <li>
                {/* Diamond bullet point */}
                <span className="order-icon">◆</span>
                {/* Pickup locations with expandable list - shows 2 location options with Google Maps links */}
                <strong>3 available pickup locations</strong> (exact address
                will be given out upon ordering)
                {/* Show "See more" button when locations are hidden */}
                {!showLocations && (
                  <button
                    className="see-more-button"
                    onClick={() => setShowLocations(true)}
                  >
                    See more
                  </button>
                )}
                {/* Show "See less" button and location list when expanded */}
                {showLocations && (
                  <>
                    <button
                      className="see-more-button"
                      onClick={() => setShowLocations(false)}
                    >
                      See less
                    </button>
                    {/* Nested list of pickup locations - each linked to Google Maps */}
                    <ul className="locations-list">
                      <li>
                        {/* Thornhill Woods Area location - opens Google Maps in new tab */}
                        <a
                          href="https://maps.app.goo.gl/KTnUcLfH7dKELAEb7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="order-link"
                        >
                          <span>Thornhill Woods Area</span>
                        </a>
                      </li>
                      <li>
                        {/* York University location - opens Google Maps in new tab */}
                        <a
                          href="https://www.google.com/maps/place/York+University/@43.7734573,-79.5044433,17z/data=!3m1!4b1!4m6!3m5!1s0x89d4cd330b767bfb:0xdbb899cc9da76d19!8m2!3d43.7734535!4d-79.5018684!16zL20vMDg4NW4?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="order-link"
                        >
                          <span>York University</span>
                        </a>
                      </li>
                      <li>
                        {/* Dufferin & Steeles location - opens Google Maps in new tab */}
                        <a
                          href="https://maps.app.goo.gl/4fU1dhJHFtmEDiea9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="order-link"
                        >
                          <span>Dufferin &amp; Steeles Area</span>
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </li>
              <li>
                {/* Diamond bullet point */}
                <span className="order-icon">◆</span>
                <strong>Delivery Locations</strong> we currently serve:{" "}
                <strong>Vaughan, North York, Richmond Hill</strong>
              </li>
              <li>
                {/* Diamond bullet point */}
                <span className="order-icon">◆</span>
                {/* Delivery fee range - varies based on distance */}
                <strong>Delivery fee</strong> of $2 - $5
              </li>
            </ul>
          </div>

          {/* Payment Options Section */}
          <div className="order-section payment-section">
            {/* Payment methods title */}
            <p className="payment-title">Available Payment Options:</p>
            {/* Payment method badges displayed in a row */}
            <div className="payment-options">
              {/* Cash payment badge */}
              <span className="payment-badge">Cash</span>
              {/* E-transfer payment badge */}
              <span className="payment-badge">E-transfer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
