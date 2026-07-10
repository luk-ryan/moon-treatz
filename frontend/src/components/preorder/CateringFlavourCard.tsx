/**
 * CateringFlavourCard
 * ===================
 * Card rendered per catering package on Step 2 (Catering Details).
 */

import FormField from "./primitives/FormField";
import CheckboxGroup from "./primitives/CheckboxGroup";
import { ALL_FLAVOURS } from "../../config/flavours";

interface PackageFlavourState {
  mode: "same" | "different";
  boxes: string[][];
}

interface CateringPackage {
  key: string;
  label: string;
  price: string;
  maxFlavours: number;
}

interface CateringFlavourCardProps {
  pkg: CateringPackage;
  pkgState: PackageFlavourState;
  qty: number;
  error?: string;
  onModeChange: (mode: "same" | "different") => void;
  onFlavourChange: (boxIndex: number, selected: string[]) => void;
}

const CateringFlavourCard = ({
  pkg,
  pkgState,
  qty,
  error,
  onModeChange,
  onFlavourChange,
}: CateringFlavourCardProps) => {
  // isDifferent: true only when the user has opted for per-box flavours AND there is more than one box to configure.
  const isDifferent = pkgState.mode === "different" && qty > 1;

  // isActive: highlight the card border once any selection has been made.
  const isActive = (isDifferent
    ? pkgState.boxes.slice(0, qty)
    : [pkgState.boxes[0]]
  ).some(b => b.length > 0);

  return (
    <div className={`preorder-catering-detail-card${isActive ? " preorder-card-active" : ""}`}>

      {/* ── Card header ── */}
      <div className="preorder-catering-detail-header">
        <div className="preorder-catering-detail-title">
          <span className="preorder-product-name">{pkg.label}</span>
          {qty > 1 && <span className="preorder-catering-detail-qty">× {qty}</span>}
        </div>
        <span className="preorder-product-price">{pkg.price}</span>
      </div>

      {/* ── Same / Different toggle — only shown when qty > 1 ── */}
      {qty > 1 && (
        <div className="preorder-flavour-mode">
          <button
            type="button"
            className={`preorder-flavour-mode-btn${pkgState.mode === "same" ? " preorder-flavour-mode-active" : ""}`}
            onClick={() => onModeChange("same")}
          >
            Same for all {qty} boxes
          </button>
          <button
            type="button"
            className={`preorder-flavour-mode-btn${pkgState.mode === "different" ? " preorder-flavour-mode-active" : ""}`}
            onClick={() => onModeChange("different")}
          >
            Different per box
          </button>
        </div>
      )}

      {/* ── Flavour picker(s) ── */}
      {!isDifferent ? (
        <FormField
          label={`Flavours (up to ${pkg.maxFlavours})`}
          htmlFor={`flavours-${pkg.key}`}
          required
          error={error}
        >
          <CheckboxGroup
            options={ALL_FLAVOURS}
            selected={pkgState.boxes[0]}
            max={pkg.maxFlavours}
            onChange={(selected) => onFlavourChange(0, selected)}
          />
        </FormField>
      ) : (
        <>
          {error && (
            <p className="preorder-error" style={{ marginBottom: "0.5rem" }}>{error}</p>
          )}
          {Array.from({ length: qty }, (_, i) => (
            <div key={i} style={i > 0 ? { marginTop: "1.25rem" } : undefined}>
              <FormField
                label={`Box ${i + 1} — Flavours (up to ${pkg.maxFlavours})`}
                htmlFor={`flavours-${pkg.key}-${i}`}
                required
              >
                <CheckboxGroup
                  options={ALL_FLAVOURS}
                  selected={pkgState.boxes[i] ?? []}
                  max={pkg.maxFlavours}
                  onChange={(selected) => onFlavourChange(i, selected)}
                />
              </FormField>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CateringFlavourCard;
