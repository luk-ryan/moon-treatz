/**
 * OrderButton Component
 * =====================
 * Generic reusable button that renders as an active link when an href is
 * provided, or as a disabled button when not — sharing the same visual style.
 */

interface OrderButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const OrderButton = ({ href, children, className = "" }: OrderButtonProps) => {
  const isEnabled = !!href && href.trim().length > 0;
  const baseClass = `pre-order-button${className ? ` ${className}` : ""}`;

  if (isEnabled) {
    return (
      <a
        href={href}
        className={baseClass}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseClass} pre-order-button-disabled`} disabled>
      {children}
    </button>
  );
};

export default OrderButton;
