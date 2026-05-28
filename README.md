# Mongolian Good Travel — Official Website

Professional marketing site for **Mongolian Good Travel LLC** (MGT). Multi-page React app with full trilingual support (MN / EN / KR) and official partnership integration with Konkuk University Glocal Campus. Built with **Vite + React + React Router + Tailwind CSS v3**. Deploys on **Vercel** via **GitHub**.

> 📝 **Editing the site?** See **[CONTENT-EDITING.md](./CONTENT-EDITING.md)** for the non-developer guide to editing prices, photos, trips, and translations directly from github.com.

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero carousel, featured trips, **interactive 3D Mongolia globe**, destinations, partnership strip |
| `/trips` | All trips with destination + style filters |
| `/trips/:slug` | Single trip detail with itinerary + booking sidebar |
| `/destinations` | All destinations grid |
| `/destinations/:slug` | Country page with highlights + matching trips (Mongolia page also gets the globe) |
| `/ways-to-travel` | All travel styles |
| `/ways-to-travel/:slug` | Single style with matching trips |
| `/deals` | All sale trips |
| `/study-abroad` | Konkuk Glocal Campus partnership page |
| `/about` | Company story, stats, values, reviews |
| `/contact` | Contact info + inquiry form |
| `*` | 404 page |

## Stack

- Vite 6 + React 18
- React Router DOM 6 (multi-page routing)
- Tailwind CSS 3.4
- Lucide React (icons)
- **react-globe.gl + three.js** (interactive 3D globe — lazy-loaded, only fetched when user scrolls to the section)
- Fonts: **Onest** (display + body) + **Fraunces italic** (accent)
- Gzipped on first paint: ~90 KB JS, ~7 KB CSS · globe chunk loads on-demand

## Local development

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

Output in `dist/`.

## Deploy on Vercel

1. `git init && git add . && git commit -m "init: MGT site"`
2. Push to GitHub.
3. vercel.com → **Add New → Project** → import. Framework auto-detects as Vite. Click Deploy.
4. Add `mongoliangoodtravel.mn` in **Settings → Domains**.

## Languages (MN / EN / 한국어)

Three languages are fully wired:

- **Mongolian (MN)** — default
- **English (EN)**
- **Korean (한국어)**

Switch in the top-right of the navbar (desktop dropdown) or in the mobile menu. The choice is saved to `localStorage` so it persists across visits, and the browser language is auto-detected on first visit.

How it works: `src/i18n/LanguageContext.jsx` exports `LangProvider`, `useLang()`, and `useT()`. In any component:

```jsx
import { useT } from '../i18n/LanguageContext'

function MyComponent() {
  const t = useT()
  return <h1>{t({ mn: 'Сайн уу', en: 'Hello', kr: '안녕하세요' })}</h1>
}
```

To add new translatable strings, add a key under `ui` in `src/data/content.js` with `{ mn, en, kr }` and use `t(ui.yourKey)` in components.

## Editing content

`src/data/content.js` is the single source of truth for **everything**:

- `company`: phone, email, address, hours, socials
- `promoMessages`: rotating top promo bar messages
- `nav`: top navigation + mega-menu items
- `trips`: featured trip cards (title, image, days, price, rating, etc.)
- `destinations`: photo tiles (image, name, trip count)
- `styles`: trip style chips (Culture, Adventure, Family, etc.)
- `stats`, `pillars`, `reviews`, `stories`: all other content blocks

To change a price, photo, or destination, edit this file only.

## Brand system

`tailwind.config.js`:

- `brand.blue` `#1735C8` — logo blue, primary
- `brand.red` `#E5331F` — logo red, primary accent
- `sun` `#F59E0B` — highlights / prices
- `sky` `#0EA5E9`, `steppe` `#15803D`, `clay` `#C2410C`, `plum` `#7C2D92` — category accents
- `bone` `#FAFAF7` — page background
- `cream` `#FEF7E7` — promotional blocks
- `ink` `#0A1854` — body text

Each color has a `-soft` variant for backgrounds.

## File structure

```
src/
├── App.jsx                       # routes
├── main.jsx                      # entry — BrowserRouter + LangProvider
├── index.css                     # tailwind + custom utilities
├── i18n/
│   └── LanguageContext.jsx       # MN/EN/KR provider, useT(), useLang()
├── data/                         # 📝 EDIT THESE for content changes
│   ├── index.js                  # barrel — re-exports everything
│   ├── company.js                # phone, email, address, social
│   ├── nav.js                    # top menu + promo bar
│   ├── hero.js                   # home hero carousel
│   ├── trips.js                  # all trip cards
│   ├── destinations.js           # country pages
│   ├── styles.js                 # travel style categories
│   ├── partners.js               # Konkuk + partner orgs
│   └── misc.js                   # stats, pillars, reviews, stories
├── pages/                        # one component per route
│   ├── Home.jsx
│   ├── TripsPage.jsx             # /trips with filters
│   ├── TripDetailPage.jsx        # /trips/:slug
│   ├── DestinationPages.jsx      # /destinations and /destinations/:slug
│   ├── StylePages.jsx            # /ways-to-travel and /:slug
│   ├── DealsPage.jsx             # /deals
│   ├── StudyAbroadPage.jsx       # /study-abroad — Konkuk
│   ├── AboutPage.jsx             # /about
│   └── ContactPage.jsx           # /contact + 404
└── components/
    ├── shared/
    │   ├── PageHero.jsx          # sub-page hero + breadcrumbs
    │   └── TripCard.jsx          # the trip card used everywhere
    ├── PromoBar.jsx
    ├── Nav.jsx                   # sticky header + mega menu + language switcher
    ├── Hero.jsx                  # home hero (carousel + search widget)
    ├── TrustStrip.jsx
    ├── FeaturedTrips.jsx
    ├── Destinations.jsx
    ├── ByStyle.jsx
    ├── WhatSetsUsApart.jsx
    ├── Reviews.jsx
    ├── PartnersStrip.jsx         # home page Konkuk callout
    ├── Stories.jsx
    ├── CTA.jsx
    └── Footer.jsx
```

## Logo files

- `public/logo.png` — transparent, used in nav and CTA banner
- `public/logo-white.png` — white version for the dark footer

## Next steps

1. Replace Unsplash photo URLs in `src/data/content.js` with your own photography (1200–2000px JPG, q80).
2. Connect the newsletter form to your email provider.
3. Wire the search widget in `Hero.jsx` to actual filters when you build trip detail pages.
4. Add Google Analytics / Plausible in `index.html`.

---

For MGT, 2026. 🏔️
