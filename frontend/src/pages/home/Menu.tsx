import MenuItem from "./MenuItem";
import type { MenuItemProps } from "../../types/types";

const items: MenuItemProps[] = [
  { quantity: 20, price: 35, flavours: 2 }, // ($1.75 per macaron)
  { quantity: 30, price: 50, flavours: 3 }, // ($1.66 per macaron)
  { quantity: 60, price: 95, flavours: 3 }, // ($1.58 per macaron)
  { quantity: 90, price: 135, flavours: 3 }, // ($1.50 per macaron)
];

export const Menu = () => {
  return (
    <div>
      <h1>Catering Menu</h1>
      <p>
        Here are our options for catering, where you will get to choose up to 3
        flavours per order! Please order at least one week in advanced so that
        we have enough time to prepare large orders.
      </p>
      <div className="narrow-wrapper">
        <div className="menu-list">
          {items.map((item) => (
            <MenuItem key={item.quantity} {...item} />
          ))}
        </div>
        <div className="dietary-restrictions">
          <div className="restriction-label">
            <img className="icon" src="/labels/almond.png" />
            <span className="text-color-red">contains almonds</span>
          </div>
          {/*
          <div className="restriction-label">
            <img className="icon" src="/labels/dairy-free.png" />
            <span className="text-color-green">dairy-free</span>
          </div>
          */}
        </div>

        <div className="order-instructions">
          <h3>Order Instructions</h3>
          <p>
            <em>* Keep macaron box orders refrigerated.*</em>
          </p>
          <p>
            If you would like to place an order, message us on Instagram or send
            us an email, and we will get back to you as soon as we can.
          </p>
          <p>
            Both <strong>Pickup</strong> and <strong>Delivery</strong> options
            are available:
          </p>
          <ul>
            <li>
              <strong>Pickup</strong> will be at our location listed below
              (exact address will be given out upon ordering).
            </li>
            <li>
              <strong>Delivery fee</strong> of $2 - $5
            </li>
          </ul>
          <p>
            Available Payment Options: <strong>Cash</strong> and{" "}
            <strong>E-transfer</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
