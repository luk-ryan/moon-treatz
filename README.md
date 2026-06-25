# Moon Treatz - Business Website

A website for Moon Treatz, a macaron catering and weekly box pre-order service.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router DOM 7
- **Animations**: Framer Motion 12
- **Styling**: CSS Custom Properties (design tokens)
- **Language**: TypeScript 5.8

## Pages

|     Route     |          Description         |
|---------------|------------------------------|
| `/`           | Landing page                 |— introduction, menu overview, weekly box, contact |
| `/flavours`   | Full flavour catalogue       |— and weekly specials gallery |
| `/pre-order`  | Two-tab pre-order form       |— (Weekly Box + Catering) |

## Pre-Order Form

`/pre-order?tab=catering` deep-links directly to the Catering tab.

> No backend is wired yet. To connect form submissions, integrate a service (e.g. EmailJS, Formspree) into the `handleSubmit` function in `src/pages/preorder/PreOrder.tsx`.

### Weekly Box Tab

Standard macaroon box with Regular or NKS Student pickup options.

|---------------------|------|
|        Field        | Req. | Format / Restrictions 
|---------------------|------|
| First + Last Name   | Yes  |— Non-empty text
| Email               | Yes  |— Must match `user@domain.tld`
| Phone               | No   |— Free text
| Instagram           | No   |— Free text (with or without `@`)
| Order Type          | Yes  |— Regular or NKS Student
| Pickup Date / Class | Yes  |— Radio — time slot (Regular) or NKS timetable row (Student)
| Quantity            | Yes  |— Integer, 1–20 via custom stepper
| Notes               | No   |— Free text
| Payment Method      | Yes  |— Cash or E-transfer
| E-transfer Email    | Yes  |— Reuired, if chosen. Must match `user@domain.tld`
| Terms & Conditions  | Yes  |— Must be checked to submit
|---------------------|------|

**Regular pickup slots:** Thu 2–3 pm, Thu 6:30–7:30 pm · Fri 2–3 pm, Fri 6:30–7:30 pm · Sat 12–1 pm, Sat 4–5 pm

### Catering Tab

For custom event and catering orders with flexible fulfillment.

| Field | Required | Format / Restrictions |
|---|---|---|
| First + Last Name | Yes | Non-empty text |
| Email | Yes | Must match `user@domain.tld` |
| Phone | No | Free text |
| Instagram | No | Free text |
| Package Size | Yes | 20 · 30 · 60 · 90 macarons (radio) |
| Flavours | Yes | Min 1; max 2 for 20-pack, max 3 for all others |
| Event Date | Yes | Free text |
| Preferred Time | No | Morning / Afternoon / Evening |
| Fulfillment | Yes | Pickup or Delivery |
| Pickup Location | If Pickup | Thornhill Woods or Dufferin Steeles (radio) |
| Delivery Address | If Delivery | Non-empty free text |
| Notes | No | Free text, max 500 characters |
| Payment Method | Yes | Cash or E-transfer |
| E-transfer Email | If E-transfer | Must match `user@domain.tld` |
| Terms & Conditions | Yes | Must be checked to submit |

**Catering package sizes:**

| Size | Flavours included | Price |
|---|---|---|
| 20 macarons | 2 flavours | $35 |
| 30 macarons | 3 flavours | $50 |
| 60 macarons | 3 flavours | $95 |
| 90 macarons | 3 flavours | $135 |

**Available flavours:** Vanilla · Chocolate · Matcha · Cookies and Cream · Salted Caramel · Red Velvet · Pistachio · Coffee · Lemon · Strawberry

## Weekly Maintenance

Each week before a new release:

1. Set `nextReleaseDate` in `src/config/preOrderForm.ts` to the upcoming release (`"YYYY-MM-DD"`)
2. Add new images to `public/flavours/weekly_specials/` and update `src/config/weeklySpecials.ts`

## Project Structure

```
frontend/src/
├── App.tsx                      # Root router + HomeDecorations + layout shell
├── main.tsx                     # React DOM entry point
├── components/
│   ├── form/
│   │   ├── FormField.tsx        # Label wrapper with required/optional/error display
│   │   ├── Input.tsx            # Styled input; supports error and narrow props
│   │   ├── Textarea.tsx         # Styled textarea with live char count
│   │   ├── RadioGroup.tsx       # Gold-styled radio list with optional sublabels
│   │   ├── CheckboxGroup.tsx    # 2-col checkbox grid with max selection enforcement
│   │   ├── Stepper.tsx          # Custom −/+ quantity control
│   │   ├── NksTimetable.tsx     # NKS class schedule grid (Thu/Fri × time slots)
│   │   ├── ContactFields.tsx    # Name / Email / Phone / Instagram field group
│   │   ├── PaymentSection.tsx   # Payment notice + Cash/E-transfer radio
│   │   └── TermsSection.tsx     # T&C notice box + required agree checkbox
│   ├── HomeDecorations.tsx      # Butterflies, clouds, sparkles (home page only)
│   ├── OrderButton.tsx          # Anchor-based CTA button; opens in new tab
│   ├── ScrollToTop.tsx          # Scrolls window to top on route change
│   └── WeeklyOrderButtons.tsx   # Countdown timer or pre-order link based on schedule
├── config/
│   ├── preOrderForm.ts          # nextReleaseDate, schedule logic, form link
│   ├── weeklySpecials.ts        # Weekly gallery image list
│   ├── animations.ts            # Shared Framer Motion transition presets
│   ├── butterflyDecorations.ts  # Butterfly animation config
│   ├── cloudDecorations.ts      # Cloud animation config
│   ├── sparkleDecorations.ts    # Sparkle animation config
│   └── macaronDecorations.ts    # Macaron floating decoration config (Flavours page)
├── hooks/
│   └── useIsMobile.ts           # Returns true when viewport ≤ 768px
├── layouts/
│   ├── Header.tsx               # Site header (Logo + Navbar)
│   ├── Navbar.tsx               # Decorative ribbon navigation bar
│   ├── Footer.tsx               # Site footer
│   └── Logo/                    # Logo component + styles
├── pages/
│   ├── home/
│   │   ├── Home.tsx             # Home page root
│   │   ├── Menu.tsx             # Product overview section
│   │   ├── MenuItem.tsx         # Individual menu item card
│   │   ├── WeeklyBox.tsx        # Weekly box section + order button
│   │   └── Contact.tsx          # Contact / social links section
│   ├── flavours/
│   │   ├── Flavours.tsx         # Flavours page root
│   │   ├── FlavourCard.tsx      # Individual flavour card
│   │   └── WeeklyGallery.tsx    # Weekly specials image gallery
│   └── preorder/
│       └── PreOrder.tsx         # Two-tab pre-order form (all logic + validation)
├── styles/
│   ├── index.css                # Imports all partials in order
│   ├── tokens/colors.css        # --clr-* and --clr-gold-* variables
│   ├── tokens/typography.css    # --fs-* scale, --ff-* families
│   ├── base/reset.css           # Box-sizing + margin/padding reset
│   ├── base/base.css            # Global element defaults
│   ├── layout/layout.css        # Header, footer, ribbon, page-wrapper
│   ├── background/background.css
│   ├── animations/animations.css
│   ├── mobile/mobile.css        # Responsive overrides (≤768px)
│   ├── utils/utils.css
│   └── pages/                   # Per-page stylesheets
│       ├── home.css
│       ├── flavours.css
│       └── preorder.css
└── types/
    └── types.ts                 # Shared TypeScript types
```
