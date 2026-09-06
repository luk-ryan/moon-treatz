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

Global shopping cart that survives page refreshes, tab closes, and re-visits, by mirroring itself into `localStorage` on every change.

#### Restoring on mount

```typescript
const [cart, setCartState] = useState<CartState>(() => {
  // The function passed to useState only runs ONCE, on the very first render.
  // (Without the function wrapper, this whole block would re-run on every render.)
  try {
    const saved = localStorage.getItem(STORAGE_KEY);   // Look for a cart from last time

    return saved
      ? { ...CART_INIT, ...JSON.parse(saved) }          // Found one — merge it over the defaults
      : CART_INIT;                                      // Nothing saved — start from empty cart
  } catch {
    return CART_INIT;                                  // Storage blocked/corrupted — fail safe
  }
});
```

**Why merge instead of just returning the saved cart?**
```
{ ...CART_INIT, ...JSON.parse(saved) }
         ↑                ↑
   defaults first    saved values override
```
If a new product (say `c90`) gets added to `CartState` next month, an *old* saved cart from before that change won't have a `c90` key in it. Spreading `CART_INIT` first guarantees every key always has a value — `saved` just overwrites the ones it actually has.

#### Writing + persisting

```typescript
const setCart = (update: CartState | ((prev: CartState) => CartState)) => {
  setCartState(prev => {
    // Accept either a plain new object OR an updater function — same API as useState's setter
    const next = typeof update === "function" ? update(prev) : update;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));  // Save on every single change
    } catch {
      /* private browsing / storage full — cart just won't persist, app keeps working */
    }

    return next;
  });
};

// totalItems is NOT its own useState — it's calculated fresh from `cart` every render,
// so it can never fall out of sync with what's actually in the cart.
const totalItems = Object.values(cart).reduce((sum, v) => sum + v, 0);
```

#### Usage

```typescript
const { cart, setCart } = useCart();

// Works exactly like useState's setter:
setCart(prev => ({ ...prev, c20: prev.c20 + 1 }));
```

**Key Concepts:**
- **Lazy initializer** — the `localStorage` read happens once on mount, never on re-renders
- **Merge-on-restore** — protects against missing keys when the cart's shape changes later
- **Dual-mode setter** — one function handles both "set to this value" and "update from previous value"
- **Silent failure** — a storage error degrades gracefully instead of crashing the app
- **Computed value** — `totalItems` is derived, never stored, so it's always accurate

---

## 2. Animations

### 2.1 Framer Motion Config Objects

**File:** `src/config/animations.ts`

Reusable animation presets, exported as plain objects/functions instead of being written inline inside JSX every time.

```typescript
export const butterflyEntrance = {
  initial:     { opacity: 0, x: -200, scale: 0.3 },   // Start: invisible, 200px to the left, tiny
  whileInView: { opacity: 1, x: 0,    scale: 1   },   // Target: fully visible, in place, full size
  exit:        { opacity: 0 },                        // If it ever unmounts, just fade
  viewport:    { once: false, amount: 0.3 },          // once:false = replay EVERY time it re-enters view
  transition: {
    // Each property gets its own timing — this is what makes the motion feel layered
    // instead of everything moving in one flat, robotic step.
    opacity: { duration: 0.6 },                                // Fade is short and simple
    x:       { duration: 0.8, type: "spring", bounce: 0.6 },   // Position springs in with overshoot
    scale:   { duration: 0.8, type: "spring", bounce: 0.5 },   // Size bounces in too, slightly less
  },
};

// A function instead of a fixed object — lets every instance get its own stagger
// with a single argument, instead of hand-writing a transition per macaron.
export const macaronTransition = (delay: number = 0) => ({
  duration: 5,
  repeat: Infinity,     // loops forever
  ease: "easeInOut",    // smooth accelerate/decelerate — no robotic linear motion
  delay,                // 14 macarons each pass a different delay so none of them move in sync
});
```

**Usage:**

```tsx
<motion.span {...butterflyEntrance} animate={{ x: [0, 35, 15, -25], transition: macaronTransition(0.5) }}>
  🦋
</motion.span>
```

**Key Concepts:**
- Config objects keep JSX clean — spread them in with `{...preset}` instead of inlining
- `once: false` on `viewport` replays the entrance every scroll, not just the first time
- Per-property `transition` timing creates layered motion instead of one flat animation
- A function-based preset (`macaronTransition(delay)`) turns "stagger N elements" into a one-line `.map()`

### 2.2 Conditional Rendering by Device

**File:** `src/components/home/HomeDecorations.tsx`

```tsx
{leftButterflies.map((butterfly, index) =>
  isMobile ? (
    // Mobile: a plain, static emoji — no animation objects ever get created
    <span key={`left-${index}`} className={`butterfly ${butterfly.className}`}>🦋</span>
  ) : (
    // Desktop: a full Framer Motion element with a multi-point flight path
    <motion.span
      key={`left-${index}`}
      className={`butterfly ${butterfly.className}`}
      {...butterflyEntrance}                 // Entrance animation from 2.1
      animate={{
        x: butterfly.xValues,                // Unique flight path per butterfly
        y: butterflyYValues,                 // Shared bobbing motion
        scaleX: butterflyScaleX,             // Shared "wing flap" effect
        rotate: butterflyRotate,             // Shared gentle tilt
        transition: butterflyTransition(butterfly.delay),
      }}
    >
      🦋
    </motion.span>
  )
)}
```

**Why this matters:** the `isMobile ? ... : ...` check happens *before* the `motion.span` is ever created — on a phone, the app never builds the keyframe arrays or animation objects at all. That's a step further than animating something and then hiding it with CSS; the expensive work simply never runs.

**Key Concepts:**
- Gate expensive animated components at the JS level, not just visually with CSS
- One boolean (`useIsMobile()`) decides which entire branch of JSX gets built

---

## 3. Component Architecture

### 3.1 Multi-Step Wizard State

**File:** `src/pages/preorder/PreOrder.tsx`

```typescript
type PackageFlavourState = { mode: "same" | "different"; boxes: string[][] };
type CateringFlavours = {
  c20: PackageFlavourState;
  c30: PackageFlavourState;
  c60: PackageFlavourState;
  c90: PackageFlavourState;
};

// Every possible screen is listed here — TypeScript will error if the code ever
// tries to set `step` to a string that isn't one of these.
const [step, setStep] = useState<
  "cart" | "catering-details" | "form" | "nks-schedule" | "catering-date" | "payment"
>("cart");

// Partial<Record<...>> = "a message for SOME form fields, not all of them"
// keyof OrderForm means adding a new form field without an error case is a type error.
const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});

// A Set of step names already visited — acts as a breadcrumb trail so the
// user can freely go back without losing their place.
const [visitedSteps, setVisitedSteps] = useState<Set<string>>(new Set(["cart"]));
```

**Auto-invalidating a dependent step:**

```typescript
useEffect(() => {
  setVisitedSteps(s => {
    if (!s.has("catering-details")) return s;   // Nothing to invalidate — skip

    const next = new Set(s);
    next.delete("catering-details");   // Force the user to revisit + re-validate
    return next;
  });
  // Runs whenever ANY catering package quantity changes
}, [cart.c20, cart.c30, cart.c60, cart.c90]);
```

**Why:** say the customer picked flavours for 3 catering boxes, then went back and bumped the quantity to 5. Their flavour picks for boxes 4 and 5 don't exist yet — so this effect kicks "catering-details" back out of the visited set, forcing the wizard to make them revisit and fill in the gap instead of silently letting an incomplete order through.

**Scroll straight to the first error:**

```typescript
useEffect(() => {
  const hasErrors = Object.values(errors).some(Boolean) || Object.values(flavourErrors).some(Boolean);
  if (!hasErrors) return;   // Nothing to do

  document
    .querySelector<HTMLElement>(".preorder-error")   // Grab the first error message on the page
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}, [errors, flavourErrors]);
```

**Key Concepts:**
- Union type for `step` makes an invalid screen name impossible at compile time
- `Partial<Record<keyof OrderForm, string>>` ties error messages directly to the form's own fields
- A `Set` breadcrumb trail supports free back-navigation without re-deriving history
- Changing upstream state (quantity) can deliberately "un-visit" a downstream step

### 3.2 Constrained Checkbox Group

**File:** `src/components/preorder/primitives/CheckboxGroup.tsx`

```typescript
const toggle = (opt: string) => {
  if (selected.includes(opt)) {
    onChange(selected.filter((f) => f !== opt));   // Already picked — remove it
  } else if (selected.length < max) {
    onChange([...selected, opt]);                  // Room left — add it
  }
  // else: at the limit and this option isn't selected — do nothing
};

// Deliberately asymmetric: once `max` is reached, only UNCHECKED options disable.
// Already-checked options stay clickable so the user can still deselect one.
const disabled = !checked && selected.length >= max;
```

A naive `disabled = selected.length >= max` would lock the user out of fixing their own selection once the limit is hit — they'd have no way to uncheck anything. The `!checked &&` half of the condition is what keeps already-selected options interactive.

**Key Concepts:**
- Disable logic only blocks *new* selections, never existing ones
- Wrapping the `<input>` and text in one `<label>` makes the whole row clickable

### 3.3 Smart Lazy-Init for Expand/Collapse State

**File:** `src/components/preorder/CateringFlavourCard.tsx`

```typescript
const [expandedBoxes, setExpandedBoxes] = useState<Set<number>>(() => {
  // Runs once on mount: pre-expand any box that ALREADY has a specialty flavour picked,
  // so returning users immediately see their existing choice instead of a collapsed panel.
  const initial = new Set<number>();

  pkgState.boxes.forEach((box, i) => {
    if (box.some(f => SPECIALTY_FLAVOUR_NAMES.includes(f))) {
      initial.add(i);
    }
  });

  return initial;
});
```

**Key Concepts:**
- The lazy initializer inspects existing state to decide the *starting* UI state
- Avoids a jarring "where did my selection go" moment when re-opening the form

### 3.4 Rolling Pickup-Week Date Math

**File:** `src/components/preorder/sections/OrderCalendar.tsx`

The shop always sells for a specific upcoming Thursday–Saturday. This code has to find "the next pickup weekend" starting from any arbitrary date.

```typescript
const anchor = new Date(preOrderOpenDate + "T00:00:00");

// Step 1: find the Thursday that belongs to the SAME week as `anchor`,
// no matter which day of the week anchor itself falls on.
const daysToThu = ((4 - anchor.getDay() + 3) % 7) - 3;
const thu = new Date(anchor);
thu.setDate(anchor.getDate() + daysToThu);

// Step 2: Saturday is always 2 days after that Thursday
const sat = new Date(thu);
sat.setDate(thu.getDate() + 2);

// Step 3: if that weekend has already passed, jump forward a full week at a time
// until we land on the next weekend that's still in the future.
while (sat <= today) {
  thu.setDate(thu.getDate() + 7);
  sat.setDate(sat.getDate() + 7);
}
```

#### Core Math: `((4 - anchor.getDay() + 3) % 7) - 3`

`getDay()` returns 0 for Sunday up through 6 for Saturday, and Thursday is `4`. Plugging in every possible day shows the formula always lands on the Thursday closest to `anchor`, within the same Sun–Sat week:

| `anchor.getDay()` | Result of formula | Meaning |
|---|---|---|
| 0 (Sun) | −3 | Thursday was 3 days ago |
| 1 (Mon) | +3 | Thursday is 3 days away |
| 2 (Tue) | +2 | Thursday is 2 days away |
| 3 (Wed) | +1 | Thursday is tomorrow |
| 4 (Thu) | 0 | Anchor IS Thursday |
| 5 (Fri) | −1 | Thursday was yesterday |
| 6 (Sat) | −2 | Thursday was 2 days ago |

The `while (sat <= today)` loop then does the simple part: keep adding 7 days to both `thu` and `sat` until the Saturday is somewhere in the future. This exact formula is intentionally copy-pasted (not shared via import) into `scheduleFormat.ts` — see [5.1](#51-mirrored-date-math-with-an-explicit-warning-comment) — so the calendar, the review modal, and the confirmation email can never disagree about which week "next Thursday" refers to.

**Key Concepts:**
- Modular arithmetic finds a fixed weekday relative to any starting date
- A `while` loop rolls a date forward in fixed-size (weekly) jumps until a condition is met

---

## 4. Configuration Patterns

### 4.1 Layered Availability Flags

**File:** `src/config/preOrderForm.ts`

```typescript
export const preOrderOpenDate: string = "2026-09-03";   // Date the form opens automatically
export const preOrderClosed: boolean = false;            // Hard kill-switch — overrides everything
export const preOrderForceOpen: boolean = true;          // Hard override — open early regardless of date

export const isPreOrderFormAvailable = (): boolean => {
  if (preOrderClosed) return false;                       // Highest priority: shop owner said "closed"
  return Date.now() >= new Date(preOrderOpenDate).getTime();  // Otherwise, just check the date
};
```

Three flags give three levels of manual control over one feature, checked in priority order: a hard kill-switch, a hard early-open override, then the default date-based gate. The site can be toggled without touching a single component.

**Key Concepts:**
- Check the highest-priority override first, then fall through to the default logic
- Boolean flags in config make behaviour changes a one-line edit, not a code change

### 4.2 `as const` for Exhaustive Literal Keys

**File:** `src/config/catering.ts`

```typescript
export const CATERING_SIZES = [
  // "as const" narrows the type from `string` down to the literal "c20" itself.
  // Without it, TypeScript would just see `key: string`, and couldn't check
  // that every package key is handled somewhere else in the code.
  { key: "c20" as const, label: "20 Macarons", unitPrice: 35, maxFlavours: 2 },
  { key: "c30" as const, label: "30 Macarons", unitPrice: 50, maxFlavours: 3 },
];

// Partial<Record<...>> = "a value for SOME keys is fine" — a package without
// a photo yet doesn't need a placeholder just to satisfy the type checker.
export const CATERING_IMAGES: Partial<Record<string, string>> = {
  c20: "/form/CateringBox_20.jpg",
};
```

**Key Concepts:**
- `as const` turns a generic `string` into a specific literal type TypeScript can check against
- `Partial<Record<K, V>>` lets a lookup map skip entries without breaking type-checking

---

## 5. Utility Logic

### 5.1 Mirrored Date Math (with an explicit warning comment)

**File:** `src/utils/scheduleFormat.ts`

```typescript
function getPickupWeekDates() {
  // [Mirror of OrderCalendar.getPickupWeek() — MUST stay synchronized]
  const anchor = new Date(preOrderOpenDate + "T00:00:00");
  const daysToThu = ((4 - anchor.getDay() + 3) % 7) - 3;   // Same formula as section 3.4
  // ...identical logic to OrderCalendar
}
```

**Turning a raw slot string into something readable:**

```typescript
// Example input: "nks-thursday-430-500pm"
const nksMatch = pickupDate.match(/^nks-(thursday|friday)-(.+)$/);
//                                     \_______________/ \___/
//                                       group 1: day     group 2: the time chunk, e.g. "430-500pm"

if (nksMatch) {
  const timeMatch = nksMatch[2].match(/^(\d{1,2})(\d{2})-(\d{1,2})(\d{2})(am|pm)$/);
  //                                     \____/\__/  \____/\__/ \___/
  //                                     start hr min  end hr min  am/pm

  const timeStr = timeMatch
    ? `${timeMatch[1]}:${timeMatch[2]} \u2013 ${timeMatch[3]}:${timeMatch[4]} ${timeMatch[5]}`
    //    "4"          "30"              "5"        "00"           "pm"   →  "4:30 – 5:00 pm"
    : nksMatch[2];   // Format didn't match — just show the raw string instead of crashing

  return { label: fmtDate(dateObj), time: `${timeStr} (NKS)` };
}
```

The regex breaks "430-500pm" into 5 capture groups (start hour, start minute, end hour, end minute, am/pm) and reassembles them into `4:30 – 5:00 pm` — note that's a real Unicode en-dash (`\u2013`), not a hyphen, for correct typography in the email/UI.

**Why is the date math copy-pasted instead of imported from `OrderCalendar`?** It's a deliberate trade-off: `OrderCalendar` is a component, this is a plain utility file, and importing one from the other for five lines of arithmetic isn't worth the coupling. Instead, the duplication is flagged with a loud comment so future edits know to update both places together.

**Key Concepts:**
- Named capture groups (via numbered groups) turn an opaque string ID into human-readable output
- A fallback (`: nksMatch[2]`) means an unexpected format degrades instead of throwing
- Sometimes a warning comment is a better trade-off than a forced shared abstraction

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
export const EMAILJS_TEMPLATE_ID = "template_j990dk1";          // Full order details → shop owner
export const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_is8hbu7"; // Short receipt → customer
```

```typescript
// Both emails are sent together, and the confirmation screen only appears
// once BOTH have finished — not just the first one that resolves.
await Promise.all([
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    customer_name: form.name,
    order_summary: orderSummary,                              // Built from the cart's line items
    schedule: `${pickupInfo?.label} ${pickupInfo?.time}`,     // Human-readable pickup slot
    payment_method: form.paymentMethod,
    // ...remaining template variables
  }, EMAILJS_PUBLIC_KEY),

  emailjs.send(EMAILJS_CUSTOMER_TEMPLATE_ID, {
    customer_name: form.name,
    customer_email: form.email,
  }, EMAILJS_PUBLIC_KEY),
]);

setSubmitted(true);   // Only flips after both sends resolve
clearCart();
```

**Why `Promise.all` instead of sending one, then the other?** If the two sends were sequential and the app showed "success" after just the first one, the shop owner's order notification could still be silently failing in the background while the customer walks away thinking everything's fine. Waiting on both together means a failure surfaces before the confirmation screen appears.

**Key Concepts:**
- Two templates for two audiences: a detailed internal one, a short customer-facing one
- `Promise.all([...])` waits for every promise, not just the first
- Object keys sent to `emailjs.send()` must match the `{{template_variable}}` names inside the EmailJS dashboard template exactly

---

## 8. Mobile Responsiveness

**File:** `src/styles/mobile/mobile.css`

```css
@media (max-width: 600px) {
  /* Kill switch: nothing animates or transitions on small screens, full stop */
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }

  /* Glow effects are expensive to paint/repaint — strip them everywhere */
  * {
    text-shadow: none !important;
    box-shadow: none !important;
  }

  /* Explicitly re-enable a minimal look for ONE element so it doesn't appear broken */
  .floating-cart {
    box-shadow: 0 0 0 2px #c9a227, 0 0.25rem 0.75rem rgba(0, 0, 0, 0.5) !important;
    border: 2px solid #c9a227 !important;
  }

  /* Background decorations are hidden outright, not just stopped, to skip layout cost too */
  .butterfly, .sparkle, .cloud { display: none; }
}
```

The breakpoint (≤600px) matches `useIsMobile`'s `MOBILE_BREAKPOINT` exactly. This CSS acts as a blanket safety net *underneath* the JS-level gating from [2.2](#22-conditional-rendering-by-device) — even if some animated element slips through a JS check, this `!important` rule stops it from ever actually animating on a low-power device.

**Key Concepts:**
- One global rule (`animation: none !important`) is simpler and safer than disabling animations component-by-component
- Explicitly re-enable the few exceptions that would otherwise look visually broken
- Belt-and-suspenders: gate expensive work in both JS (don't render it) and CSS (don't animate it)

---

## 9. Performance Optimizations

### 9.1 Route-Level Code Splitting

**File:** `src/pages/flavours/Flavours.tsx`

```typescript
// Each of these only downloads its code when it's actually rendered for the first time
const WeeklyGallery      = lazy(() => import("./WeeklyGallery"));
const SpecialtyFlavours  = lazy(() => import("./SpecialtyFlavours"));
const ClassicFlavours    = lazy(() => import("./ClassicFlavours"));

<Suspense fallback={null}>
  {/* fallback={null}: chunks are small enough that a spinner would just flicker */}
  <WeeklyGallery />
</Suspense>
```

Switching tabs is the only thing that triggers a chunk download for that tab — the initial page load never pays for gallery code the visitor might never click into.

### 9.2 Native Lazy-Loading Images

```tsx
<img src={flavours[i].src} loading="lazy" alt={flavours[i].name} />
<img src={polaroid.src} loading="lazy" decoding="async" alt={polaroid.caption} />
```

- `loading="lazy"` — the browser only fetches the image once it's about to scroll into view
- `decoding="async"` — decoding the image data happens off the main thread, so it can't block rendering

Both are plain HTML attributes — no intersection-observer library needed for a page with dozens of flavour photos.

### 9.3 Optimize the Layer That Matters

The codebase deliberately skips `useMemo`/`useCallback`/`React.memo` in the preorder form and decoration components. The reasoning:

- Form inputs need to re-render on every keystroke anyway — memoizing them wouldn't save much
- Decorations are already gated out entirely on mobile (not rendered at all, not just hidden)
- The genuinely expensive part (flavour gallery tabs) is handled with `lazy()` route splitting instead

**Skip when:** the win is smaller than the complexity `useMemo`/`useCallback` add.
**Use instead:** disable the actually-expensive work at the source (don't render it, don't animate it, don't bundle it) rather than micro-optimizing re-renders that don't cost much.

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

**Performance**
1. Route-level `lazy()` + `Suspense` for content the user might not view
2. Native `loading="lazy"` / `decoding="async"` over JS-based lazy-load libraries
3. Disable expensive work at the source (don't render/animate it) instead of micro-optimizing re-renders that are already cheap

---

**Project:** Moon Treatz
**Tech Stack:** React 18, TypeScript, Vite, Framer Motion, EmailJS, React Router
