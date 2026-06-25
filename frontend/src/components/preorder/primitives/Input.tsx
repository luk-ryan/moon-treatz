/**
 * Input Component
 * ===============
 * Styled single-line text input that extends the native `<input>` element.
 */

// Inherit every built-in HTML input prop (type, placeholder, value, onChange, disabled, etc.)
// Then add two custom ones on top — so consumers can use <Input> exactly like a normal <input>
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;   // Adds red border class 
  narrow?: boolean;  // Adds reduced-width class (used for small fields like quantity)
};

const Input = ({ error, narrow, className, ...props }: InputProps) => {
  const cls = [
    "preorder-input",                          // always present — base styling
    narrow ? "preorder-input-narrow" : "",     // reduced width variant
    error  ? "preorder-input-error"  : "",     // red border when validation fails
    className ?? "",                           // any additional class
  ]
    .filter(Boolean)
    .join(" ");

  // Spread `...props` last so to still be able to override anything (e.g. style, ref)
  return <input className={cls} {...props} />;
};

export default Input;
