import React from "react";
import Menu from "./Menu";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="wrapper">
      <div className="text-center">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
          asperiores facere commodi quidem. Mollitia inventore ipsa vel, aliquid
          voluptates nam iusto velit dolores! Dolores ratione fuga, soluta
          tempore quis harum!
        </p>
        <Menu />
      </div>
      <Contact />
    </div>
  );
};

export default Home;
