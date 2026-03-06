/**
 * OrderButton Component
 * =====================
 * Generic reusable button that renders as an active link when an href is
 * provided, or as a disabled button when not — sharing the same visual style.
 *
 * Props:
 * - href:      URL to link to. Empty/undefined → disabled state.
 * - children:  Button label content.
 * - className: Optional extra class names (e.g. variant modifiers).
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
        target="_blank"
        rel="noopener noreferrer"
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
