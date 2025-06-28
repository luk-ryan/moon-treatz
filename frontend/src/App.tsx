// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Flavours from "./pages/Flavours";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flavours" element={<Flavours />} />
      </Routes>
    </Router>
  );
}

export default App;
