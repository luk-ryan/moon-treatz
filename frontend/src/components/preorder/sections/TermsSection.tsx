/**
 * TermsSection Component
 * ======================
 * Renders a Terms & Conditions notice box followed by a required "I agree" checkbox.
 * Customer MUST tick it to proceed.
 */

type TermsSectionProps = {
  terms: string[];    // each string becomes one bullet point in the notice box
  agreed: boolean;    // whether the checkbox is currently ticked -- fully controlled by parent
  onChange: (checked: boolean) => void;
  error?: string;     // validation message shown below checkbox when form submitted un-ticked
};

const TermsSection = ({ terms, agreed, onChange, error }: TermsSectionProps) => (
  <>
    {/* Terms notice box
        Displays a "Terms & Conditions" heading then each term as a list item.*/}
    <div className="preorder-terms-notice">
      <p><strong>Terms &amp; Conditions</strong></p>
      <ul>
        {terms.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>

    {/* Agreement checkbox */}
    <div className="preorder-terms-check">
      <label className={`preorder-checkbox-label${error ? " preorder-input-error-label" : ""}`}>
        <input
          type="checkbox"
          className="preorder-checkbox-input"
          checked={agreed}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>I have reviewed my order and agree to the terms</span>
      </label>
      {error && <span className="preorder-error">{error}</span>}
    </div>
  </>
);

export default TermsSection;
