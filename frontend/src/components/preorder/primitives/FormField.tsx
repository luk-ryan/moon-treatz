/**
 * FormField Component
 * ===================
 * Wrapper that pairs a `<label>` with any form input child.
 * Handles required/optional badges and inline validation error display.
 */

import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;       // Visible text shown above the input
  htmlFor: string;     // Must match the input's `id` so clicking the label focuses it
  required?: boolean;  // Renders a `*`
  optional?: boolean;  // Renders a muted "(optional)" hint
  error?: string;      // When set, displays a red error message below the input
  children: ReactNode; // The input, select, or custom control to wrap
};

const FormField = ({ label, htmlFor, required, optional, error, children }: FormFieldProps) => (
  <div className="preorder-field">
    <label htmlFor={htmlFor} className="preorder-label">
      {label}
      {/* Only one of required/optional should be passed at a time */}
      {required && <span className="preorder-required"> *</span>}
      {optional && <span className="preorder-optional"> (optional)</span>}
    </label>
    {/* Render the input child between the label and the error */}
    {children}
    {/* Error renders only when a non-empty string is passed — null/undefined hides it */}
    {error && <span className="preorder-error">{error}</span>}
  </div>
);

export default FormField;
