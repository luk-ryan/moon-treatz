/**
 * RadioGroup Component
 * ====================
 * Renders a vertical list of gold-styled radio buttons.
 */

// Each option the radio group can display
export type RadioOption = {
  value: string;      // What gets saved to form state when this option is picked
  label: string;      // The text the user sees next to the radio button
  sublabel?: string;  // Smaller text shown below the label, e.g. a price like "$35"
};

type RadioGroupProps = {
  name: string;                      // Ties all the radios together so only one can be selected at a time
  options: RadioOption[];            // The list of choices to render
  value: string;                     // Whichever option is currently selected
  onChange: (value: string) => void; // Called with the selected option's value when the user picks one
};

const RadioGroup = ({ name, options, value, onChange }: RadioGroupProps) => (
  <div className="preorder-radio-group">
    {options.map((opt) => (
      // Wrap each radio in a <label> so the user can click anywhere on the row to select it
      <label
        key={opt.value}
        // Add the checked class to the whole label row so CSS can highlight it gold
        className={`preorder-radio-label${value === opt.value ? " preorder-radio-checked" : ""}`}
      >
        <input
          type="radio"
          name={name}       // All radios share the same name — browser ensures only one is checked
          value={opt.value}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}  // Tell the parent which option was picked
          className="preorder-radio-input"
        />
        <span className="preorder-radio-text">{opt.label}</span>
        {/* Only render the sublabel if one was provided */}
        {opt.sublabel && <span className="preorder-radio-sub">{opt.sublabel}</span>}
      </label>
    ))}
  </div>
);

export default RadioGroup;
