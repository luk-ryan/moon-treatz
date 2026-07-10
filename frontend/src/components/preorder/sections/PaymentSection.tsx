/**
 * PaymentSection Component
 * ========================
 * Renders the complete payment block for the pre-order form.
 *
 *   1. Payment notice box
 *   2. Payment method radio group — Cash or E-transfer (required)
 *
 * context prop
 * ------------
 * "weekly"   → notice says "before pickup" and "upon pickup"
 * "catering" → notice says "before the event" and "upon delivery"
 */

import FormField from "../primitives/FormField";
import RadioGroup from "../primitives/RadioGroup";

type PaymentSectionProps = {
  fieldId: string;
  paymentMethod: string;
  onMethodChange: (v: string) => void;
  methodError?: string;
  context: "weekly" | "catering";
};

const NOTICE_TEXT: Record<"weekly" | "catering", string> = {
  weekly:   "E-transfer payments must be received at least 1 day before pickup. Cash payments may be received upon pickup.",
  catering: "E-transfer payments must be received at least 1 day before the event. Cash payments may be received upon delivery.",
};

const PaymentSection = ({ fieldId, paymentMethod, onMethodChange, methodError, context }: PaymentSectionProps) => (
  <>
    {/* PAYMENT NOTICE — informational only, no inputs */}
    <div className="preorder-payment-notice">
      <p><strong>Payment</strong></p>
      <p>{NOTICE_TEXT[context]}</p>
      <p>E-transfer to: <strong>moontreatzcatering@gmail.com</strong></p>
    </div>

    {/* PAYMENT METHOD (CASH/E-TRANSFER) — required before submission */}
    <FormField label="Payment Method" htmlFor={`${fieldId}-payment`} required error={methodError}>
      <RadioGroup
        name="paymentMethod"
        value={paymentMethod}
        onChange={onMethodChange}
        options={[
          { value: "cash",      label: "Cash" },
          { value: "etransfer", label: "E-transfer" },
        ]}
      />
    </FormField>
  </>
);

export default PaymentSection;