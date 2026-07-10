/**
 * Textarea Component
 * ==================
 * Styled multi-line text input that extends the native `<textarea>` element.
 */

// Inherit every built-in HTML textarea prop (maxLength, rows, placeholder, value, onChange, etc.)
// Then add Custom error prop on top
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;  // applies red border class when validation fails
};

const Textarea = ({ error, className, ...props }: TextareaProps) => {
  const cls = [
    "preorder-input preorder-textarea",  // base styles shared with Input + textarea overrides
    error ? "preorder-input-error" : "", // red border when parent signals a validation error
    className ?? "",                     // any extra class that was passed through
  ]
    .filter(Boolean)
    .join(" ");

  // Spread `...props` so the consumer controls value, onChange, maxLength, rows, etc.
  return <textarea className={cls} {...props} />;
};

export default Textarea;
