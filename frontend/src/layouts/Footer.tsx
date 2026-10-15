/**
 * Footer
 * ======
 * Site footer with contact details (location, email, phone, Instagram),
 * copyright, and corner decorations.
 *
 * Contact Methods:
 * - Email: moontreatzcatering@gmail.com
 * - Phone: (647)-268-5408
 * - Instagram: @moontreatzcatering
 *
 * Location:
 * - Thornhill Woods Area (with link to Google Maps)
 */

const Footer = () => {
  return (
    <footer className="text-center">
      <div className="footer-contact">

        {/* ── LEFT: location blurb ── */}
        <div className="contact-col contact-col--location">
          <span className="contact-eyebrow">Where to find us</span>
          <p className="contact-location-text">
            Based in{" "}
            <a
              href="https://maps.app.goo.gl/KTnUcLfH7dKELAEb7"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-link"
            >
              Thornhill Woods
            </a>
            ,{" "}Vaughan — pickup &amp; delivery available.
          </p>
        </div>

        {/* ── DIVIDER ── */}
        <div className="contact-divider" />

        {/* ── RIGHT: links ── */}
        <div className="contact-col contact-col--links">
          <span className="contact-eyebrow">Get in touch</span>
          <div className="contact-links-row">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=moontreatzcatering@gmail.com"
              target="_blank" rel="noopener noreferrer"
              className="contact-chip"
            >
              <img src="/icons/email.png" alt="" className="contact-icon email-icon" />
              moontreatzcatering@gmail.com
            </a>
            <a href="tel:+16472685408" className="contact-chip">
              <img src="/icons/phone.png" alt="" className="contact-icon phone-icon" />
              (647) 268-5408
            </a>
            <a
              href="https://instagram.com/moontreatzcatering"
              target="_blank" rel="noopener noreferrer"
              className="contact-chip"
            >
              <img src="/icons/instagram.png" alt="" className="contact-icon instagram-icon" />
              @moontreatzcatering
            </a>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} Moon Treatz. All rights reserved.</p>
        </div>

      </div>

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
