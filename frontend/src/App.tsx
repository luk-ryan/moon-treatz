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
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flavours" element={<Flavours />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
