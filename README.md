# KenaKata — Modern Storefront

## Project Overview

KenaKata is a Next.js 15 storefront demo built as a product shopping experience. It uses the App Router, Tailwind CSS, and dynamic data from the EscuelaJS public API to show products, categories, product detail pages, cart state, authentication flows, and theme support. The app targets a polished shopping UI with animations, featured product sections, category browsing, and a persistent cart.

## Architecture Explanation

- **Framework:** Next.js 15 App Router with React 19.
- **Layout:** `app/layout.tsx` defines a global HTML shell and wraps content in a shared `ShellLayout` component.
- **Routing:** App Router folders under `app/` provide route-based rendering for home, products, categories, checkout, cart, and auth.
- **Data Layer:** `lib/api.ts` centralizes API requests and defines typed endpoints for products and categories.
- **State Management:** `lib/store.ts` uses `zustand` with persistence to manage cart state across sessions.
- **UI components:** Reusable UI lives in `components/`, including product cards, filters, headers, footers, and layout shells.
- **Providers:** `app/providers.tsx` applies theme support with `next-themes` and toast notifications with `sonner`.

## Rendering Strategy Decisions

- **Server Components by default:** Most pages are built as server components to fetch product/category data at request time and reduce client bundle size.
- **Client Components for interactivity:** Components requiring browser state or event handling are marked `'use client'`, such as `ProductCard`, `ShellLayout`, cart store access, theme provider, and auth-related routes.
- **Data fetching:** `api.products.getAll` and `api.products.getById` use `fetch` with `{ cache: 'no-store' }` for product freshness, while category endpoints use `next: { revalidate: 3600 }` for a lightweight cache.
- **Hybrid rendering:** The home page performs server-side data fetching and renders a static shell with dynamic product/category content, while the client-side cart and wishlist interactions enhance UX without forcing full hydration of all UI.

## Tradeoffs Made

- **Freshness vs. caching:** Products are fetched with `no-store` to keep listings current, at the cost of more API calls. Categories use hourly revalidation to balance performance and staleness.
- **Client bundle size:** Interactive components are isolated as client components to reduce hydration overhead, but this splits render boundaries and adds complexity.
- **Design polish vs. feature scope:** The app focuses on UI/UX and product browsing rather than a complete backend-auth workflow. Authentication pages exist in structure, while core commerce flows are prioritized.
- **Third-party dependencies:** Using `zustand`, `sonner`, `next-themes`, and `lucide-react` speeds development and UI polish, but increases dependency surface.

## Performance Considerations

- **Next.js server rendering:** Server-side rendering for landing and list pages improves first contentful paint and SEO.
- **Image optimization:** `next/image` is used consistently for product and category visuals.
- **Selective hydration:** Only interactive pieces hydrate on the client, reducing unnecessary JavaScript execution for static content.
- **Persistent cart store:** `zustand` persistence keeps cart contents across reloads without repeated fetches.
- **Responsive layout:** Tailwind utility classes are used for responsive grids, meaning fewer CSS overrides and consistent layout performance.

## Challenges Faced

- **App Router boundaries:** Balancing server and client component usage required careful separation to avoid hydration issues and maintain the cart state.
- **API usage:** Ensuring product and category endpoints returned usable data while handling network errors and caching semantics.
- **UI responsiveness:** Building an adaptive storefront design across home, category, and product pages required deliberate layout decisions and responsive card styling.
- **State persistence:** Implementing a cart with persistent local storage via `zustand` while keeping the store simple and type-safe.

## Future Improvements

- Add a complete authenticated user session flow with real login/register handling and secure checkout.
- Implement server-side cart persistence and order history storage.
- Add more robust product filtering, sorting, and search capabilities.
- Introduce pagination or infinite scroll for product lists.
- Add localized pricing, currency support, and multi-language content.
- Improve accessibility with ARIA labels, keyboard navigation, and semantic form handling.

## Run Locally

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Build

- Production build: `npm run build`
- Start production server: `npm start`
- Run tests: `npm test`
