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

/**
 * Menu Items Configuration
 * ========================
 * Static array defining all available catering options.
 * Each item specifies quantity, price, and number of flavour choices.
 */
const items: MenuItemProps[] = [
  { quantity: 20, price: 40, flavours: 2 },
  { quantity: 30, price: 55, flavours: 3 },
  { quantity: 60, price: 100, flavours: 3 },
  { quantity: 90, price: 135, flavours: 3 },
];

/**
 * Menu Component Implementation
 * =============================
 */
export const Menu = () => {
  return (
    <div className="menu-section">
      {/* Main menu heading */}
      <h1>Catering Menu</h1>
      
      {/* Introductory text explaining ordering requirements */}
      <p>Here are our options for catering, where you will get to choose up to 3 flavours per order!
          Please order at least one week in advanced so that we have enough time to prepare large orders.</p>
      
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
          <h3>Order Instructions</h3>
          {/* Refrigeration reminder note */}
          <p className="order-note"><em>* Keep macaron box orders refrigerated.*</em></p>
          
          {/* How to Contact Section */}
          <div className="order-section">
            <p className="order-intro">
              If you would like to place an order, message us on{" "}
              {/* Instagram link - opens in new tab */}
              <a href="https://www.instagram.com/moon.treatz/" target="_blank" rel="noopener noreferrer" className="order-link">
                Instagram
              </a>{" "}
              or send us an{" "}
              {/* Email link - opens Gmail compose in new tab */}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=moontreatzcatering@gmail.com" target="_blank" rel="noopener noreferrer" className="order-link">
                email
              </a>
              , and we will get back to you as soon as we can.
            </p>
          </div>

          {/* Pickup & Delivery Options Section */}
          <div className="order-section">
            {/* Pickup/Delivery availability statement with color highlights */}
            <p className="order-options-title">Both <span className="highlight-pickup">Pickup</span> and <span className="highlight-delivery">Delivery</span> options are available:</p>
            {/* Details list for pickup and delivery */}
            <ul className="order-list">
              <li>
                {/* Diamond bullet point */}
                <span className="order-icon">◆</span>
                {/* Pickup location details - full address provided after order */}
                <strong>Pickup</strong> will be at our location listed below (exact address will be given out upon ordering).
              </li>
              <li>
                {/* Diamond bullet point */}
                <span className="order-icon">◆</span>
                {/* Delivery fee range information */}
                <strong>Delivery fee</strong> of $2 - $5
              </li>
            </ul>
          </div>

          {/* Payment Options Section */}
          <div className="order-section payment-section">
            {/* Payment methods title */}
            <p className="payment-title">Available Payment Options:</p>
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
