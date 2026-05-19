<div align="center">

# 🛍️ KenaKata.com

### A Production-Style E-Commerce Storefront · Capstone Assignment

Built with **Next.js 15** · **TypeScript** · **App Router** · **Tailwind CSS v4**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-kenakata--shop.netlify.app-E8472A?style=for-the-badge&logo=netlify&logoColor=white)](https://kenakata-shop.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Architecture Explanation](#-architecture-explanation)
- [Rendering Strategy Decisions](#-rendering-strategy-decisions)
- [Tradeoffs Made](#-tradeoffs-made)
- [Performance Considerations](#-performance-considerations)
- [Challenges Faced](#-challenges-faced)
- [Future Improvements](#-future-improvements)
- [Scripts Reference](#-scripts-reference)
- [Contributors](#-contributors)

---

## 🎯 Project Overview

**KenaKata.com** is a full-featured, production-style e-commerce storefront built as a capstone frontend engineering assignment. It demonstrates the full breadth of modern Next.js 15 App Router capabilities — server components, server actions, middleware, streaming, and fine-grained client/server boundaries — applied to a realistic shopping experience.

Users can browse thousands of products, filter and sort by multiple criteria, save items to a wishlist, manage a persistent shopping cart, and complete a validated multi-step checkout flow. Authentication is implemented end-to-end using JWT tokens stored in HTTP-only cookies, with middleware-level route protection that fires before any page component renders.

All product and category data comes from the [Platzi Fake Store API](https://fakeapi.platzi.com/), a public REST API providing realistic e-commerce data including products, categories, and user authentication.

The project's goal was not only to ship working features but to make deliberate, justifiable engineering decisions — choosing the right rendering mode per route, keeping server and client concerns cleanly separated, and building a component library that is reusable, type-safe, and easy to extend.

---

## 🌐 Live Demo

**[https://kenakata-shop.netlify.app/](https://kenakata-shop.netlify.app/)**

> **Demo login:** `john@mail.com` / `changeme`

---

## 🛠 Tech Stack

| Category | Technology | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR, SSG, Server Actions, and streaming in one framework |
| Language | TypeScript 5.9 | End-to-end type safety across API, stores, and components |
| Styling | Tailwind CSS v4 + CSS custom properties | Utility-first speed with a token-based design system |
| State | Zustand v5 + persist middleware | Minimal boilerplate, built-in localStorage persistence |
| Forms | React Hook Form v7 + Zod v4 | Performant forms with schema-driven validation |
| Auth | Server Actions + HTTP-only JWT cookie | Token never exposed to client JavaScript |
| Notifications | Sonner | Lightweight, accessible toast system |
| Theming | next-themes | Zero-flash SSR-safe dark/light mode |
| Icons | Lucide React | Consistent, tree-shakeable icon set |
| Testing | Vitest | Fast unit testing with full ESM support |
| API | Platzi Fake Store API | Realistic free e-commerce data |
| Deployment | Netlify | Continuous deployment from GitHub |

---

## ✨ Features

<details>
<summary><strong>🏠 Home Page</strong></summary>

- Hero section with featured product card and animated sale badge
- Platform stats bar
- Category grid with hover zoom and gradient overlay
- Trending products grid with staggered entrance animations
- Full-width CTA banner
- Responsive across all screen sizes
- Light / Dark theme toggle with system preference detection

</details>

<details>
<summary><strong>🛒 Product Listing</strong></summary>

- Responsive product grid
- **Search** by product title
- **Filter sidebar** — category list + dual-handle price range slider
- **Sort dropdown** — Recommended, Price Low → High, Price High → Low, Name A → Z, Name Z → A (sort and filter are separate, independent controls)
- **Pagination** with numbered page buttons and prev/next
- Skeleton loading cards during data fetch
- Empty state with clear-filters call to action
- Error boundary fallback

</details>

<details>
<summary><strong>📦 Product Detail</strong></summary>

- Multi-image gallery with thumbnail strip, arrow navigation, and dot indicators
- Category badge, star rating, price with original and discounted display
- Quantity selector with add-to-cart state feedback
- Wishlist toggle button
- Trust tile grid (shipping, warranty, returns, authenticity)
- Related products section filtered by the same category
- Breadcrumb navigation

</details>

<details>
<summary><strong>🛍️ Cart & Checkout</strong></summary>

- Slide-in cart drawer accessible from the header on every page
- Full `/cart` page with per-item controls and order summary
- Add, remove, and update item quantities
- Cart state persisted to `localStorage` via Zustand
- Free shipping threshold indicator
- Two-step checkout: **Delivery Info → Payment Details**
- Zod schema validation with React Hook Form (field-level error messages)
- Card number and expiry auto-formatting
- Mock payment processing with spinner animation
- Order confirmation with generated order ID

</details>

<details>
<summary><strong>🔐 Authentication</strong></summary>

- Login via Server Action — JWT stored in HTTP-only cookie
- Register with auto-login on success
- Password strength meter on the registration form
- Middleware route protection (runs before any page component renders)
- Session persists across hard refresh and new tabs
- Logout Server Action deletes cookie and redirects
- After login, user is redirected to the page they originally requested

</details>

<details>
<summary><strong>💝 Wishlist</strong></summary>

- Add / remove from any product card or detail page
- Live count badge in the header
- Dedicated `/wishlist` page
- Persisted to `localStorage` via Zustand

</details>

---

## 📁 Project Structure

```
kenakata/
├── app/
│   ├── actions/
│   │   └── auth.ts              # Server Actions: login, register, logout, getSession
│   ├── cart/
│   │   └── page.tsx             # Full cart page
│   ├── categories/
│   │   └── page.tsx             # All categories grid
│   ├── checkout/
│   │   └── page.tsx             # Two-step checkout (Zod + React Hook Form)
│   ├── login/
│   │   └── page.tsx             # Login (useActionState)
│   ├── products/
│   │   ├── [id]/
│   │   │   ├── loading.tsx      # Product detail skeleton
│   │   │   ├── page.tsx         # Product detail page
│   │   │   ├── product-gallery.tsx  # Client image gallery
│   │   │   └── wishlist-button.tsx  # Client wishlist toggle
│   │   ├── loading.tsx          # Products grid skeleton
│   │   ├── page.tsx             # Product listing with filter + sort + pagination
│   │   ├── products-filter.tsx  # Client filter sidebar with price slider
│   │   └── sort-select.tsx      # Client sort dropdown
│   ├── profile/
│   │   └── page.tsx             # Protected user profile (server-rendered)
│   ├── register/
│   │   └── page.tsx             # Register with password strength
│   ├── wishlist/
│   │   └── page.tsx             # Wishlist page
│   ├── error.tsx                # Global error boundary
│   ├── globals.css              # Design tokens, animations, component styles
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Global loading fallback
│   ├── not-found.tsx            # 404 page
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # ThemeProvider + Toaster
│
├── components/
│   ├── add-to-cart-button.tsx   # Client add-to-cart with feedback state
│   ├── cart-drawer.tsx          # Slide-in cart sidebar
│   ├── footer.tsx               # Site footer
│   ├── header.tsx               # Sticky header (search, theme, cart, auth)
│   └── product-card.tsx         # Product card + skeleton variant
│
├── lib/
│   ├── api.ts                   # Typed API client (Platzi Fake Store)
│   ├── store.ts                 # Zustand cart store with persistence
│   ├── utils.ts                 # cleanImage, formatPrice, and other helpers
│   └── wishlist-store.ts        # Zustand wishlist store with persistence
│
├── middleware.ts                 # JWT validation + route protection
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.17 or higher — [nodejs.org](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tamim-cste/Assignement-03-Farman-Arefin-Tamim.git

# 2. Move into the project folder
cd Assignement-03-Farman-Arefin-Tamim

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **No `.env` file is needed.** This project uses the free, public Platzi Fake Store API with no API key required.

---

## 🏛 Architecture Explanation

### Design Philosophy

The architecture follows one guiding principle: **run logic as close to the data source as possible, and place interactivity as close to the user as possible.** In practice this means server components own all data fetching, and client components own all user interaction — with a clear, deliberate boundary between them.

### Server Components — the data layer

Pages that display product or category data (`/`, `/products`, `/products/[id]`, `/categories`, `/profile`) are async React Server Components. They call the API directly inside the component body using plain `await`, with no `useEffect` or loading state required. This delivers several concrete benefits:

- The initial HTML sent to the browser already contains the rendered product grid — no blank screen waiting for JavaScript to hydrate and fetch
- API credentials and fetch logic never appear in the client bundle
- TypeScript types flow from the API response directly to the rendered JSX with no intermediate layer

### Client Components — the interaction layer

Components that need browser APIs, React state, or event listeners carry the `'use client'` directive. The boundary is placed as low in the tree as possible to keep the client bundle small:

| Component | Why it must be a Client Component |
|---|---|
| `Header` | Scroll detection, theme toggle, `window` event listener |
| `ProductCard` | Cart/wishlist store writes, hover animation state |
| `ProductsFilter` | Slider drag state, `router.push()` on change |
| `SortSelect` | Dropdown open/close, `router.push()` on selection |
| `CartDrawer` | `CustomEvent` listener, body scroll lock |
| `CheckoutPage` | Multi-step form state, mock payment timer |
| `LoginPage` | `useActionState` to show server action pending state |

### Server Actions — the auth layer

All authentication logic lives in `app/actions/auth.ts` as Server Actions. The browser submits a standard HTML form; the server action runs exclusively on the server, calls the Platzi API, and writes the JWT to an HTTP-only cookie before redirecting:

```
Browser submits login form
        ↓
Server Action runs (server only — never in the browser)
        ↓
POST /auth/login → receives { access_token }
        ↓
cookies().set('session_token', token, { httpOnly: true, sameSite: 'lax' })
        ↓
redirect() → /profile (or originally requested page)
```

The token is stored in an **HTTP-only cookie**, making it completely inaccessible to any JavaScript running in the browser — including third-party scripts and XSS payloads. This is the most secure way to store a JWT in a web application.

### Middleware — the protection layer

`middleware.ts` intercepts requests to protected routes before any page component is even instantiated. It reads the cookie, checks for a valid JWT structure, and either allows or redirects:

```
User navigates to /checkout
        ↓
Middleware reads session_token cookie
        ↓
No cookie?  → redirect /login?redirect=/checkout
Has cookie? → request proceeds, page renders
```

No page component has to check "is the user logged in?" — that question is answered before the page exists.

### State Management

Two Zustand stores handle client-side persistence. Both use the `persist` middleware to write to `localStorage` automatically:

```
useCartStore
  └── items[]       addItem / removeItem / updateQuantity / totalPrice / clearCart

useWishlistStore
  └── items[]       toggle / isWishlisted
```

The header cart icon and the cart drawer communicate via a browser `CustomEvent` (`'open-cart'`), which means they can sit in completely different component subtrees without prop drilling or lifting state to a common ancestor.

---

## 🎨 Rendering Strategy Decisions

Every route has a deliberate rendering choice based on data freshness requirements, personalisation, and user experience expectations.

| Route | Strategy | Reasoning |
|---|---|---|
| `/` | **Dynamic SSR** | Featured products must be fresh; stale homepage data would show unavailable items |
| `/products` | **Dynamic SSR** | Filter params live in the URL; they must be read on the server to produce the correct page |
| `/products/[id]` | **Dynamic SSR** | Product prices and availability change; stale data in a checkout context is a real-world risk |
| `/categories` | **Dynamic SSR** | Categories are needed for filter context and change infrequently, but must be server-fetched |
| `/profile` | **Dynamic SSR** | Reads the `session_token` cookie on the server to fetch and display authenticated user data |
| `/cart` | **Static + Client** | Cart is entirely in Zustand/localStorage — no server data involved |
| `/checkout` | **Static + Client** | Form state is managed client-side; server action fires only on submit |
| `/login` | **Static + Client** | The page shell is static; submission is handled by a server action |
| `/register` | **Static + Client** | Same pattern as login |
| `/wishlist` | **Static + Client** | Wishlist lives in Zustand/localStorage — no server data needed |

### Why `force-dynamic`?

Next.js 15 tries to statically pre-render pages at build time whenever possible. For an e-commerce app, this is incorrect behaviour — product prices, stock, and content change frequently. All pages that fetch external data explicitly opt out of static generation with `export const dynamic = 'force-dynamic'`, ensuring they always render fresh on each request.

### Skeleton Loading with `loading.tsx`

Each data-fetching route segment has a `loading.tsx` file that renders a shimmer skeleton matching the visual shape of the real content. Next.js streams the skeleton immediately while the server component's data fetching resolves in the background. This makes pages feel instant even when the API takes a few hundred milliseconds.

---

## ⚖️ Tradeoffs Made

### 1. HTTP-only Cookie vs. localStorage for the JWT

**Chosen:** HTTP-only cookie set by a Server Action.

**Benefit:** The token is invisible to JavaScript — XSS attacks cannot steal it, and it works natively with Next.js middleware and Server Actions without any client-side token management.

**Cost:** The client cannot decode the token to read user info directly. Every page that needs the current user must call `getSession()`, which makes an API call to `/auth/profile`. This adds a round-trip on server renders that need user data (currently only `/profile`).

---

### 2. Client-side Sort and Price Filter vs. API-level

**Chosen:** Sort and price filtering applied in JavaScript after the API response.

**Benefit:** The Platzi API does not support sort order or price range as query parameters. Client-side processing makes these features work without any additional API requests.

**Cost:** With 20 items per page, the sort and filter always operate on at most 20 results rather than the full dataset. A product priced at $50 on page 3 will not appear in a $0–$60 filter applied on page 1. This is acceptable for a demo with a constrained dataset but would require backend support in production.

---

### 3. Zustand + localStorage Cart vs. Server-side Cart

**Chosen:** Entirely client-side cart with Zustand persistence.

**Benefit:** Cart operations are instantaneous — no network round-trip. The cart works without being logged in. Implementation is simple and predictable.

**Cost:** The cart is device-specific. A user who adds items on mobile and switches to desktop starts with an empty cart. A server-synced cart that merges on login would solve this but requires a backend endpoint beyond the scope of this project.

---

### 4. Mock Payment Flow vs. Real Gateway

**Chosen:** 2-second simulated delay with a success outcome.

**Benefit:** The full checkout UX — two-step form, field validation, processing animation, order confirmation with ID — is fully demonstrable without Stripe or another payment provider.

**Cost:** No real payment processing, no failed-payment recovery, no webhook-driven order persistence. These would require a backend and a real payment provider account.

---

### 5. CSS Custom Properties for Design Tokens vs. Tailwind Config

**Chosen:** Design tokens defined as CSS custom properties in `globals.css` and overridden in `.dark {}` for dark mode.

**Benefit:** CSS variables update instantly when the theme changes without re-rendering any React component. They work in both Tailwind utility classes and raw inline styles, giving complete consistency without duplication.

**Cost:** Tailwind's JIT compiler cannot statically analyse and tree-shake CSS variable references in the same way it handles config-defined values. In practice, the CSS bundle is slightly larger than it would be with a pure Tailwind approach.

---

## ⚡ Performance Considerations

### Server-side Rendering for the Critical Path

The highest-traffic pages — home, product listing, and product detail — are server-rendered. Users receive populated HTML before any JavaScript runs. This directly improves Largest Contentful Paint, since the product grid is present in the initial document rather than injected by client JavaScript after hydration.

### Minimal Client JavaScript via Selective Hydration

Client components in Next.js App Router hydrate their entire subtree. By keeping the `'use client'` boundary as low in the component tree as possible — a single card, a single dropdown — the majority of each page (layout, breadcrumbs, text content) remains lightweight, non-hydrated HTML. Less JavaScript means faster Time to Interactive.

### Automatic Image Optimisation

Every product and category image uses `next/image`, which automatically: converts images to WebP for supporting browsers, generates a `srcset` for responsive sizes, lazy-loads images below the fold, and reserves space in the layout to prevent Cumulative Layout Shift.

### Skeleton Streaming for Perceived Speed

`loading.tsx` route files allow Next.js to stream skeleton UI to the browser immediately while the server component's async data fetching completes in the background. From the user's perspective, the page structure appears instantly — the content slots fill in progressively.

### Zero Re-fetching for Persistent State

Cart and wishlist data lives in Zustand stores backed by `localStorage`. Navigating between pages never triggers a re-fetch of this state. Badge counts in the header remain accurate from the first render, and there is no flash of empty cart on navigation.

### Staggered CSS Animations

Product cards use CSS `animation-delay` classes (`.delay-1` through `.delay-8`) cycling across the grid. The first card appears immediately; subsequent cards follow in sequence. This creates the perception of progressive rendering even when all cards are actually ready at the same time, making the page feel more alive and responsive.

---

## 🧱 Challenges Faced

### 1. Placing the Server/Client Boundary Correctly

The hardest architectural challenge was deciding where exactly to draw the `'use client'` line. Drawing it too high (making entire page sections client components) defeats the SSR benefits. Drawing it too low (forcing server components to handle interactivity they can't support) produces hydration errors.

The solution was a consistent pattern: server components fetch and pass data down as serializable props; client components receive that data and handle interaction. The filter sidebar, for example, is a client component but its initial category list and selected values come from the server — it renders correctly on first load without a loading flash, then takes over for subsequent interactions.

### 2. Auth State in the Header

The `Header` is a client component (it needs scroll detection and theme access) but needs to show the logged-in user's avatar. The header cannot directly read the HTTP-only cookie. The solution was to call `getSession()` — a server action — inside a `useEffect` on mount, and re-call it whenever `pathname` changes. This adds a single async call per navigation but keeps the header's auth state in sync without requiring a full page reload or global auth context.

### 3. Middleware Token Validation Without a JWT Library

Importing a full JWT library into `middleware.ts` would significantly increase the edge middleware bundle, adding latency on every request. The pragmatic solution was structural validation only in the middleware: check that the cookie exists and has the three-dot-separated structure of a JWT. The real signature verification happens when `getSession()` calls the Platzi API with the token as a Bearer header. This keeps the middleware bundle tiny while still blocking unauthenticated users from reaching protected routes.

### 4. API Unavailability During Build

When deploying to Netlify, the Platzi API is not reachable from the build environment. Next.js's static generation phase attempted to pre-render pages by calling the API at build time — and crashed when the requests failed. The fix was `export const dynamic = 'force-dynamic'` on every page that fetches external data. This forces runtime rendering, which is actually the correct behaviour for live product data and resolved the build failure entirely.

### 5. Building a Dual-Handle Price Slider in Native HTML

HTML `<input type="range">` supports only a single thumb. The dual-handle price range slider required two overlapping range inputs sitting on the same track element, with a coloured fill bar calculated from the current min and max values. The main challenges were: managing `z-index` so the active thumb always sits on top, preventing the min thumb from crossing above the max (and vice versa), keeping the visual fill in sync on every `onChange`, and debouncing URL updates so the router doesn't fire on every pixel of drag. All achieved with no external slider library.

### 6. Malformed Image URLs from the Platzi API

Product images from the Platzi API are inconsistently formatted. Some responses contain valid URLs, others contain JSON arrays serialised as strings (`["https://..."]`), and some contain completely unparseable values. Without handling this, roughly 30% of product cards would display broken image icons.

The `cleanImage()` utility strips JSON array wrapper characters, trims whitespace, attempts to construct a `URL` object, and falls back to a deterministic Picsum Photos placeholder seeded with the product ID if the URL is invalid. This makes the product grid visually consistent regardless of API data quality.

---

## 🔮 Future Improvements

### Near-term

- **Server-side cart sync** — merge the Zustand cart with a server-side cart record on login, so the cart follows users across devices and browsers
- **Debounced live search** — replace form-submit search with a `useTransition`-backed live search that updates results as the user types
- **Product reviews** — display and submit reviews using the Platzi API's review endpoints, shown on the product detail page

### Medium-term

- **Admin dashboard** — full CRUD for products, categories, and users, gated behind `role: 'admin'` middleware protection
- **Optimistic UI for cart** — update cart totals immediately on the client before confirmation, then reconcile on failure
- **Infinite scroll** — offer infinite scroll as an alternative to pagination using the Intersection Observer API and `useInfiniteQuery`
- **Real payment integration** — integrate Stripe Elements in test mode with proper error handling and webhook-based order confirmation

### Long-term

- **Internationalisation (i18n)** — multi-language support including Bengali (বাংলা), using Next.js built-in i18n routing
- **Accessibility audit** — full WCAG 2.1 AA review: keyboard navigation for all interactive components, ARIA live regions for cart updates, focus trapping in the cart drawer
- **End-to-end tests** — Playwright test suite covering the complete purchase journey: browse → filter → add to cart → login → checkout → confirmation
- **Progressive Web App** — service worker for offline product browsing, install manifest, and push notifications for order status updates

---

## 📜 Scripts Reference

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Create an optimised production build
npm run start    # Serve the production build (requires build first)
npm run lint     # Run ESLint across the entire codebase
npm test         # Run Vitest unit tests
npm run clean    # Clear the Next.js .next build cache
```

---

## 👥 Contributors

| Name | GitHub |
|---|---|
| Farman Arefin Tamim | [@tamim-cste](https://github.com/tamim-cste) |

---

<div align="center">

**[🌐 Live Site](https://kenakata-shop.netlify.app/)** &nbsp;·&nbsp; **[📁 GitHub Repo](https://github.com/tamim-cste/Assignement-03-Farman-Arefin-Tamim)**

<sub>Built with Next.js 15 · TypeScript · Tailwind CSS v4 · Platzi Fake Store API</sub>

</div>