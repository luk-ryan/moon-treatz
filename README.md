# Moon Treatz — Website

Business website for Moon Treatz, a French macaron bakery based in Vaughan, ON offering weekly special boxes and bulk catering orders.

---

## Tech Stack

|------------|---------------------------------------|
| Framework  | React 19 + TypeScript 5.8             |
| Build      | Vite 7                                |
| Routing    | React Router DOM 7                    |
| Animations | Framer Motion 12                      |
| Email      | EmailJS                               |
| Styling    | CSS Custom Properties (design tokens) |

---

## Pages

| Route        | Description                                                |
|--------------|------------------------------------------------------------|
| `/`          | Home — hero, about, weekly special, catering menu, contact |
| `/flavours`  | Flavour catalogue + weekly specials gallery                |
| `/pre-order` | Multi-step pre-order form (weekly box + catering)          |

---

## Weekly Maintenance

### ➕ Add a New Weekly Special

1. **Add photos** to `frontend/public/flavours/weekly_specials/`
2. **Add a transparent cutout** to `frontend/public/flavours/weekly_specials/transparent/`
3. **Register it** in `frontend/src/config/weeklySpecials.ts` — append a new entry to `weeklySpecials[]`:

```ts
{
  id: N,                                        // next integer after the last entry
  flavours: ["Flavour One", "Flavour Two", "Flavour Three"],
  displayImage: "/flavours/weekly_specials/transparent/weekly_special_N.png",
  images: [
    "/flavours/weekly_specials/weekly_special_N(box-view).jpg",
    "/flavours/weekly_specials/weekly_special_N(side-view).jpg",
    "/flavours/weekly_specials/weekly_special_N(top-view).jpg",
  ],
},
```

The entry with the **highest `id`** is automatically used as the current featured special on the home page and in the pre-order form.

---

### 📅 Set the Next Pre-Order Open Date

Open `frontend/src/config/preOrderForm.ts` and update `preOrderOpenDate`:

```ts
// Format: "YYYY-MM-DD"
export const preOrderOpenDate: string = "2026-07-18";
```

- A countdown timer will display on the site until that date arrives, then the form opens automatically.
- To **force-close** the form at any time regardless of the date, set `preOrderClosed = true`.
- To **re-open**, set `preOrderClosed = false` (and update `preOrderOpenDate` to the next release date).

---

## Project Structure

```
frontend/
├── public/
│   ├── background/         # Background cloud/sky images
│   ├── flavours/           # Macaron flavour images + weekly special photos
│   ├── form/               # Catering package card images
│   ├── icons/              # UI icons (email, phone, instagram, macaron)
│   ├── labels/             # Allergen icons
│   └── logo/               # Site logo assets
│
└── src/
    ├── components/         # Reusable UI components
    │   ├── home/           # MenuItem, OrderButton
    │   ├── preorder/       # Cart panel, flavour cards, review modal, etc.
    │   └── decorations/    # Background butterflies, clouds, macarons, sparkles
    │
    ├── config/             # ⭐ Site configuration (edit these for content updates)
    │   ├── weeklySpecials.ts   # Weekly special entries + images
    │   ├── preOrderForm.ts     # Form open date + manual close toggle
    │   ├── catering.ts         # Package sizes, prices, images
    │   ├── flavours.ts         # Full flavour list for the catalogue
    │   ├── emailjs.ts          # EmailJS service/template IDs
    │   └── animations.ts       # Shared framer-motion variants
    │
    ├── context/
    │   └── CartContext.tsx     # Global cart state (persisted to localStorage)
    │
    ├── hooks/
    │   ├── useCountdownTimer.ts
    │   └── useIsMobile.ts
    │
    ├── layouts/            # Header, Navbar, Footer, Logo
    ├── pages/
    │   ├── home/           # Home, Menu, WeeklyBox, Contact
    │   ├── flavours/       # Flavours catalogue, WeeklyGallery
    │   └── preorder/       # Multi-step PreOrder wizard
    │
    ├── styles/
    │   ├── tokens/         # colors.css, typography.css
    │   ├── base/           # reset.css, base.css
    │   ├── pages/          # home.css, flavours.css, preorder.css
    │   ├── mobile/         # mobile.css — all @media (max-width: 600px) overrides
    │   └── animations/     # animations.css — all @keyframes definitions
    │
    ├── types/types.ts      # Shared TypeScript types
    └── utils/
        └── scheduleFormat.ts   # Converts pickup date slugs → human-readable labels
```

---

## Email (EmailJS)

Two emails are sent on order confirmation:

| Template                       | Purpose                                   |
|--------------------------------|-------------------------------------------|
| `EMAILJS_TEMPLATE_ID`          | Order notification sent to the business   |
| `EMAILJS_CUSTOMER_TEMPLATE_ID` | Receipt confirmation sent to the customer |

Configure IDs and the public key in `frontend/src/config/emailjs.ts`.

---