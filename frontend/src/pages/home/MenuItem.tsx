import type { MenuItemProps } from "../../types/types";

const MenuItem = ({ quantity, price }: MenuItemProps) => {
  return (
    <div>
      <span>{quantity} Macarons</span>
      <span>${price}</span>
    </div>
  );
};

export default MenuItem;
