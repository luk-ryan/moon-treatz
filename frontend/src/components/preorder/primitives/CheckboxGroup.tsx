/**
 * CheckboxGroup Component
 * =======================
 * A 2-column grid of checkbox options.
 * Enforces a maximum number of simultaneous selections — unchosen options are disabled until the user deselects one.
 */

type CheckboxGroupProps = {
  options: string[];           // full list of labels to render as checkboxes
  selected: string[];          // currently ticked values (controlled by parent)
  max: number;                 // maximum simultaneous selections allowed
  onChange: (selected: string[]) => void; // parent receives the updated array
};

const CheckboxGroup = ({ options, selected, max, onChange }: CheckboxGroupProps) => {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      // Already checked — remove it from the selection
      onChange(selected.filter((f) => f !== opt));
    } else if (selected.length < max) {
      // Not yet checked and still under the limit — add it
      onChange([...selected, opt]);
    }
    // If at the limit and not already checked, do nothing (button is also disabled)
  };

  return (
    <div className="preorder-checkbox-group">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        // Only disable options the user hasn't already selected
        // Selected ones must stay enabled so the user can deselect them to pick something else
        const disabled = !checked && selected.length >= max;
        return (
          <label
            key={opt}
            className={[
              "preorder-checkbox-label",
              checked   ? "preorder-checkbox-checked"  : "",  // gold highlight when ticked
              disabled  ? "preorder-checkbox-disabled" : "",  // greyed out when limit hit
            ]
              .filter(Boolean)   // remove the empty strings
              .join(" ")}        // produce a clean space-separated class string
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => toggle(opt)}  // let toggle() function decide to either add vs remove
              className="preorder-checkbox-input"
            />
            <span>{opt}</span>
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
