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

// COMPONENTS
import ScrollToTop from "./components/ScrollToTop";
import HomeDecorations from "./components/home/HomeDecorations";

// PAGES
import Home from "./pages/home/Home";
import Flavours from "./pages/flavours/Flavours";
import PreOrder from "./pages/preorder/PreOrder";

// LAYOUTS
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

// GLOBAL STYLES
import "./styles/index.css";

/**
 * AppContent Component
 * ===================
 */
function AppContent() {
  // Get current route location from React Router
  const location = useLocation();

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
      {isHomePage && <HomeDecorations />}
        

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
            <Route path="/pre-order" element={<PreOrder />} />
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
