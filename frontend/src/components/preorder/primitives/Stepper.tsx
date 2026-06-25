/**
 * Stepper Component
 * =================
 * Custom −/+ quantity control that replaces the native number spinner.
 * The input is read-only; quantity can only change via the buttons.
 * Values are clamped to [min, max] on each button press.
 */

type StepperProps = {
  id?: string;
  value: number;                     // current quantity shown in the display (controlled)
  min?: number;                      // lowest allowed value, default 1
  max?: number;                      // highest allowed value, default Infinity
  onChange: (value: number) => void; // called with the new clamped number
  error?: boolean;                   // applies red border to the number display
};

const Stepper = ({ id, value, min = 1, max = Infinity, onChange, error }: StepperProps) => (
  <div className="preorder-stepper">
    {/* Decrement button */}
    <button
      type="button"
      className="preorder-stepper-btn"
      onClick={() => onChange(Math.max(min, value - 1))}  // clamp so value never goes below min
      aria-label="Decrease quantity"
    >
      −
    </button>

    {/* Read-only display input — users cannot type directly; value only changes via buttons. */}
    <input
      id={id}
      type="number"
      className={`preorder-input preorder-stepper-display${error ? " preorder-input-error" : ""}`}
      value={value}
      min={min}
      max={max}
      readOnly
    />

    {/* Increment button */}
    <button
      type="button"
      className="preorder-stepper-btn"
      onClick={() => onChange(Math.min(max, value + 1))}  // clamp so value never exceeds max
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
);

export default Stepper;
