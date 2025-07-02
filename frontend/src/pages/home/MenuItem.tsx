import type { MenuItemProps } from "../../types/types";

const MenuItem = ({ quantity, price }: MenuItemProps) => {
  return (
    <div>
      <p>
        <span>{quantity} Macarons</span>
        <span>${price}</span>
      </p>
    </div>
  );
};

export default MenuItem;
