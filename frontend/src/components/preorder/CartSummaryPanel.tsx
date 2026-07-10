/**
 * CartSummaryPanel
 * ================
 * The "Current Order" sidebar rendered on Steps 2, 3, and 4.
 * Shows each line-item with qty × unit price, a subtotal, and an "Edit Cart" link. */

interface LineItem {
  label: string;
  qty: number;
  unitPrice: number;
}

interface CartSummaryPanelProps {
  cartLineItems: LineItem[];
  cartEstimate: number;
  onEditCart: () => void;
}

const CartSummaryPanel = ({ cartLineItems, cartEstimate, onEditCart }: CartSummaryPanelProps) => (
  <aside className="preorder-cart-panel preorder-order-summary">
    <h3 className="preorder-cart-heading">
      <span>Current Order</span>
    </h3>
    <ul className="preorder-cart-list">
      {cartLineItems.map(item => (
        <li key={item.label} className="preorder-cart-item">
          <span className="preorder-cart-item-name">{item.label}</span>
          <span className="preorder-cart-item-qty">× {item.qty}</span>
          <span className="preorder-cart-item-subtotal">${item.qty * item.unitPrice}</span>
        </li>
      ))}
    </ul>
    <div className="preorder-cart-total">
      <span>Subtotal</span>
      <span>${cartEstimate}</span>
    </div>
    <button
      type="button"
      className="preorder-back-btn preorder-order-summary-edit"
      onClick={onEditCart}
    >
      ✎ Edit Cart
    </button>
  </aside>
);

export default CartSummaryPanel;
