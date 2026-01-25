/**
 * Contact Component
 * =================
 * Displays all contact information and location details for Moon Treatz.
 * Provides multiple ways for customers to reach the business: email, phone, and Instagram.
 * 
 * Contact Methods:
 * - Email: moontreatzcatering@gmail.com
 * - Phone: (647)-268-5408
 * - Instagram: @moontreatzcatering
 * 
 * Location:
 * - Thornhill Woods Area (with link to Google Maps)
 */

/**
 * Contact Component Implementation
 * ================================
 */
const Contact = () => {
  return (
    <div className="contact-section">
      {/* Section heading */}
      <h1 className="contact-heading">Order Here</h1>
      
      {/* Email contact with icon */}
      <p>
        {/* Email icon */}
        <img src="/icons/email.png" alt="Email" className="contact-icon email-icon" />
        :{" "}
        {/* Gmail link - opens in new tab for web-based email */}
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=moontreatzcatering@gmail.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          moontreatzcatering@gmail.com
        </a>
      </p>

      {/* Phone contact with icon */}
      <p>
        {/* Phone icon */}
        <img src="/icons/phone.png" alt="Phone" className="contact-icon phone-icon" />
        :{" "}
        {/* Clickable phone link with tel: protocol */}
        <a href="tel:+16472685408" className="text-link">
          (647)-268-5408
        </a>
      </p>

      {/* Instagram contact with icon */}
      <p className="instagram-line">
        {/* Instagram icon */}
        <img src="/icons/instagram.png" alt="Instagram" className="contact-icon instagram-icon" />
        :{" "}
        {/* External link to Instagram profile - opens in new tab */}
        <a
          href="https://instagram.com/moontreatzcatering"
          target="_blank" // Open in new tab
          rel="noopener noreferrer" // Security: prevent access to window.opener
          className="text-link"
        >
          @moontreatzcatering
        </a>
      </p>

      {/* Location section */}
      <h2 className="location-heading">Location</h2>
      <p>
        We are located in the{" "}
        {/* Google Maps link to business location - opens in new tab */}
        <a
          href="https://maps.app.goo.gl/KTnUcLfH7dKELAEb7"
          target="_blank" // Open in new tab
          rel="noopener noreferrer" // Security: prevent access to window.opener
          className="text-link"
        >
          Thornhill Woods Area
        </a>
        .
      </p>
    </div>
  );
};

export default Contact;
