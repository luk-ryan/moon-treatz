import Menu from "./Menu";
import Contact from "./Contact";
import WeeklyBox from "./WeeklyBox";

const Home = () => {
  return (
    <div className="wrapper">
      <div className="text-center">
        <p>
          Hello! I’m Rachel, the baker behind MoonTreatz. Along with my older brother, Ryan (co-owner),
          we are dedicated to creating treatz catered toward you! 
          <br></br><br></br>
          We are based in the Vaughan area and currently offer two options: our weekly boxes, perfect for family/friend
          consumption and bulk macaron orders, great for large events (details are listed below). If you have a flavour
          idea for a macaron or would like to request a flavour for our weekly boxes, we would love to hear it and will do
          our best to accommodate your request.
          <br></br><br></br>
          As a small business, we are always growing and learning, and we truly appreciate your support. Please let us
          know of any preferences, and feel free to DM us on Instagram @moontreatzcatering with flavour requests or questions!
        </p>
        <WeeklyBox />
        <Menu />
      </div>
      <Contact />
    </div>
  );
};

export default Home;
