import type { MenuItemProps } from "../../types/types";

const MenuItem = ({ quantity, price, flavours }: MenuItemProps) => {
  return (
    <div className="menu-list-row">
      <div className="menu-item-info">
        <span><span className="bold">{quantity}</span> Macarons</span>
        <span className="menu-item-flavours"><span className="bold">{flavours}</span> flavours</span>
      </div>
      <span className="bold">${price}</span>
    </div>
  );
};

export default MenuItem;
