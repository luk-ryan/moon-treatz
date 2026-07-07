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

import MenuItem from "../../components/home/MenuItem";
import { motion } from "framer-motion";
import { fadeUp } from "../../config/animations";
import { MENU_ITEMS } from "../../config/catering";

export const Menu = () => {
  return (
    <div className="menu-section">

      {/* ── HEADER ────────────────────────────────────────────────── */}
      <motion.div className="menu-header" {...fadeUp(0)}>
        <span className="menu-eyebrow">Bulk Orders</span>
        <h1 className="menu-title">Catering Menu</h1>
        <div className="menu-title-rule" />
      </motion.div>

      {/* ── INTRO ─────────────────────────────────────────────────── */}
      <motion.p className="menu-intro" {...fadeUp(0.1)}>
        Choose up to <strong>3 flavours</strong> per order — available any time,
        not just bi-weekly. Fill out our catering form and we'll get back to you ASAP.
        Please order at least <strong>one week in advance</strong>.
      </motion.p>

      <div className="narrow-wrapper">
        {/* ── MENU LIST ───────────────────────────────────────────── */}
        <div className="menu-list">
          {MENU_ITEMS.map((item, i) => (
            <motion.div key={item.quantity} {...fadeUp(0.15 + i * 0.1)}>
              <MenuItem {...item} />
            </motion.div>
          ))}
        </div>

        {/* ── ALLERGEN ────────────────────────────────────────────── */}
        <div className="dietary-restrictions">
          <div className="restriction-label">
            <img className="icon" src="/labels/almond.png" alt="almond" />
            <span className="text-color-red">contains almonds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

