/**
 * ConfirmationScreen
 * ==================
 * Shown after a successful order submission.
 * Displays the customer's name and email, and offers a "Submit Another" reset button.
 */

import { motion } from "framer-motion";
import { pageTransition } from "../../config/animations";

interface ConfirmationScreenProps {
  name: string;
  email: string;
  onReset: () => void;
}

const ConfirmationScreen = ({ name, email, onReset }: ConfirmationScreenProps) => (
  <motion.div className="wrapper" {...pageTransition}>
    <div className="text-center preorder-page">
      <h1 className="preorder-title">Pre-Order Form</h1>
      <div className="preorder-confirmation">
        <p className="preorder-confirm-icon">✓</p>
        <h2>Order Received!</h2>
        <p>
          Thanks, <strong>{name}</strong>! We've received your pre-order and will follow up
          at <strong>{email}</strong> to confirm.
        </p>
        <button className="preorder-reset-btn" onClick={onReset}>
          Submit Another
        </button>
      </div>
    </div>
  </motion.div>
);

export default ConfirmationScreen;
