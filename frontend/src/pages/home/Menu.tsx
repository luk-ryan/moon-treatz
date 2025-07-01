import React from "react";
import MenuItem from "./MenuItem";
import type { MenuItemProps } from "../../types/types";

const items: MenuItemProps[] = [
  { quantity: 10, price: 20 },
  { quantity: 20, price: 40 },
  { quantity: 30, price: 60 },
  { quantity: 40, price: 70 },
  { quantity: 60, price: 90 },
];

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
        {items.map((item) => (
          <MenuItem key={item.quantity} {...item} />
        ))}
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
