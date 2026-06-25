/**
 * PaymentSection Component
 * ========================
 * Renders the complete payment block for the pre-order form. It always
 * contains three parts in this order:
 *
 *   1. Payment notice box
 *
 *   2. Payment method radio group
 *      Required. The customer picks Cash or E-transfer.
 *
 *   3. E-transfer email input (conditional) COMMENTED OUT FOR NOW
 *
 * context prop
 * ------------
 * "weekly"   -> notice says "before pickup"  and "upon pickup"
 * "catering" -> notice says "before the event" and "upon delivery"
 */

import FormField from "../primitives/FormField";
// import Input from "../primitives/Input"; // commented out — e-transfer email field disabled for now
import RadioGroup from "../primitives/RadioGroup";

type PaymentSectionProps = {
  fieldId: string;
  paymentMethod: string;   // "cash" | "etransfer" | "" -- controlled by parent, no default
  // etransferEmail: string;  // commented out — e-transfer email field disabled for now
  onMethodChange: (v: string) => void;
  // onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // commented out
  methodError?: string;    // error shown under the radio when submitted with no method is chosen
  // emailError?: string;  // commented out
  context: "weekly" | "catering"; // drives which NOTICE_TEXT copy to show
};

// Payment notice text
const NOTICE_TEXT: Record<"weekly" | "catering", string> = {
  weekly:   "E-transfer payments must be received at least 1 day before pickup. Cash payments may be received upon pickup.",
  catering: "E-transfer payments must be received at least 1 day before the event. Cash payments may be received upon delivery.",
};

const PaymentSection = ({
  fieldId,
  paymentMethod,
  // etransferEmail,  // commented out
  onMethodChange,
  // onEmailChange,   // commented out
  methodError,
  // emailError,      // commented out
  context,
}: PaymentSectionProps) => (
  <>
    {/* Payment notice box
        Purely informational -- no inputs. */}
    <div className="preorder-payment-notice">
      <p><strong>Payment</strong></p>
      <p>{NOTICE_TEXT[context]}</p>
      <p>E-transfer to: <strong>moontreatzcatering@gmail.com</strong></p>
    </div>

    {/* Payment method radio
        Required -- user must pick one before submission. */}
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

    {/* E-transfer email field — commented out for now
    {paymentMethod === "etransfer" && (
      <FormField label="E-transfer Email" htmlFor={`${fieldId}-etransferEmail`} required error={emailError}>
        <Input
          id={`${fieldId}-etransferEmail`} name="etransferEmail" type="email"
          value={etransferEmail} onChange={onEmailChange}
          placeholder="Email used for E-transfer"
          error={!!emailError}
        />
      </FormField>
    )}
    */}
  </>
);

export default PaymentSection;
