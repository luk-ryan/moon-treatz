import React from "react";

export const Menu = () => {
  return (
    <div>
      <h1>Menu</h1>
      <div>
        <p>
          Choose 1 flavour for every 10 macarons, up to 3 flavours per order
        </p>
      </div>
      <div>
        <table>
          <tr>
            <td>10 Macarons</td>
            <td>$20</td>
          </tr>
          <tr>
            <td>20 Macarons</td>
            <td>$40</td>
          </tr>
          <tr>
            <td>30 Macarons</td>
            <td>$60</td>
          </tr>
          <tr>
            <td>40 Macarons</td>
            <td>$70</td>
          </tr>
          <tr>
            <td>60 Macarons</td>
            <td>$90</td>
          </tr>
        </table>
      </div>
      <div>
        <h2>Dietary Restrictions</h2>
        <p>contains almonds</p>
        <p>dairy free</p>
      </div>
    </div>
  );
};

export default Menu;
