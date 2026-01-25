/**
 * Footer Component
 * ================
 * The site footer providing social media links, contact information, and copyright notice.
 * 
 * Layout:
 * - Social media links
 * - Copyright notice
 * - Corner decorations
 * 
 * Links:
 * - Instagram: @moontreatzcatering
 * - Email: moontreatzcatering@gmail.com
 */

/**
 * COMPONENT OUTPUT
 * ================
 */
const Footer = () => {
  return (
    <footer className="text-center">
      {/* SOCIAL MEDIA LINKS */}
      <div>
        {/* Instagram link - open in new tab */}
        <a
          href="https://instagram.com/moontreatzcatering"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        {" | "}
        {/* Email link - opens Gmail compose in new tab */}
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=moontreatzcatering@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </div>
      
      {/* COPYRIGHT NOTICE */}
      <p>© {new Date().getFullYear()} Moon Treatz. All rights reserved.</p>

      {/* CORNER DECORATION (Bottom-left) */}
      <div className="corner-group corner-group-bottom-left">
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
      </div>
      
      {/* CORNER DECORATION (Bottom-right) */}
      <div className="corner-group corner-group-bottom-right">
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
      </div>
    </footer>
  );
};

export default Footer;
