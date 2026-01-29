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
import { getLatestSpecial } from "../../config/weeklySpecials";

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

  return (
    <div className="weekly-special">
      {/* Main section title */}
      <h1>Weekly Special</h1>
      
      {/* Description explaining the weekly box offering */}
      <p>
        Here is our weekly special box of macarons, where we make a box of 7 assorted macarons
            with three different flavours of our choice every week, which will be updated both
            here and on our Instagram page.
      </p>

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
              <span className="flavour-title-main">THIS WEEK'S</span>
              <br />
              <span className="flavour-title-main">FLAVOURS</span>
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
      </div>
      {/* Refrigeration reminder note */}
      <p className="order-note">* Keep macaron box orders refrigerated.*</p>
    </div>
  );
};

export default WeeklyBox;