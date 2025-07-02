// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/home/Home";
import Flavours from "./pages/flavours/Flavours";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./styles/index.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <ScrollToTop />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavours" element={<Flavours />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
