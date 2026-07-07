/**
 * ReviewModal
 * ===========
 * Full-screen review-and-confirm overlay shown before order submission.
 *
 * Displays all selected items, flavour choices, contact info,
 * scheduling details, payment details, and terms acceptance.
 *
 * Sections are conditionally rendered:
 *   Flavours   → only if weekly box or catering packages are in the cart
 *   Scheduling → only if a pickup date or event date was selected
 */

import TermsSection from "./sections/TermsSection";
import { parsePickupDate } from "../../utils/scheduleFormat";

interface LineItem { label: string; qty: number; unitPrice: number; }
interface PackageFlavourState { mode: "same" | "different"; boxes: string[][]; }
interface CateringPackage { key: string; label: string; }

interface ReviewModalProps {
  form: {
    name: string; email: string; phone: string; instagram: string;
    pickupDate: string; eventDate: string; orderTime: string;
    pickupMethod: string; pickupLocation: string; deliveryAddress: string;
    paymentMethod: string; etransferEmail: string; notes: string;
    agreedToTerms: boolean;
  };
  cart: Record<string, number>;
  cateringFlavours: Record<string, PackageFlavourState>;
  cartLineItems: LineItem[];
  cartEstimate: number;
  errors: Partial<Record<string, string>>;
  latestSpecial: { flavours: string[] };
  activeCateringPackages: CateringPackage[];
  onClose: () => void;
  onAgreedChange: (checked: boolean) => void;
  onConfirm: () => void;
}

const ReviewModal = ({
  form, cart, cateringFlavours, cartLineItems, cartEstimate,
  errors, latestSpecial, activeCateringPackages,
  onClose, onAgreedChange, onConfirm,
}: ReviewModalProps) => (
  <div className="preorder-modal-backdrop" onClick={onClose}>
    {/* stopPropagation prevents a click inside the modal from bubbling up
        to the backdrop and accidentally closing it. */}
    <div className="preorder-modal" onClick={(e) => e.stopPropagation()}>
      <h2 className="preorder-modal-title">Review Your Order</h2>

      {/* Items */}
      <section className="preorder-modal-section">
        <h3 className="preorder-modal-section-title">Items</h3>
        <ul className="preorder-modal-list">
          {cartLineItems.map(item => (
            <li key={item.label} className="preorder-modal-list-item">
              <span>{item.label}</span>
              <span>× {item.qty}</span>
              <span>${item.qty * item.unitPrice}</span>
            </li>
          ))}
        </ul>
        <div className="preorder-modal-total">
          <span>Est. Total</span>
          <span>${cartEstimate}</span>
        </div>
      </section>

      {/* Flavours */}
      {(cart.weekly > 0 || activeCateringPackages.length > 0) && (
        <section className="preorder-modal-section">
          <h3 className="preorder-modal-section-title">Flavours</h3>
          <div className="preorder-modal-details">
            {cart.weekly > 0 && (
              <>
                <span className="preorder-modal-label">Weekly Box</span>
                <span>{latestSpecial.flavours.join(", ")}</span>
              </>
            )}
            {activeCateringPackages.map(pkg => {
              const { mode, boxes } = cateringFlavours[pkg.key];
              const qty = cart[pkg.key];
              // "same" mode or single box: one row labelled by package name.
              // "different" mode: one row per box numbered #1, #2 …
              if (mode === "same" || qty <= 1) {
                return (
                  <>
                    <span key={pkg.key + "-lbl"} className="preorder-modal-label">{pkg.label}</span>
                    <span key={pkg.key + "-val"}>{boxes[0]?.join(", ") || "—"}</span>
                  </>
                );
              }
              return boxes.slice(0, qty).map((box, i) => (
                <>
                  <span key={pkg.key + i + "-lbl"} className="preorder-modal-label">{pkg.label} #{i + 1}</span>
                  <span key={pkg.key + i + "-val"}>{box.join(", ") || "—"}</span>
                </>
              ));
            })}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="preorder-modal-section">
        <h3 className="preorder-modal-section-title">Contact</h3>
        <div className="preorder-modal-details">
          <span className="preorder-modal-label">Name</span><span>{form.name}</span>
          <span className="preorder-modal-label">Email</span><span>{form.email}</span>
          {form.phone && <><span className="preorder-modal-label">Phone</span><span>{form.phone}</span></>}
          {form.instagram && <><span className="preorder-modal-label">Instagram</span><span>@{form.instagram.replace(/^@/, "")}</span></>}
        </div>
      </section>

      {/* Scheduling */}
      {(form.pickupDate || form.eventDate) && (
        <section className="preorder-modal-section">
          <h3 className="preorder-modal-section-title">Scheduling</h3>
          <div className="preorder-modal-details">
            {form.pickupDate && (() => {
              // parsePickupDate converts NKS slot strings (e.g. "nks-thursday-430-500pm")
              // into a human label + time. Falls back to raw string for standard slots.
              const parsed = parsePickupDate(form.pickupDate);
              if (parsed) {
                return <><span className="preorder-modal-label">{parsed.label}</span><span>{parsed.time}</span></>;
              }
              return <><span className="preorder-modal-label">Date / Time</span><span>{form.pickupDate}</span></>;
            })()}
            {form.eventDate && (() => {
              const d = new Date(form.eventDate + "T00:00:00");
              const label = d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
              return <><span className="preorder-modal-label">Event Date</span><span>{label}</span></>;
            })()}
            {form.orderTime && <><span className="preorder-modal-label">Time Slot</span><span style={{ textTransform: "capitalize" }}>{form.orderTime}</span></>}
            {form.pickupMethod && <><span className="preorder-modal-label">Pickup / Delivery</span><span style={{ textTransform: "capitalize" }}>{form.pickupMethod}</span></>}
            {form.pickupLocation && <><span className="preorder-modal-label">Location</span><span style={{ textTransform: "capitalize" }}>{form.pickupLocation.replace(/-/g, " ")}</span></>}
            {form.deliveryAddress && <><span className="preorder-modal-label">Delivery Address</span><span>{form.deliveryAddress}</span></>}
          </div>
        </section>
      )}

      {/* Payment */}
      <section className="preorder-modal-section">
        <h3 className="preorder-modal-section-title">Payment</h3>
        <div className="preorder-modal-details">
          <span className="preorder-modal-label">Method</span>
          <span style={{ textTransform: "capitalize" }}>{form.paymentMethod === "etransfer" ? "E-Transfer" : form.paymentMethod}</span>
          {form.notes && <><span className="preorder-modal-label">Notes</span><span>{form.notes}</span></>}
        </div>
      </section>

      {/* Terms & checkbox */}
      <section className="preorder-modal-section">
        <TermsSection
          terms={[
            "Moon Treatz operates from a home kitchen that may contain common allergens.",
            "All sales are final and must be picked up / confirmed at the scheduled date and time.",
          ]}
          agreed={form.agreedToTerms}
          onChange={onAgreedChange}
          error={errors.agreedToTerms}
        />
      </section>

      <div className="preorder-modal-actions">
        <button type="button" className="preorder-reset-btn" onClick={onClose}>← Edit</button>
        <button type="button" className="preorder-submit-btn" onClick={onConfirm}>
          Confirm &amp; Submit
        </button>
      </div>
    </div>
  </div>
);

export default ReviewModal;
