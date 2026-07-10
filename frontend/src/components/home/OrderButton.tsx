/**
 * OrderButton Component
 * =====================
 * A Generic reusable button that can render as either a link or a disabled button.
 */

import { Link } from "react-router-dom";

interface OrderButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const OrderButton = ({ href, children, className = "" }: OrderButtonProps) => {
  const isEnabled = !!href && href.trim().length > 0;
  const baseClass = `pre-order-button${className ? ` ${className}` : ""}`;

  // Active: renders as a navigable link
  if (isEnabled) {
    return (
      <Link to={href!} className={baseClass}>
        {children}
      </Link>
    );
  }

  // Disabled: renders as a non-interactive button
  return (
    <button className={`${baseClass} pre-order-button-disabled`} disabled>
      {children}
    </button>
  );
};

export default OrderButton;
