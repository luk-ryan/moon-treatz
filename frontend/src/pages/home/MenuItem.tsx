import type { MenuItemProps } from "../../types/types";

const MenuItem = ({ quantity, price }: MenuItemProps) => {
  return (
    <div className="menu-list-row">
      <span>
        <span className="bold">{quantity}</span> Macarons
      </span>
      <span className="bold">${price}</span>
    </div>
  );
};

export default MenuItem;
