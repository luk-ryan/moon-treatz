# Advanced React Techniques & Tricks Reference

> **Moon Treatz — Project Documentation**
> A guide to the advanced patterns, animations, and techniques used in this React + TypeScript + Vite storefront/pre-order app.

---

## Table of Contents

1. [State Management](#1-state-management)
2. [Animations](#2-animations)
3. [Component Architecture](#3-component-architecture)
4. [Configuration Patterns](#4-configuration-patterns)
5. [Utility Logic](#5-utility-logic)
6. [Layout & Interaction Details](#6-layout--interaction-details)
7. [EmailJS Integration](#7-emailjs-integration)
8. [Mobile Responsiveness](#8-mobile-responsiveness)
9. [Performance Optimizations](#9-performance-optimizations)

---

## 1. State Management

### 1.1 Cart Context with Persisted, Dual-Mode Setter

**File:** `src/context/CartContext.tsx`

```typescript
const [cart, setCartState] = useState<CartState>(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...CART_INIT, ...JSON.parse(saved) } : CART_INIT;
  } catch {
    return CART_INIT;
  }
});

const setCart = (update: CartState | ((prev: CartState) => CartState)) => {
  setCartState(prev => {
    const next = typeof update === "function" ? update(prev) : update;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    return next;
  });
};

const totalItems = Object.values(cart).reduce((sum, v) => sum + v, 0);
```

**Key techniques:**
- **Lazy `useState` initializer** — the `localStorage` read only ever runs once, on mount, not on every render.
- **Merge-on-restore** (`{ ...CART_INIT, ...JSON.parse(saved) }`) — if a new product key gets added to `CartState` later, old saved carts still populate it with a default instead of `undefined`.
- **Dual-mode setter** — `setCart` accepts either a plain object or an updater function, so callers can do `setCart(prev => ({ ...prev, c20: prev.c20 + 1 }))` just like `useState`'s setter, while every write is transparently persisted to `localStorage`.
- **Silent failure** — `try/catch` around every `localStorage` call means a private-browsing/quota error degrades to "cart just doesn't persist" instead of crashing the app.
- **Computed total** — `totalItems` is derived from `cart` on every render rather than tracked as separate state, so it can never drift out of sync.

---

## 2. Animations

### 2.1 Framer Motion Config Objects

**File:** `src/config/animations.ts`

```typescript
export const butterflyEntrance = {
  initial: { opacity: 0, x: -200, scale: 0.3 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: {
    opacity: { duration: 0.6 },
    x: { duration: 0.8, type: "spring", bounce: 0.6 },
    scale: { duration: 0.8, type: "spring", bounce: 0.5 }
  }
};

export const macaronTransition = (delay: number = 0) => ({
  duration: 5,
  repeat: Infinity,
  ease: "easeInOut",
  delay,
});
```

Animation presets live as plain exported objects/functions, not inline JSX props, so `<motion.span {...butterflyEntrance} animate={{...}} />` stays readable. `viewport: { once: false }` means the entrance replays every time the element scrolls back into view instead of only the first time. Per-property `transition` (different duration/easing for opacity vs. x vs. scale) creates layered, non-uniform motion instead of everything animating in lockstep. `macaronTransition(delay)` being a function turns "stagger 14 macarons" into a one-line `.map()` instead of 14 hand-written transition objects.

### 2.2 Conditional Rendering by Device

**File:** `src/components/home/HomeDecorations.tsx`

```typescript
{leftButterflies.map((butterfly, index) =>
  isMobile ? (
    <span key={`left-${index}`} className={`butterfly ${butterfly.className}`}>🦋</span>
  ) : (
    <motion.span
      key={`left-${index}`}
      className={`butterfly ${butterfly.className}`}
      {...butterflyEntrance}
      animate={{
        x: butterfly.xValues,
        y: butterflyYValues,
        scaleX: butterflyScaleX,
        rotate: butterflyRotate,
        transition: butterflyTransition(butterfly.delay),
      }}
    >
      🦋
    </motion.span>
  )
)}
```

`useIsMobile()` gates whether a `motion.span` (with keyframe arrays for a full flight path) or a plain static `span` gets rendered at all — mobile phones never even construct the Framer Motion animation objects, rather than mounting them and hiding them with CSS.

---

## 3. Component Architecture

### 3.1 Multi-Step Wizard State

**File:** `src/pages/preorder/PreOrder.tsx`

```typescript
type PackageFlavourState = { mode: "same" | "different"; boxes: string[][] };
type CateringFlavours = { c20: PackageFlavourState; c30: PackageFlavourState; c60: PackageFlavourState; c90: PackageFlavourState };

const [step, setStep] = useState<"cart" | "catering-details" | "form" | "nks-schedule" | "catering-date" | "payment">("cart");
const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
const [visitedSteps, setVisitedSteps] = useState<Set<string>>(new Set(["cart"]));
```

The `step` union type makes every possible screen enumerable and exhaustively checkable at compile time — there's no such thing as an invalid step string. `Partial<Record<keyof OrderForm, string>>` gives per-field error messages keyed directly off the form's own type, so adding a new form field and forgetting to handle its error is a type error, not a runtime bug. `visitedSteps` as a `Set` tracks a breadcrumb trail that supports free back-navigation without re-deriving history from the step value.

**Auto-invalidating dependent steps:**

```typescript
useEffect(() => {
  setVisitedSteps(s => {
    if (!s.has("catering-details")) return s;
    const next = new Set(s);
    next.delete("catering-details"); // force re-validation if catering qty changes
    return next;
  });
}, [cart.c20, cart.c30, cart.c60, cart.c90]);
```

If the customer changes a catering package quantity *after* picking flavours for it, the previously "visited" flavour step is evicted from the breadcrumb so the wizard forces them to revisit and re-validate it — preventing stale flavour selections (e.g. picked flavours for 3 boxes, then bumped quantity to 5) from silently reaching checkout.

**Scroll-to-first-error:**

```typescript
useEffect(() => {
  const hasErrors = Object.values(errors).some(Boolean) || Object.values(flavourErrors).some(Boolean);
  if (!hasErrors) return;
  document.querySelector<HTMLElement>(".preorder-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
}, [errors, flavourErrors]);
```

### 3.2 Constrained Checkbox Group

**File:** `src/components/preorder/primitives/CheckboxGroup.tsx`

```typescript
const toggle = (opt: string) => {
  if (selected.includes(opt)) onChange(selected.filter((f) => f !== opt));
  else if (selected.length < max) onChange([...selected, opt]);
};

const disabled = !checked && selected.length >= max;
```

The disable condition is deliberately asymmetric: once `max` is reached, unselected options grey out, but *already-selected* ones stay clickable so the user can still deselect to make room. A naive `selected.length >= max` disabling everything would lock the user out of fixing their own selection.

### 3.3 Smart Lazy-Init for Expand/Collapse State

**File:** `src/components/preorder/CateringFlavourCard.tsx`

```typescript
const [expandedBoxes, setExpandedBoxes] = useState<Set<number>>(() => {
  const initial = new Set<number>();
  pkgState.boxes.forEach((box, i) => {
    if (box.some(f => SPECIALTY_FLAVOUR_NAMES.includes(f))) initial.add(i);
  });
  return initial;
});
```

When a user returns to edit an order that already has a specialty flavour picked in box 3, box 3's "specialty flavours" section auto-expands on mount instead of forcing them to rediscover where their existing selection lives.

### 3.4 Rolling Pickup-Week Date Math

**File:** `src/components/preorder/sections/OrderCalendar.tsx`

```typescript
const anchor = new Date(preOrderOpenDate + "T00:00:00");
const daysToThu = ((4 - anchor.getDay() + 3) % 7) - 3;
const thu = new Date(anchor); thu.setDate(anchor.getDate() + daysToThu);
const sat = new Date(thu);   sat.setDate(thu.getDate() + 2);

while (sat <= today) {
  thu.setDate(thu.getDate() + 7);
  sat.setDate(sat.getDate() + 7);
}
```

`((4 - anchor.getDay() + 3) % 7) - 3` is compact modular arithmetic that locates "the Thursday of the anchor week" regardless of what day of the week the anchor date falls on. The `while (sat <= today)` loop then fast-forwards week-by-week until it lands on the next *future* pickup weekend — this same exact formula is intentionally duplicated (not abstracted into a shared import) in `scheduleFormat.ts` so the calendar UI, review modal, and confirmation email can never disagree about which week "next Thursday" means; see [5.1](#51-mirrored-date-math-with-an-explicit-warning-comment).

---

## 4. Configuration Patterns

### 4.1 Layered Availability Flags

**File:** `src/config/preOrderForm.ts`

```typescript
export const preOrderOpenDate: string = "2026-09-03";
export const preOrderClosed: boolean = false;
export const preOrderForceOpen: boolean = true;

export const isPreOrderFormAvailable = (): boolean => {
  if (preOrderClosed) return false;
  return Date.now() >= new Date(preOrderOpenDate).getTime();
};
```

Three independent flags give three levels of manual control over one date-driven feature: a hard kill-switch (`preOrderClosed`), a hard override to open early (`preOrderForceOpen`), and the default date-based gate — letting the site be toggled without touching component code.

### 4.2 `as const` for Exhaustive Literal Keys

**File:** `src/config/catering.ts`

```typescript
export const CATERING_SIZES = [
  { key: "c20" as const, label: "20 Macarons", unitPrice: 35, maxFlavours: 2 },
  { key: "c30" as const, label: "30 Macarons", unitPrice: 50, maxFlavours: 3 },
];

export const CATERING_IMAGES: Partial<Record<string, string>> = {
  c20: "/form/CateringBox_20.jpg",
};
```

`"c20" as const` narrows the type from `string` to the literal `"c20"`, which is what lets `CartState`/`CateringFlavours` key off it exhaustively (TypeScript can flag a missing `c90` case). `Partial<Record<string, string>>` on the image map means a package without a photo yet doesn't need a placeholder entry just to satisfy the type checker.

---

## 5. Utility Logic

### 5.1 Mirrored Date Math (with an explicit warning comment)

**File:** `src/utils/scheduleFormat.ts`

```typescript
function getPickupWeekDates() {
  // [Mirror of OrderCalendar.getPickupWeek() — MUST stay synchronized]
  const anchor = new Date(preOrderOpenDate + "T00:00:00");
  const daysToThu = ((4 - anchor.getDay() + 3) % 7) - 3;
  // ...identical logic to OrderCalendar
}
```

```typescript
const nksMatch = pickupDate.match(/^nks-(thursday|friday)-(.+)$/);
if (nksMatch) {
  const timeMatch = nksMatch[2].match(/^(\d{1,2})(\d{2})-(\d{1,2})(\d{2})(am|pm)$/);
  const timeStr = timeMatch
    ? `${timeMatch[1]}:${timeMatch[2]} \u2013 ${timeMatch[3]}:${timeMatch[4]} ${timeMatch[5]}`
    : nksMatch[2];
}
```

Internal pickup-slot strings like `"nks-thursday-430-500pm"` are regex-parsed back into a human-formatted range (`4:30 – 5:00 pm`, using a real Unicode en-dash `\u2013` instead of a hyphen) for display in the review modal and confirmation email. The comment calling out the duplication with `OrderCalendar` is a deliberate trade-off: it's simpler to keep one small pure function synced by convention than to introduce a shared module dependency between a component and a plain utils file for a handful of lines of date arithmetic — but it's flagged so future edits touch both spots.

---

## 6. Layout & Interaction Details

### 6.1 Interactive Eye-Tracking Logo

**File:** `src/layouts/Logo/index.tsx`

```typescript
const mouseX = useMotionValue(0);
const leftEyeX  = useSpring(mouseX, { stiffness: 150, damping: 15 });
const rightEyeX = useSpring(mouseX, { stiffness: 150, damping: 15 });

const leftEyeTransformX  = useTransform(leftEyeX,  (v) => v > 0 ? v * 1.5 : v * 0.7);
const rightEyeTransformX = useTransform(rightEyeX, (v) => v < 0 ? v * 1.5 : v * 0.7);

const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
  const rect = containerRef.current!.getBoundingClientRect();
  const deltaX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
  mouseX.set(deltaX * 4); // maxMovement
};
```

Raw pointer position flows through a `useMotionValue` → `useSpring` (physical lag/smoothing) → `useTransform` (asymmetric remap) pipeline — three composable Framer Motion primitives instead of one big `onMouseMove` handler doing manual easing math. The asymmetric multiplier (`v * 1.5` vs `v * 0.7` depending on direction) exaggerates movement toward the cursor more than movement away from it, which reads as more natural "watching" behavior than a linear 1:1 follow.

### 6.2 Ornamental, Asset-Free Decoration

**File:** `src/layouts/Header.tsx`

```tsx
<div className="ornament-side ornament-left">
  <span className="ornament-line"></span>
  <span className="ornament-symbol ornament-star subtle">✦</span>
  <span className="ornament-symbol ornament-dot">•</span>
  <span className="ornament-symbol ornament-moon">☾</span>
</div>
```

Header/footer corner brackets and ornamental symbols are plain Unicode characters (✦ • ☾ ◇) and repeated `div`s, not SVGs or images — kept lightweight while still giving the brand its "moon/celestial" motif, and easily recolored/animated purely through CSS.

### 6.3 Pre-filled Gmail Compose Link

**File:** `src/layouts/Footer.tsx`

```tsx
<a href="https://mail.google.com/mail/?view=cm&fs=1&to=moontreatzcatering@gmail.com" target="_blank" rel="noopener noreferrer">
  Email
</a>
```

Using Gmail's `view=cm&fs=1&to=` compose URL (instead of a plain `mailto:`) opens Gmail directly in a new tab with the recipient pre-filled, which is more reliable for users who don't have a default desktop mail client configured.

---

## 7. EmailJS Integration

**Files:** `src/config/emailjs.ts`, `src/pages/preorder/PreOrder.tsx`

```typescript
export const EMAILJS_TEMPLATE_ID = "template_j990dk1";          // admin notification
export const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_is8hbu7"; // customer receipt
```

```typescript
await Promise.all([
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    customer_name: form.name,
    order_summary: orderSummary,
    schedule: `${pickupInfo?.label} ${pickupInfo?.time}`,
    payment_method: form.paymentMethod,
    // ...
  }, EMAILJS_PUBLIC_KEY),
  emailjs.send(EMAILJS_CUSTOMER_TEMPLATE_ID, { customer_name: form.name, customer_email: form.email }, EMAILJS_PUBLIC_KEY),
]);
```

Two separate EmailJS templates are fired in parallel via `Promise.all` on order submission — one full-detail admin notification, one short customer receipt — so the confirmation screen only shows after *both* sends resolve, rather than the customer seeing "success" while the shop owner's notification is still silently failing.

---

## 8. Mobile Responsiveness

**File:** `src/styles/mobile/mobile.css`

```css
@media (max-width: 600px) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
  * {
    text-shadow: none !important;
    box-shadow: none !important;
  }
  .floating-cart {
    box-shadow: 0 0 0 2px #c9a227, 0 0.25rem 0.75rem rgba(0, 0, 0, 0.5) !important;
    border: 2px solid #c9a227 !important;
  }
  .butterfly, .sparkle, .cloud { display: none; }
}
```

A single breakpoint (≤600px, matching `useIsMobile`'s `MOBILE_BREAKPOINT`) blanket-disables every animation, transition, text-shadow, and box-shadow in the app with `!important`, then explicitly re-enables a minimal border/shadow just for the floating cart badge so it doesn't look broken. Decorative elements are hidden outright rather than merely stopped, avoiding wasted layout. This CSS-level kill switch backs up the JS-level `isMobile` gating in [2.2](#22-conditional-rendering-by-device) — belt and suspenders against janky animation on low-power devices.

---

## 9. Performance Optimizations

### 9.1 Route-Level Code Splitting

**File:** `src/pages/flavours/Flavours.tsx`

```typescript
const WeeklyGallery      = lazy(() => import("./WeeklyGallery"));
const SpecialtyFlavours  = lazy(() => import("./SpecialtyFlavours"));
const ClassicFlavours    = lazy(() => import("./ClassicFlavours"));

<Suspense fallback={null}>
  <WeeklyGallery />
</Suspense>
```

Each flavours tab is its own lazy-loaded chunk, so switching tabs is the only thing that triggers that tab's bundle download — the initial page load never pays for code the visitor might not view. `fallback={null}` is a deliberate choice: the chunks are small enough that a loading spinner would just flicker.

### 9.2 Native Lazy-Loading Images

```tsx
<img src={flavours[i].src} loading="lazy" alt={flavours[i].name} />
<img src={polaroid.src} loading="lazy" decoding="async" alt={polaroid.caption} />
```

`loading="lazy"` + `decoding="async"` defer and de-block off-screen gallery images using only browser-native attributes — no intersection-observer library needed for a page with dozens of flavour photos.

### 9.3 Optimize the Layer That Matters

The codebase deliberately skips `useMemo`/`useCallback`/`React.memo` in the preorder form and decoration components. The reasoning: form inputs need to re-render on every keystroke anyway, decorations are already gated out entirely on mobile (not just hidden), and the expensive stuff (flavour gallery tabs) is handled via `lazy()` route splitting instead. Rather than micro-optimizing re-renders that don't cost much, the app disables the actually-expensive work (animations, unmounted bundles) at the source.

---

## Key Takeaways

**State**
1. Lazy `useState` initializers avoid redundant `localStorage`/computation work on every render
2. Dual-mode setters (`value | updater`) keep context APIs ergonomic
3. Derive computed values (`totalItems`) instead of storing and syncing them

**Animation**
1. Config objects/functions over inline props keep JSX readable and reusable
2. Gate expensive animations by device (`isMobile`) both in JS *and* CSS

**Architecture**
1. Union types for wizard steps make invalid states unrepresentable
2. Explicitly invalidate dependent steps when upstream state changes
3. Duplicate small, critical logic (date math) across files only with a loud warning comment — don't force an awkward shared dependency for five lines

**Integrations**
1. `Promise.all` for multi-recipient email sends so confirmation waits on all of them

---

**Project:** Moon Treatz
**Tech Stack:** React 18, TypeScript, Vite, Framer Motion, EmailJS, React Router
