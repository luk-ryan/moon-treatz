/**
 * PreOrder
 * ========
 * ── Steps ─────────────────────────────────────────────────────────────────────

 *   1. Cart            ALWAYS SHOWN — select weekly box qty and/or catering packages
 *   2. Flavours        CATERING ONLY — pick flavours per package (skipped for weekly-only)
 *   3. Contact         ALWAYS SHOWN — name, email, phone, instagram, NKS toggle
 *   4. Schedule        SHOWN IF ANYTHING IS IN THE CART:
 *                        weekly cart  → "nks-schedule" step  (OrderCalendar mode="weekly")
 *                        catering only → "catering-date" step (OrderCalendar mode="catering")
 *   5. Payment         ALWAYS SHOWN — cash or e-transfer, notes
 *   6. Review/Submit   REVIEW MODAL OVERLAYS THE PAYMENT STEP; ON CONFIRM, FIRES EMAILJS
 *   7. Confirmation    REPLACES THE ENTIRE PAGE AFTER A SUCCESSFUL SEND
 *
 * ── NKS mode ─────────────────────────────────────────────────────────────────
 *
 *   Toggled via the "NKS Order" checkbox on the Contact step.
 *   When active (form.orderType === "nks-student"):
 *     - The schedule step shows only Thu/Fri NKS class timetable slots
 *     - Pickup / delivery fields are hidden (NKS orders are handed off at the dojo)
 *     - Saturday is removed from the weekly calendar
 *
 * ── Email ─────────────────────────────────────────────────────────────────────
 *
 *   Two emailjs sent in parallel on confirm:
 *     EMAILJS_TEMPLATE_ID          → order notification (full order details)
 *     EMAILJS_CUSTOMER_TEMPLATE_ID → customer confirmation (name + email only)
 */

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { pageTransition } from "../../config/animations";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "../../config/emailjs";
import { getLatestSpecial } from "../../config/weeklySpecials";
import { isPreOrderFormAvailable } from "../../config/preOrderForm";
import FormField from "../../components/preorder/primitives/FormField";
import Textarea from "../../components/preorder/primitives/Textarea";
import Stepper from "../../components/preorder/primitives/Stepper";
import OrderCalendar from "../../components/preorder/sections/OrderCalendar";
import ContactFields from "../../components/preorder/sections/ContactFields";
import PickupDeliveryFields from "../../components/preorder/sections/PickupDeliveryFields";
import PaymentSection from "../../components/preorder/sections/PaymentSection";
import { parsePickupDate } from "../../utils/scheduleFormat";
import ConfirmationScreen from "../../components/preorder/ConfirmationScreen";
import WeeklyProductCard from "../../components/preorder/WeeklyProductCard";
import CartSummaryPanel from "../../components/preorder/CartSummaryPanel";
import CateringFlavourCard from "../../components/preorder/CateringFlavourCard";
import ReviewModal from "../../components/preorder/ReviewModal";
import { useCart } from "../../context/CartContext";
import { CATERING_SIZES, CATERING_IMAGES, PICKUP_LOCATIONS } from "../../config/catering";

const latestSpecial = getLatestSpecial();
const weeklyAvailable = isPreOrderFormAvailable();

// CATERING_SIZES, CATERING_IMAGES, PICKUP_LOCATIONS — all imported from config/catering.ts above

/* Catering flavour selections
   ═══════════════════════════ */
// mode "same"      → boxes[0] applies to all boxes of that package type
// mode "different" → boxes[i] applies to the i-th box (length = cart qty)
type PackageFlavourState = { mode: "same" | "different"; boxes: string[][] };
type CateringFlavours = { c20: PackageFlavourState; c30: PackageFlavourState; c60: PackageFlavourState; c90: PackageFlavourState };
const makePkgFlavours = (): PackageFlavourState => ({ mode: "same", boxes: [[]] });
const CATERING_FLAVOURS_INIT: CateringFlavours = {
  c20: makePkgFlavours(), c30: makePkgFlavours(), c60: makePkgFlavours(), c90: makePkgFlavours(),
};

/* Order form state
   ════════════════ */
type OrderForm = {
  // Weekly-specific
  orderType: string; pickupDate: string;
  // Catering-specific (flavours are stored per-package in cateringFlavours state)
  eventDate: string; orderTime: string;
  pickupMethod: string; pickupLocation: string; deliveryAddress: string;
  // Shared
  name: string; email: string; phone: string; instagram: string; notes: string;
  paymentMethod: string; etransferEmail: string; agreedToTerms: boolean;
};
const FORM_INIT: OrderForm = {
  orderType: "regular", pickupDate: "",
  eventDate: "", orderTime: "",
  pickupMethod: "", pickupLocation: "", deliveryAddress: "",
  name: "", email: "", phone: "", instagram: "", notes: "",
  paymentMethod: "", etransferEmail: "", agreedToTerms: false,
};

/* Step Breadcrumb / Progress Indicator
   ═════════════════════════════════════
   Rendered at the top of every step. Buttons are disabled until that step has been visited;
   Past steps stay permanently clickable for back-navigation. */
const FormStepHeader = ({
  steps, currentStep, visitedSteps, onNavigate,
}: {
  steps: { key: string; label: string }[];
  currentStep: string;
  visitedSteps: Set<string>;
  onNavigate: (key: string) => void;
}) => {
  return (
    <nav className="preorder-step-nav-header" aria-label="Form steps">
      {steps.map((s, i) => {
        const isCurrent = s.key === currentStep;
        const isVisited = visitedSteps.has(s.key) && !isCurrent;
        return (
          <span key={s.key} className="preorder-step-nav-item">
            {i > 0 && <span className="preorder-step-nav-sep" aria-hidden="true">›</span>}
            <button
              type="button"
              className={`preorder-step-nav-btn${isCurrent ? " is-current" : ""}${isVisited ? " is-past" : ""}`}
              disabled={!isVisited}
              onClick={() => isVisited && onNavigate(s.key)}
              aria-current={isCurrent ? "step" : undefined}
            >
              {s.label}
            </button>
          </span>
        );
      })}
    </nav>
  );
};

/* Shared step page template
   ════════════════════════ */
const StepPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div className="wrapper" {...pageTransition}>
    <div className="text-center preorder-page preorder-page-wide">
      <h1 className="preorder-title">Pre-Order Form</h1>
      {children}
    </div>
  </motion.div>
);

const PreOrder = () => {
  /* Component state
     ══════════════ */
  const [step, setStep] = useState<"cart" | "catering-details" | "form" | "nks-schedule" | "catering-date" | "payment">("cart"); // current wizard step
  const { cart, setCart, clearCart } = useCart();                                             // global cart (persisted, shared with badge)
  const [cateringFlavours, setCateringFlavours] = useState<CateringFlavours>(CATERING_FLAVOURS_INIT); // per-package flavour picks
  const [flavourErrors, setFlavourErrors] = useState<Partial<Record<keyof CateringFlavours, string>>>({}); // catering flavour validation errors
  const [form, setForm] = useState<OrderForm>(FORM_INIT);                                    // contact / scheduling / payment fields
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});        // form field validation errors
  const [submitted, setSubmitted] = useState(false);                                         // true once the order is sent
  const [showReview, setShowReview] = useState(false);                                       // controls the review-and-confirm modal
  const [visitedSteps, setVisitedSteps] = useState<Set<string>>(new Set(["cart"]));          // every step the user has reached

  /* Scroll to first error
     ═════════════════════
     Fires whenever errors or flavourErrors update.
     If any error is present, scrolls the first .preorder-error element into view. */
  useEffect(() => {
    const hasErrors = Object.values(errors).some(Boolean) || Object.values(flavourErrors).some(Boolean);
    if (!hasErrors) return;
    const el = document.querySelector<HTMLElement>(".preorder-error");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors, flavourErrors]);

  /* Scroll to catering section if navigated via #catering hash
     ═══════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (window.location.hash === "#catering") {
      setTimeout(() => {
        document.getElementById("catering")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  /* Track visited steps
     ═══════════════════
     Adds the current step to visitedSteps on every step change. */
  useEffect(() => {
    setVisitedSteps(s => new Set([...s, step]));
    const el = document.querySelector<HTMLElement>(".preorder-step-layout, .preorder-cart-layout");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  /* Invalidate Flavours breadcrumb on Catering Cart change
     ════════════════════════════════════════════════════════
     If the user goes back and changes catering quantities,
     prior flavour selections may no longer be valid (e.g. a package was removed). */
  useEffect(() => {
    setVisitedSteps(s => {
      if (!s.has("catering-details")) return s;
      const next = new Set(s);
      next.delete("catering-details");
      return next;
    });
  }, [cart.c20, cart.c30, cart.c60, cart.c90]);

  /* Cart-derived booleans
     ═════════════════════
     Used throughout to gate steps, fields, and error messages. */
  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);
  const hasWeekly   = cart.weekly > 0;
  const hasCatering = cart.c20 + cart.c30 + cart.c60 + cart.c90 > 0;
  const isNks = form.orderType === "nks-student";

  /* Derived values
     ═══════════════ */

  /* Breadcrumb steps — derived from cart so they stay accurate across the flow */
  const formSteps = [
    { key: "cart",             label: "Cart" },
    ...(hasCatering           ? [{ key: "catering-details",                            label: "Flavours" }] : []),
    { key: "form",             label: "Contact" },
    ...(hasWeekly || hasCatering ? [{ key: hasWeekly ? "nks-schedule" : "catering-date", label: "Schedule" }] : []),
    { key: "payment",          label: "Payment" },
  ];
  const stepNav = <FormStepHeader steps={formSteps} currentStep={step} visitedSteps={visitedSteps} onNavigate={k => setStep(k as any)} />;

  /* Catering packages that are actually in the cart */
  const activeCateringPackages = CATERING_SIZES.filter(s => cart[s.key] > 0);

  /* List of cart line-items used for subtotal display and email summary */
  const cartLineItems = [
    ...(cart.weekly > 0 ? [{ label: "Weekly Special Box", qty: cart.weekly, unitPrice: 12 }] : []),
    ...CATERING_SIZES
      .filter(s => cart[s.key] > 0)
      .map(s => ({ label: s.label, qty: cart[s.key], unitPrice: s.unitPrice })),
  ];
  /* Estimated dollar total — shown as a subtotal */
  const cartEstimate = cartLineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  /* Form change handler
     ═══════════════════
     Single handler for all text/select/textarea inputs.
     Clears the matching error as soon as the user starts correcting it. */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: undefined }));
  };

  /* Flavour mode change
     ═══════════════════
     Switching between "same" and "different" resets boxes. */
  const handleFlavourModeChange = (key: keyof CateringFlavours, mode: "same" | "different", qty: number) => {
    setCateringFlavours(p => ({
      ...p,
      [key]: {
        mode,
        boxes: mode === "same" ? [[]] : Array.from({ length: qty }, () => []),
      },
    }));
    setFlavourErrors(p => ({ ...p, [key]: undefined }));
  };

  /* Flavour selection change
     ════════════════════════
     Replaces only the element at boxIndex, leaving all other boxes intact. */
  const handleFlavourChange = (key: keyof CateringFlavours, boxIndex: number, selected: string[]) => {
    setCateringFlavours(p => {
      const newBoxes = [...p[key].boxes];
      newBoxes[boxIndex] = selected;
      return { ...p, [key]: { ...p[key], boxes: newBoxes } };
    });
    setFlavourErrors(p => ({ ...p, [key]: undefined }));
  };

  /* Pure validators
     ════════════════ */
  const getContactErrors = () => {
    const e: Partial<Record<keyof OrderForm, string>> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    return e;
  };
  const getCateringErrors = () => {
    const e: Partial<Record<keyof CateringFlavours, string>> = {};
    for (const pkg of activeCateringPackages) {
      const { mode, boxes } = cateringFlavours[pkg.key];
      const qty = cart[pkg.key];
      const toCheck = mode === "same" ? [boxes[0]] : Array.from({ length: qty }, (_, i) => boxes[i] ?? []);
      for (let i = 0; i < toCheck.length; i++) {
        const selected = toCheck[i];
        const prefix = toCheck.length > 1 ? `Box ${i + 1}: ` : "";
        if (selected.length === 0) { e[pkg.key] = `${prefix}Please select at least 1 flavour.`; break; }
        else if (selected.length > pkg.maxFlavours) { e[pkg.key] = `${prefix}Maximum ${pkg.maxFlavours} flavours for this package.`; break; }
      }
    }
    return e;
  };
  const getPaymentErrors = () => {
    const e: Partial<Record<keyof OrderForm, string>> = {};
    if (!form.paymentMethod) e.paymentMethod = "Please select a payment method.";
    return e;
  };

  /* Step validators
     ════════════════ */
  const validateCateringDetails = () => { const e = getCateringErrors(); setFlavourErrors(e); return Object.keys(e).length === 0; };
  const validateForm = () => { const e = getContactErrors(); setErrors(e); return Object.keys(e).length === 0; };

  /* validateAllSteps
     ════════════════
     Final guard called from the review modal confirm button.
     Re-runs every step's validation in order, and jumps back to the first that fails.
     Catches cases where the user navigated back and changed something without re-validating. */
  const validateAllSteps = (): boolean => {
    const contactErr = getContactErrors();
    if (Object.keys(contactErr).length > 0) { setErrors(contactErr); setStep("form"); return false; }

    if (hasCatering) {
      if (!visitedSteps.has("catering-details")) { setStep("catering-details"); return false; }
      const flavErr = getCateringErrors();
      if (Object.keys(flavErr).length > 0) { setFlavourErrors(flavErr); setStep("catering-details"); return false; }
    }

    if (hasWeekly) {
      const schedErr: Partial<Record<keyof OrderForm, string>> = {};
      if (!form.pickupDate) schedErr.pickupDate = "Please select a pickup time.";
      else if (!isNks && !form.pickupMethod) schedErr.pickupMethod = "Please select pickup or delivery.";
      else if (!isNks && form.pickupMethod === "pickup" && !form.pickupLocation) schedErr.pickupLocation = "Please select a pickup location.";
      else if (!isNks && form.pickupMethod === "delivery" && !form.deliveryAddress.trim()) schedErr.deliveryAddress = "Please enter your delivery address.";
      if (Object.keys(schedErr).length > 0) { setErrors(schedErr); setStep("nks-schedule"); return false; }
    } else if (hasCatering) {
      const schedErr: Partial<Record<keyof OrderForm, string>> = {};
      if (!form.eventDate) schedErr.eventDate = "Please select a date.";
      else if (!form.orderTime) schedErr.orderTime = "Please select a time of day.";
      else if (!isNks && !form.pickupMethod) schedErr.pickupMethod = "Please select pickup or delivery.";
      else if (!isNks && form.pickupMethod === "pickup" && !form.pickupLocation) schedErr.pickupLocation = "Please select a pickup location.";
      else if (!isNks && form.pickupMethod === "delivery" && !form.deliveryAddress.trim()) schedErr.deliveryAddress = "Please enter your delivery address.";
      if (Object.keys(schedErr).length > 0) { setErrors(schedErr); setStep("catering-date"); return false; }
    }

    const payErr = getPaymentErrors();
    if (Object.keys(payErr).length > 0) { setErrors(payErr); return false; }

    return true;
  };

  /* Confirmation screen
     ════════════════════
     Once submitted = true, clear the entire page. onReset wipes all state
     back to initials so the form is clean for a second order. */
  if (submitted) {
    return (
      <ConfirmationScreen
        name={form.name}
        email={form.email}
        onReset={() => {
          clearCart();
          setCateringFlavours(CATERING_FLAVOURS_INIT);
          setFlavourErrors({});
          setForm(FORM_INIT);
          setErrors({});
          setVisitedSteps(new Set(["cart"]));
          setSubmitted(false);
          setStep("cart");
        }}
      />
    );
  }

  /* ══ Step 1: Cart / Product Selection ══ */
  if (step === "cart") {
    return (
      <StepPage>
          {stepNav}
          <div className="preorder-cart-layout">

            {/* ── Left: product selection ── */}
            <div className="preorder-products">

              {/* Weekly Box */}
              <section className="preorder-product-section">
                <h2 className="preorder-section-heading">Weekly Box</h2>
                <WeeklyProductCard
                  isAvailable={weeklyAvailable}
                  flavours={latestSpecial.flavours}
                  qty={cart.weekly}
                  onChange={(n) => {
                    setCart(p => ({ ...p, weekly: n }));
                    if (n === 0) setForm(p => ({ ...p, pickupDate: "" }));
                  }}
                />
              </section>

              {/* Catering */}
              <section id="catering" className="preorder-product-section">
                <h2 className="preorder-section-heading">Catering Order</h2>
                <p className="preorder-notice-text">
                  Custom orders for events. Pick a package size and quantity — we'll follow up to confirm.
                </p>
                <div className="preorder-catering-grid">
                  {CATERING_SIZES.map(({ key, label, flavourCount, price }) => {
                    const qty = cart[key];
                    return (
                      <div key={key} className={`preorder-product-card preorder-catering-card${qty > 0 ? " preorder-card-active" : ""}`}>
                        {CATERING_IMAGES[key]
                          ? <div className="preorder-product-img-wrap"><img src={CATERING_IMAGES[key]} alt={label} className="preorder-product-img" /></div>
                          : <div className="preorder-product-img-placeholder"><span>🖼</span></div>
                        }
                        <div className="preorder-product-card-body">
                          <div className="preorder-product-info">
                            <span className="preorder-product-name">{label}</span>
                            <span className="preorder-product-price">{price}</span>
                            <span className="preorder-product-desc">{flavourCount}</span>
                          </div>
                          <Stepper
                            value={qty}
                            min={0}
                            max={20}
                            onChange={(n) => {
                              setCart(prev => {
                                const next = { ...prev, [key]: n };
                                // reset flavours for this package if fully removed
                                if (n === 0) {
                                  setCateringFlavours(f => ({ ...f, [key]: makePkgFlavours() }));
                                  setFlavourErrors(e => ({ ...e, [key]: undefined }));
                                  // if no catering left, clear the catering schedule
                                  const stillHasCatering = CATERING_SIZES.some(s => s.key !== key && next[s.key] > 0);
                                  if (!stillHasCatering) setForm(p => ({ ...p, eventDate: "", orderTime: "" }));
                                }
                                return next;
                              });
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>

            {/* ── Right: cart panel ── */}
            <aside className="preorder-cart-panel">
              <h3 className="preorder-cart-heading">
                <span>Your Cart</span>
              </h3>

              {cartTotal === 0 ? (
                <p className="preorder-cart-empty">
                  Nothing added yet — use the + buttons to add items.
                </p>
              ) : (
                <>
                  <ul className="preorder-cart-list">
                    {cartLineItems.map(item => (
                      <li key={item.label} className="preorder-cart-item">
                        <span className="preorder-cart-item-name">{item.label}</span>
                        <span className="preorder-cart-item-qty">× {item.qty}</span>
                        <span className="preorder-cart-item-subtotal">${item.qty * item.unitPrice}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="preorder-cart-total">
                    <span>Est. Total</span>
                    <span>${cartEstimate}</span>
                  </div>
                </>
              )}
            </aside>

          </div>

          {/* Skip catering-details if the user only ordered weekly boxes */}
          <button
            className="preorder-submit-btn preorder-continue-btn"
            disabled={cartTotal === 0}
            onClick={() => setStep(hasCatering ? "catering-details" : "form")}
          >
            Continue →
          </button>
      </StepPage>
    );
  }

  /* ══ Step 2: Catering Details (flavour selection per package) ══ */
  if (step === "catering-details") {
    return (
      <StepPage>
          {stepNav}
          <div className="preorder-step-layout">

            {/* ── Main: flavour pickers ── */}
            <div className="preorder-step-main">
              <p className="preorder-notice-text">
                Choose flavours for each catering package you ordered.
              </p>

              <div className="preorder-catering-detail-list">
                {activeCateringPackages.map(pkg => (
                  <CateringFlavourCard
                    key={pkg.key}
                    pkg={pkg}
                    pkgState={cateringFlavours[pkg.key]}
                    qty={cart[pkg.key]}
                    error={flavourErrors[pkg.key]}
                    onModeChange={(mode) => handleFlavourModeChange(pkg.key, mode, cart[pkg.key])}
                    onFlavourChange={(boxIndex, selected) => handleFlavourChange(pkg.key, boxIndex, selected)}
                  />
                ))}
              </div>

              {/* Back / Next navigation */}
              <div className="preorder-step-nav">
                <button
                  type="button"
                  className="preorder-reset-btn preorder-step-back"
                  onClick={() => { setCateringFlavours(CATERING_FLAVOURS_INIT); setFlavourErrors({}); setStep("cart"); }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="preorder-submit-btn preorder-continue-btn"
                  onClick={() => { if (validateCateringDetails()) setStep("form"); }}
                >
                  Next →
                </button>
              </div>
            </div>

            <CartSummaryPanel
              cartLineItems={cartLineItems}
              cartEstimate={cartEstimate}
              onEditCart={() => setStep("cart")}
            />

          </div>
      </StepPage>
    );
  }

  /* ══ Step 3: Order Form ══ */
  if (step === "form") {
    return (
      <StepPage>
          {stepNav}
          <div className="preorder-step-layout">
            <div className="preorder-step-main">
              {/*
                Routing after contact validation:
                  has weekly        →  nks-schedule  (calendar differs by NKS flag; fulfillment shown for non-NKS)
                  catering-only     →  catering-date (event date + optional fulfillment)
                  otherwise         →  payment        (no scheduling needed)
              */}
              <form
                className="preorder-form"
                onSubmit={(e) => { e.preventDefault(); if (validateForm()) setStep(hasWeekly ? "nks-schedule" : hasCatering ? "catering-date" : "payment"); }}
                noValidate
              >
                <ContactFields
                  values={{ name: form.name, email: form.email, phone: form.phone, instagram: form.instagram }}
                  errors={{ name: errors.name, email: errors.email }}
                  onChange={handleChange}
                />

                {/* ── NKS Order checkbox ────────────────────────────────────────────────
                     Toggling clears all schedule fields so a previously
                     selected non-NKS slot can't carry over into NKS mode. */}
                <div className="preorder-terms-check">
                  <label className="preorder-checkbox-label">
                    <input
                      type="checkbox"
                      className="preorder-checkbox-input"
                      checked={isNks}
                      onChange={(e) => {
                        setForm(p => ({ ...p, orderType: e.target.checked ? "nks-student" : "regular", pickupDate: "", eventDate: "", orderTime: "" }));
                        setErrors(p => ({ ...p, orderType: undefined, pickupDate: undefined, eventDate: undefined, orderTime: undefined }));
                      }}
                    />
                    <span>NKS Order</span>
                  </label>
                </div>

                <div className="preorder-step-nav">
                  <button type="button" className="preorder-reset-btn preorder-step-back" onClick={() => setStep(hasCatering ? "catering-details" : "cart")}>← Back</button>
                  <button type="submit" className="preorder-submit-btn">Next →</button>
                  {/* nav target: nks-schedule if NKS, else payment — handled in validateForm submit */}
                </div>
              </form>
            </div>

            <CartSummaryPanel
              cartLineItems={cartLineItems}
              cartEstimate={cartEstimate}
              onEditCart={() => setStep("cart")}
            />
          </div>
      </StepPage>
    );
  }

  /* ══ Step 3b: NKS Schedule ══ */
  if (step === "nks-schedule") {
    return (
      <StepPage>
          {stepNav}
          <div className="preorder-step-layout">
            <div className="preorder-step-main">

              <FormField label="When would you like your order picked up/delivered?" htmlFor="pickupDate" required error={errors.pickupDate}>
                <OrderCalendar
                  mode="weekly"
                  value={form.pickupDate}
                  onChange={(v) => { setForm(p => ({ ...p, pickupDate: v })); setErrors(p => ({ ...p, pickupDate: undefined })); }}
                  nksOnly={isNks}
                />
              </FormField>

                  {!isNks && (
                <PickupDeliveryFields
                  idPrefix="weekly"
                  pickupMethod={form.pickupMethod}
                  pickupLocation={form.pickupLocation}
                  deliveryAddress={form.deliveryAddress}
                  errors={{ pickupMethod: errors.pickupMethod, pickupLocation: errors.pickupLocation, deliveryAddress: errors.deliveryAddress }}
                  pickupLocations={PICKUP_LOCATIONS}
                  onPickupMethodChange={(v) => { setForm(p => ({ ...p, pickupMethod: v, pickupLocation: "", deliveryAddress: "" })); setErrors(p => ({ ...p, pickupMethod: undefined, pickupLocation: undefined, deliveryAddress: undefined })); }}
                  onPickupLocationChange={(v) => { setForm(p => ({ ...p, pickupLocation: v })); setErrors(p => ({ ...p, pickupLocation: undefined })); }}
                  onDeliveryAddressChange={handleChange}
                />
              )}

              {/* Validate each field in sequence so the user sees one error at a time */}
              <div className="preorder-step-nav">
                <button type="button" className="preorder-reset-btn preorder-step-back" onClick={() => setStep("form")}>← Back</button>
                <button
                  type="button"
                  className="preorder-submit-btn"
                  onClick={() => {
                    if (!form.pickupDate) {
                      setErrors(p => ({ ...p, pickupDate: "Please select a pickup time." }));
                    } else if (!isNks && !form.pickupMethod) {
                      setErrors(p => ({ ...p, pickupMethod: "Please select pickup or delivery." }));
                    } else if (!isNks && form.pickupMethod === "pickup" && !form.pickupLocation) {
                      setErrors(p => ({ ...p, pickupLocation: "Please select a pickup location." }));
                    } else if (!isNks && form.pickupMethod === "delivery" && !form.deliveryAddress.trim()) {
                      setErrors(p => ({ ...p, deliveryAddress: "Please enter your delivery address." }));
                    } else {
                      setStep("payment");
                    }
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
            <CartSummaryPanel
              cartLineItems={cartLineItems}
              cartEstimate={cartEstimate}
              onEditCart={() => setStep("cart")}
            />
          </div>
      </StepPage>
    );
  }

  /* ══ Step 3c: Catering Date (catering-only orders) ══ */
  if (step === "catering-date") {
    return (
      <StepPage>
          {stepNav}
          <div className="preorder-step-layout">
            <div className="preorder-step-main">
              <FormField label="Select your event date" htmlFor="catering-date" required error={errors.eventDate || errors.orderTime}>
                <OrderCalendar
                  mode="catering"
                  dateValue={form.eventDate}
                  timeValue={form.orderTime}
                  onDateChange={(v) => { setForm(p => ({ ...p, eventDate: v, orderTime: "" })); setErrors(p => ({ ...p, eventDate: undefined, orderTime: undefined })); }}
                  onTimeChange={(v) => { setForm(p => ({ ...p, orderTime: v })); setErrors(p => ({ ...p, orderTime: undefined })); }}
                  nksOnly={isNks}
                />
              </FormField>

              {!isNks && (
                <PickupDeliveryFields
                  idPrefix="cat"
                  pickupMethod={form.pickupMethod}
                  pickupLocation={form.pickupLocation}
                  deliveryAddress={form.deliveryAddress}
                  errors={{ pickupMethod: errors.pickupMethod, pickupLocation: errors.pickupLocation, deliveryAddress: errors.deliveryAddress }}
                  pickupLocations={PICKUP_LOCATIONS}
                  onPickupMethodChange={(v) => { setForm(p => ({ ...p, pickupMethod: v, pickupLocation: "", deliveryAddress: "" })); setErrors(p => ({ ...p, pickupMethod: undefined, pickupLocation: undefined, deliveryAddress: undefined })); }}
                  onPickupLocationChange={(v) => { setForm(p => ({ ...p, pickupLocation: v })); setErrors(p => ({ ...p, pickupLocation: undefined })); }}
                  onDeliveryAddressChange={handleChange}
                />
              )}
              {/* Validate sequentially; NKS customers skip pickup/delivery checks entirely */}
              <div className="preorder-step-nav">
                <button type="button" className="preorder-reset-btn preorder-step-back" onClick={() => setStep(hasWeekly ? "nks-schedule" : "form")}>← Back</button>
                <button
                  type="button"
                  className="preorder-submit-btn"
                  onClick={() => {
                    if (!form.eventDate) {
                      setErrors(p => ({ ...p, eventDate: "Please select a date." }));
                    } else if (!form.orderTime) {
                      setErrors(p => ({ ...p, orderTime: "Please select a time of day." }));
                    } else if (!isNks && !form.pickupMethod) {
                      setErrors(p => ({ ...p, pickupMethod: "Please select pickup or delivery." }));
                    } else if (!isNks && form.pickupMethod === "pickup" && !form.pickupLocation) {
                      setErrors(p => ({ ...p, pickupLocation: "Please select a pickup location." }));
                    } else if (!isNks && form.pickupMethod === "delivery" && !form.deliveryAddress.trim()) {
                      setErrors(p => ({ ...p, deliveryAddress: "Please enter your delivery address." }));
                    } else {
                      setStep("payment");
                    }
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
            <CartSummaryPanel
              cartLineItems={cartLineItems}
              cartEstimate={cartEstimate}
              onEditCart={() => setStep("cart")}
            />
          </div>
      </StepPage>
    );
  }

  /* ══ Step 4: Payment & Terms ══ */
  return (
    <>
      <StepPage>
        {stepNav}
        <div className="preorder-step-layout">
          <div className="preorder-step-main">

            {/* Submitting this form shows the review modal rather than sending immediately */}
            <form className="preorder-form" onSubmit={(e) => { e.preventDefault(); if (validateAllSteps()) setShowReview(true); }} noValidate>
              <FormField label="Notes" htmlFor="notes" optional>
                <Textarea
                  id="notes" name="notes"
                  value={form.notes} onChange={handleChange}
                  placeholder="Any requests or questions…"
                  rows={3}
                />
              </FormField>

              <PaymentSection
                fieldId="order"
                paymentMethod={form.paymentMethod}
                onMethodChange={(v) => { setForm(p => ({ ...p, paymentMethod: v })); setErrors(p => ({ ...p, paymentMethod: undefined })); }}
                methodError={errors.paymentMethod}
                context={hasCatering ? "catering" : "weekly"}
              />

              {/*
                Back routing:
                  had weekly  →  nks-schedule  (scheduling step)
                  had catering →  catering-date
                  otherwise   →  form           (contact step)
              */}
              <div className="preorder-step-nav">
                <button type="button" className="preorder-reset-btn preorder-step-back" onClick={() => setStep(hasWeekly ? "nks-schedule" : hasCatering ? "catering-date" : "form")}>← Back</button>
                <button type="submit" className="preorder-submit-btn">Submit Pre-Order</button>
              </div>
            </form>
          </div>

          <CartSummaryPanel
            cartLineItems={cartLineItems}
            cartEstimate={cartEstimate}
            onEditCart={() => setStep("cart")}
          />
        </div>
      </StepPage>
      {showReview && (
        <ReviewModal
          form={form}
          cart={cart}
          cateringFlavours={cateringFlavours}
          cartLineItems={cartLineItems}
          cartEstimate={cartEstimate}
          errors={errors}
          latestSpecial={latestSpecial}
          activeCateringPackages={activeCateringPackages}
          onClose={() => setShowReview(false)}
          onAgreedChange={(checked) => { setForm(p => ({ ...p, agreedToTerms: checked })); setErrors(p => ({ ...p, agreedToTerms: undefined })); }}
          onConfirm={() => {
            if (!form.agreedToTerms) {
              setErrors(p => ({ ...p, agreedToTerms: "You must agree to the terms." }));
              return;
            }

            /* Build plain-text + HTML order summary for the two email templates. */
            const orderItems = cartLineItems.map(i => {
              let flavourLine = "";
              let flavoursHtml = "";
              if (i.label === "Weekly Special Box") {
                const fl = latestSpecial.flavours.join(", ");
                flavourLine = `\n  Flavours: ${fl}`;
                flavoursHtml = `<div style="color:#c9a227;font-size:0.8rem;margin-top:0.25rem;font-style:italic;">Flavours: ${fl}</div>`;
              } else {
                const pkg = CATERING_SIZES.find(s => s.label === i.label);
                if (pkg) {
                  const { mode, boxes } = cateringFlavours[pkg.key];
                  const qty = cart[pkg.key];
                  if (mode === "same" || qty <= 1) {
                    const fl = boxes[0]?.join(", ") || "—";
                    flavourLine = `\n  Flavours: ${fl}`;
                    flavoursHtml = `<div style="color:#c9a227;font-size:0.8rem;margin-top:0.25rem;font-style:italic;">Flavours: ${fl}</div>`;
                  } else {
                    flavourLine = "\n  Flavours:\n  " + boxes.slice(0, qty).map((b, idx) => `Box ${idx + 1} - ${b.join(", ") || "—"}`).join("\n  ");
                    flavoursHtml = `<div style="color:#c9a227;font-size:0.8rem;margin-top:0.25rem;font-style:italic;">Flavours:</div>` + boxes.slice(0, qty).map((b, idx) => `<div style="color:#c9a227;font-size:0.8rem;margin-top:0.15rem;font-style:italic;padding-left:0.5rem;">Box ${idx + 1} - ${b.join(", ") || "—"}</div>`).join("");
                  }
                }
              }
              return {
                text: `${i.label} × ${i.qty} = $${i.qty * i.unitPrice}${flavourLine}`,
                html: `<tr style="border-bottom:1px solid #ede5d0;"><td style="padding:0.75rem 0;font-size:0.95rem;color:#1a1408;"><strong style="font-size:1rem;">${i.label} &times; ${i.qty}</strong>${flavoursHtml}</td><td style="padding:0.75rem 0;font-size:1rem;color:#c9a227;text-align:right;white-space:nowrap;font-weight:bold;">$${i.qty * i.unitPrice}</td></tr>`,
              };
            });
            const deliveryFeeRow = form.pickupMethod === "delivery"
              ? `\nDelivery Fee: ~$4+ (based on distance)`
              : "";
            const deliveryFeeHtml = form.pickupMethod === "delivery"
              ? `<tr style="border-bottom:1px solid #ede5d0;"><td style="padding:0.75rem 0;font-size:0.95rem;color:#1a1408;"><strong style="font-size:1rem;">Delivery Fee</strong><br/><span style="font-size:0.75rem;color:#888;font-style:italic;">$4 base + $0.50/km beyond 10 km</span></td><td style="padding:0.75rem 0;font-size:1rem;color:#c9a227;text-align:right;white-space:nowrap;font-weight:bold;">~$4+</td></tr>`
              : "";
            const orderSummary = orderItems.map(r => r.text).join("\n") + deliveryFeeRow + `\n\nSubtotal: $${cartEstimate} + Delivery fee`;
            const order_summary_html = `<table style="width:100%;border-collapse:collapse;">${orderItems.map(r => r.html).join("")}${deliveryFeeHtml}<tr><td colspan="2"><table style="width:100%;border-collapse:collapse;border-top:2px solid #c9a227;margin-top:0.5rem;"><tr><td style="padding:0.5rem 0 0 0;font-size:1.05rem;color:#c9a227;text-align:right;letter-spacing:0.02em;"><strong>Subtotal: $${cartEstimate}${form.pickupMethod === "delivery" ? " + Delivery fee" : ""}</strong></td></tr></table></td></tr></table>`;

            /* Human-readable schedule line for the email body */
            let schedule = "Not specified";
            if (form.pickupDate) {
              const parsed = parsePickupDate(form.pickupDate);
              if (parsed) {
                schedule = `${parsed.label} · ${parsed.time}`;
              } else {
                schedule = form.pickupDate;
              }
            } else if (form.eventDate) {
              const d = new Date(form.eventDate + "T00:00:00");
              const timeLabel = form.orderTime
                ? form.orderTime.charAt(0).toUpperCase() + form.orderTime.slice(1)
                : "";
              const dateLabel = d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
              schedule = dateLabel + (timeLabel ? ` · ${timeLabel}` : "");
            }

            /* Human-readable pickup/delivery — delivery includes address, pickup shows
               location in Title Case, NKS skips this entirely. */
            const pickup_delivery = form.pickupMethod === "delivery"
              ? `Delivery — ${form.deliveryAddress}`
              : form.pickupMethod === "pickup"
              ? `Pickup — ${form.pickupLocation.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} · 162 Leameadow Rd, Vaughan, ON L4J 9G3`
              : form.orderType === "nks-student"
              ? "Pickup at NKS Thornhill"
              : "Not specified";

            /* Map all form data to EmailJS template variables */
            const payment_instructions =
              form.paymentMethod === "e-transfer"
                ? "e-transfer to moontreatzcatering@gmail.com"
                : "Cash will be paid upon pickup/delivery";

            const pickup_date = form.pickupDate
              ? (() => { const p = parsePickupDate(form.pickupDate); return p ? p.label : form.pickupDate; })()
              : form.eventDate
              ? new Date(form.eventDate + "T00:00:00").toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
              : "TBD";

            const templateParams = {
              customer_name:      form.name,
              pickup_date,
              customer_email:     form.email,
              customer_phone:     form.phone || "—",
              customer_instagram: form.instagram || "—",
              order_summary:      orderSummary,
              order_summary_html,
              schedule,
              pickup_delivery,
              payment_method:     form.paymentMethod,
              payment_instructions,
              notes:              form.notes || "—",
            };

            /* Order confirmation email */
            emailjs
              .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
              .catch(() => {});

            /* Customer receipt email */
            emailjs
              .send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, { ...templateParams, to_email: form.email }, EMAILJS_PUBLIC_KEY)
              .catch(() => {});

            setShowReview(false);
            setSubmitted(true);
          }}
        />
      )}
    </>
  );
};

export default PreOrder;
