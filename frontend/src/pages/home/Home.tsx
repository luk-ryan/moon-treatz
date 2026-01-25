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
import { motion } from "framer-motion";
import Menu from "./Menu";
import Contact from "./Contact";
import WeeklyBox from "./WeeklyBox";
import { pageTransition } from "../../config/animations";

/**
 * Home Component Implementation
 * =============================
 */
const Home = () => {
  return (
    // Wrap entire page in motion.div for fade transition animation
    <motion.div
      className="wrapper"
      {...pageTransition} // Apply fade in/out animation from config
    >
      {/* Center all text content */}
      <div className="text-center">
        {/* Introduction section - personal story from business owners */}
        <div className="intro-section">
          {/* First paragraph - introduces Rachel and Ryan */}
          <p className="intro-para">
            Hello! I'm Rachel, the baker behind MoonTreatz. Along with my older brother, Ryan (co-owner),
            we are dedicated to creating treatz catered toward you!
          </p>
          <p className="intro-para">
            We are based in the Vaughan area and currently offer two options: our weekly boxes, perfect for family/friend
            consumption and bulk macaron orders, great for large events (details are listed below). If you have a flavour
            idea for a macaron or would like to request a flavour for our weekly boxes, we would love to hear it and will do
            our best to accommodate your request.
          </p>
          <p className="intro-para">
            As a small business, we are always growing and learning, and we truly appreciate your support. Please let us
            know of any preferences, and feel free to DM us on Instagram @moontreatzcatering with flavour requests or questions!
          </p>
        </div>
        <WeeklyBox />
        <Menu />
      </div>
      <Contact />
    </motion.div>
  );
};

export default Home;
