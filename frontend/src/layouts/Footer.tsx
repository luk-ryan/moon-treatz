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
        <a href="mailto:info@moon-treatz.com">Email</a>
      </div>
      <p>© {new Date().getFullYear()} Moon Treatz. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
