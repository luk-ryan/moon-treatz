import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-container">
        <img 
          src="/logo/moon.png" 
          alt="Moon" 
          className="logo-moon"
        />
        <img 
          src="/logo/cloud.png" 
          alt="Cloud body" 
          className="logo-cloud"
        />
        <img 
          src="/logo/eye.png" 
          alt="Left Eye" 
          className="logo-eye logo-eye-left"
        />
        <img 
          src="/logo/eye.png" 
          alt="Right Eye" 
          className="logo-eye logo-eye-right"
        />
        <img 
          src="/logo/mouth.png" 
          alt="Mouth" 
          className="logo-mouth"
        />
      </div>
    </Link>
  );
};

export default Logo;
