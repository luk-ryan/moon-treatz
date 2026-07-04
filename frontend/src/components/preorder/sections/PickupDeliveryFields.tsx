/**
 * PickupDeliveryFields Component
 * ==============================
 * Renders the pickup/delivery selection block for the pre-order form.
 *
 * Flow:
 *   1. "Pickup or Delivery?" radio (always visible)
 *   2a. Pickup  → shows a second radio to pick the exact location
 *   2b. Delivery → shows a delivery-area notice + free-text address input
 */

import FormField from "../primitives/FormField";
import RadioGroup from "../primitives/RadioGroup";
import Input from "../primitives/Input";

interface PickupDeliveryFieldsProps {
  idPrefix: string;
  pickupMethod: string;
  pickupLocation: string;
  deliveryAddress: string;
  errors: {
    pickupMethod?: string;
    pickupLocation?: string;
    deliveryAddress?: string;
  };
  pickupLocations: Array<{ value: string; label: string; sublabel?: string }>;
  onPickupMethodChange: (v: string) => void;
  onPickupLocationChange: (v: string) => void;
  onDeliveryAddressChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}

const PickupDeliveryFields = ({
  idPrefix,
  pickupMethod,
  pickupLocation,
  deliveryAddress,
  errors,
  pickupLocations,
  onPickupMethodChange,
  onPickupLocationChange,
  onDeliveryAddressChange,
}: PickupDeliveryFieldsProps) => (
  <>
    {/* ── Pickup / Delivery toggle ────────────────────────────────────── */}
    <FormField label="Pickup or Delivery?" htmlFor={`${idPrefix}-pickup-method`} required error={errors.pickupMethod}>
      <RadioGroup
        name="pickupMethod"
        value={pickupMethod}
        onChange={onPickupMethodChange}
        options={[
          { value: "pickup",   label: "Pickup"},
          { value: "delivery", label: "Delivery", sublabel: "$4 base fee + $0.50/km beyond 10 km" },
        ]}
      />
    </FormField>

    {/* ── Pickup branch: Location picker ───────────────────────────────
        Available locations are passed in from the parent (PICKUP_LOCATIONS config). */}
    {pickupMethod === "pickup" && (
      <FormField label="Pickup Location" htmlFor={`${idPrefix}-pickupLocation`} required error={errors.pickupLocation}>
        <RadioGroup
          name="pickupLocation"
          value={pickupLocation}
          onChange={onPickupLocationChange}
          options={pickupLocations}
        />
      </FormField>
    )}

    {/* ── Delivery branch: Area notice + Address input ───────────────── */}
    {pickupMethod === "delivery" && (
      <>
        <div className="preorder-delivery-notice">
          <p>Delivery is available within <strong>Vaughan, North York, or Richmond Hill</strong> only.</p>
          <p>A <strong>$4 base fee</strong> applies, plus <strong>$0.50 per km</strong> beyond 10 km from our location.</p>
        </div>
        <FormField label="Delivery Address" htmlFor={`${idPrefix}-deliveryAddress`} required error={errors.deliveryAddress}>
          <Input
            id={`${idPrefix}-deliveryAddress`}
            name="deliveryAddress"
            type="text"
            value={deliveryAddress}
            onChange={onDeliveryAddressChange}
            placeholder="123 Main St, Vaughan, ON"
            error={!!errors.deliveryAddress}
          />
        </FormField>
      </>
    )}
  </>
);

export default PickupDeliveryFields;
