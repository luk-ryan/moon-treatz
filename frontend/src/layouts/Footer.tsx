import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "2rem",
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <div>
        <a
          href="https://instagram.com/moontreatzcatering"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        {" | "}
        <a href="mailto:info@moon-treatz.com">Email</a>
      </div>
      <p>© {new Date().getFullYear()} Moon Treatz. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
