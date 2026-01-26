/**
 * App Component
 * =============
 * Root component of the Moon Treatz application that sets up routing and global decorations.
 * 
 * Structure:
 * - Router wrapper for navigation between pages
 * - Conditional decorations (butterflies, clouds, sparkles) on home page only
 * - Global layout components (Header, Footer)
 * - Route-based page rendering (Home, Flavours)
 * 
 * Decorations:
 * - Butterflies: Two animated trails (left/right) on home page
 * - Clouds: Floating cloud images with subtle animations on home page
 * - Sparkles: Twinkling celestial decorations on home page
 * - Macarons: Rendered within Flavours page component
 */

// ROUTING & NAVIGATION
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ANIMATION LIBRARY
import { motion } from "framer-motion";

// HOOKS
import { useIsMobile } from "./hooks/useIsMobile";

// COMPONENTS
import ScrollToTop from "./components/ScrollToTop";

// PAGES
import Home from "./pages/home/Home";
import Flavours from "./pages/flavours/Flavours";

// LAYOUTS
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

// ANIMATION CONFIGURATIONS
import { butterflyEntrance, butterflyTransition } from "./config/animations";

// DECORATION CONFIGURATIONS
import { 
  leftButterflies, 
  rightButterflies, 
  butterflyYValues, 
  butterflyScaleX, 
  butterflyRotate,
  type ButterflyDecor 
} from "./config/butterflyDecorations";
import { cloudDecorations, type CloudDecor } from "./config/cloudDecorations";
import { sparkleDecorations, type SparkleDecor } from "./config/sparkleDecorations";

// GLOBAL STYLES
import "./styles/index.css";

/**
 * AppContent Component
 * ===================
 */
function AppContent() {
  // Get current route location from React Router
  const location = useLocation();
  
  // Check if viewport is mobile (600px or below)
  const isMobile = useIsMobile();
  
  // Determine if we're on the home page to conditionally render decorations
  const isHomePage = location.pathname === "/";

  return (
    <div className={`page-wrapper ${location.pathname === '/flavours' ? 'flavours-page' : ''}`}>
      {/* 
        HOME PAGE DECORATIONS
        =====================
        Butterflies, clouds, and sparkles only appear on the home page.
        Macarons are rendered separately in the Flavours page component.
      */}
      {isHomePage && (
        <>
          {/* LEFT BUTTERFLY TRAIL */}
          {leftButterflies.map((butterfly: ButterflyDecor, index: number) => (
            isMobile ? (
              <span
                key={`left-${index}`}
                className={`butterfly ${butterfly.className}`}
              >
                🦋
              </span>
            ) : (
              <motion.span
                key={`left-${index}`}
                className={`butterfly ${butterfly.className}`}
                {...butterflyEntrance}
                animate={{
                  x: butterfly.xValues,
                  y: butterflyYValues,
                  scaleX: butterflyScaleX,
                  rotate: butterflyRotate,
                  transition: butterflyTransition(butterfly.delay)
                }}
              >
                🦋
              </motion.span>
            )
          ))}
          
          {/* RIGHT BUTTERFLY TRAIL */}
          {rightButterflies.map((butterfly: ButterflyDecor, index: number) => (
            isMobile ? (
              <span
                key={`right-${index}`}
                className={`butterfly ${butterfly.className}`}
              >
                🦋
              </span>
            ) : (
              <motion.span
                key={`right-${index}`}
                className={`butterfly ${butterfly.className}`}
                {...butterflyEntrance}
                animate={{
                  x: butterfly.xValues,
                  y: butterflyYValues,
                  scaleX: butterflyScaleX,
                  rotate: butterflyRotate,
                  transition: butterflyTransition(butterfly.delay)
                }}
              >
                🦋
              </motion.span>
            )
          ))}

          {/* FLOATING CLOUDS */}
          {cloudDecorations.map((cloud: CloudDecor, index: number) => (
            <motion.img 
              key={index}
              src={cloud.src}
              className={cloud.className}
              animate={isMobile ? {} : cloud.animate}
              transition={isMobile ? {} : cloud.transition}
            />
          ))}

          {/* CELESTIAL SPARKLES */}
          {sparkleDecorations.map((sparkle: SparkleDecor, index: number) => (
            <motion.span 
              key={index}
              className={sparkle.className}
              animate={isMobile ? {} : sparkle.animate}
              transition={isMobile ? {} : sparkle.transition}
            >
              {sparkle.character}
            </motion.span>
          ))}
        </>
      )}
        

      {/* MAIN APPLICATION STRUCTURE */}
      <div className="app">
        
        {/* Global header with navigation */}
        <Header />
        
        {/* Scroll restoration component - scrolls to top on route change */}
        <ScrollToTop />
        
        {/* 
          MAIN CONTENT AREA
          =================
          Route-based rendering:
          - "/" renders Home page (catering menu, contact form, weekly special)
          - "/flavours" renders Flavours page (flavour gallery, weekly specials)
        */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavours" element={<Flavours />} />
          </Routes>
        </div>
        
        {/* Global footer with social links and branding */}
        <Footer />
      </div>
    </div>
  );
}

/**
 * App Component
 * =============
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
