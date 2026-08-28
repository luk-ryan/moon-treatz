/**
 * CateringFlavourCard
 * ===================
 * Card rendered per catering package on Step 2 (Catering Details).
 */

import { useState } from "react";
import FormField from "./primitives/FormField";
import CheckboxGroup from "./primitives/CheckboxGroup";
import { flavours } from "../../config/flavours";
import { specialtyFlavours } from "../../config/specialtyFlavours";

const CLASSIC_FLAVOUR_NAMES = flavours.map(f => f.name);
const SPECIALTY_FLAVOUR_NAMES = specialtyFlavours.map(f => f.name);

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
  // Specialty flavours are shown as an expandable section below Classic's list —
  // auto-expanded for any box that already has a Specialty pick (e.g. coming back
  // to this step), otherwise collapsed until the arrow button is clicked.
  // Tracked per box index so expanding one box's Specialty section doesn't affect the others.
  const [expandedBoxes, setExpandedBoxes] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    pkgState.boxes.forEach((box, i) => {
      if (box.some(f => SPECIALTY_FLAVOUR_NAMES.includes(f))) initial.add(i);
    });
    return initial;
  });
  const toggleSpecialty = (i: number) => {
    setExpandedBoxes(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

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
        // Same flavours for all boxes of this package — one shared picker (box index 0).
        <>
          <FormField
            label={`Classic Flavours (up to ${pkg.maxFlavours})`}
            htmlFor={`flavours-${pkg.key}`}
            required
            error={error}
          >
            <CheckboxGroup
              options={CLASSIC_FLAVOUR_NAMES}
              selected={pkgState.boxes[0]}
              max={pkg.maxFlavours}
              onChange={(selected) => onFlavourChange(0, selected)}
            />
          </FormField>
          {/* Specialty list is collapsed by default; expanding it doesn't clear Classic picks,
              so a box can mix flavours from both lists. */}
          <button
            type="button"
            className={`preorder-specialty-toggle${expandedBoxes.has(0) ? " preorder-specialty-toggle--open" : ""}`}
            onClick={() => toggleSpecialty(0)}
            aria-expanded={expandedBoxes.has(0)}
          >
            Specialty Flavours
            <span className="preorder-specialty-toggle-arrow">❯</span>
          </button>
          {expandedBoxes.has(0) && (
            <div className="preorder-specialty-flavours">
              <CheckboxGroup
                options={SPECIALTY_FLAVOUR_NAMES}
                selected={pkgState.boxes[0]}
                max={pkg.maxFlavours}
                onChange={(selected) => onFlavourChange(0, selected)}
              />
            </div>
          )}
        </>
      ) : (
        // Different flavours per box — one Classic + Specialty picker pair per box,
        // each with its own selection and its own independent expand/collapse state.
        <>
          {error && (
            <p className="preorder-error" style={{ marginBottom: "0.5rem" }}>{error}</p>
          )}
          {Array.from({ length: qty }, (_, i) => (
            <div key={i} className={`preorder-box-block${i > 0 ? " preorder-box-block--divided" : ""}`}>
              <FormField
                label={`Box ${i + 1} — Classic Flavours (up to ${pkg.maxFlavours})`}
                htmlFor={`flavours-${pkg.key}-${i}`}
                required
              >
                <CheckboxGroup
                  options={CLASSIC_FLAVOUR_NAMES}
                  selected={pkgState.boxes[i] ?? []}
                  max={pkg.maxFlavours}
                  onChange={(selected) => onFlavourChange(i, selected)}
                />
              </FormField>
              <button
                type="button"
                className={`preorder-specialty-toggle${expandedBoxes.has(i) ? " preorder-specialty-toggle--open" : ""}`}
                onClick={() => toggleSpecialty(i)}
                aria-expanded={expandedBoxes.has(i)}
              >
                Specialty Flavours
                <span className="preorder-specialty-toggle-arrow">❯</span>
              </button>
              {expandedBoxes.has(i) && (
                <div className="preorder-specialty-flavours">
                  <CheckboxGroup
                    options={SPECIALTY_FLAVOUR_NAMES}
                    selected={pkgState.boxes[i] ?? []}
                    max={pkg.maxFlavours}
                    onChange={(selected) => onFlavourChange(i, selected)}
                  />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CateringFlavourCard;
