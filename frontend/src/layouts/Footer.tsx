/**
 * Footer
 * ======
 * Site footer with social links, email, copyright, and corner decorations.
 */

const Footer = () => {
  return (
    <footer className="text-center">
      <div>
        <a
          href="https://instagram.com/moontreatzcatering"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        {" | "}
        {/* Opens a Gmail compose window so the user doesn't need to copy the address */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=moontreatzcatering@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </div>

      <p>© {new Date().getFullYear()} Moon Treatz. All rights reserved.</p>

      {/* Bottom-left L-bracket corner */}
      <div className="corner-group corner-group-bottom-left">
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
        <div className="corner-line"></div>
      </div>

      {/* Bottom-right L-bracket corner */}
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
