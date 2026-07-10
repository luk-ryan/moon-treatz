/**
 * App Component
 * =============
 * Root component. Sets up the router, cart context, and global layout.
 */

// ROUTING & NAVIGATION
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// COMPONENTS
import ScrollToTop from "./components/ScrollToTop";
import HomeDecorations from "./components/home/HomeDecorations";
import FloatingCart from "./components/FloatingCart";

// PAGES
import Home from "./pages/home/Home";
import Flavours from "./pages/flavours/Flavours";
import PreOrder from "./pages/preorder/PreOrder";

// LAYOUTS
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import { CartProvider } from "./context/CartContext";

// GLOBAL STYLES
import "./styles/index.css";

/**
 * APP CONTENT
 * ===========
 */
function AppContent() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className={`page-wrapper ${location.pathname === '/flavours' ? 'flavours-page' : ''}`}>
      {/* HomeDecorations only renders on "/" — butterflies, clouds, sparkles */}
      {isHomePage && <HomeDecorations />}

      <div className="app">
        <Header />
        <FloatingCart />
        <ScrollToTop />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavours" element={<Flavours />} />
            <Route path="/pre-order" element={<PreOrder />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

/**
 * App
 * ---
 * Wraps AppContent in the Router + CartProvider so all children can call useNavigate / useCart without any extra setup.
 */
function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
