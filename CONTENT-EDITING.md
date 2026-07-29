# Editing content on GitHub

You can change almost everything on this website without writing code, directly from github.com.
Edits push instantly through Vercel — your live site updates in ~60 seconds.

> 💡 **Important rule:** every change is a "commit". Vercel only rebuilds when you commit. The green "Commit changes" button at the bottom of the GitHub editor is what triggers the deploy.

---

## Where everything lives

All editable content is in **`src/data/`** — one file per topic.
You **only ever need to edit files inside `src/data/`**. Never touch anything else unless you know what you're doing.

| File | What it controls |
|---|---|
| `company.js` | Phone, email, address, office hours, social media links |
| `nav.js` | Top menu items + rotating promo bar messages |
| `hero.js` | Big rotating photo carousel on the home page |
| `trips.js` | Every trip card across the site (price, photo, days, etc.) |
| `destinations.js` | Country pages (Korea, Mongolia, Japan, ...) |
| `styles.js` | Trip categories (Culture, Adventure, Honeymoon, ...) |
| `misc.js` | Home page stats, value pillars, customer reviews, story cards |
| `partners.js` | Konkuk University Glocal Campus + other partner organisations |
| `mongoliaSites.js` | Tourist sites + gateway cities shown on the interactive 3D globe |
| `ui.js` | Every button, heading, and short phrase in all 3 languages |

---

## Step-by-step: edit a phone number (your first edit)

1. Go to your GitHub repo → click `src` → click `data` → click **`company.js`**.
2. Click the **pencil icon** (✏️) in the top-right of the file view.
3. Change `phone: '+976 9984 0909'` to your new number. **Also** update `phoneRaw` to the same number without spaces (e.g. `+97699840909`).
4. Scroll to the bottom → green **Commit changes...** button → **Commit changes**.
5. Wait ~60 seconds → refresh your live website. New number appears in nav, footer, contact page, every trip detail page.

That's it. That's the loop for every other change.

---

## Translations — the `{ mn, en, kr }` shape

Anywhere you see something like:

```js
title: {
  mn: 'Үзэсгэлэнт Солонгос орноор',
  en: 'Beautiful South Korea',
  kr: '아름다운 한국 여행',
},
```

…it's a **translation object**. Edit any of the three values and only that language changes on the site. Leave `kr` blank? Korean visitors will see Mongolian (the fallback).

---

## How to edit a trip

Open `src/data/trips.js`. Each trip looks like:

```js
{
  id: 14,
  slug: 'beautiful-south-korea',                 // URL: /trips/beautiful-south-korea
  title: { mn: '...', en: '...', kr: '...' },
  location: { mn: '...', en: '...', kr: '...' },
  destinationSlug: 'south-korea',                // must match a slug in destinations.js
  styleSlug: 'culture',                          // must match a slug in styles.js
  days: 4,
  nights: 3,
  priceFrom: 758,                                // current price
  priceWas: 890,                                 // strike-through price (omit for no sale)
  rating: 4.9,
  reviews: 142,
  type: { mn: 'Соёл', en: 'Cultural', kr: '문화' },
  accent: 'sun',                                 // badge color: sun, sky, clay, plum, steppe, brand, brand-red
  image: 'https://images.unsplash.com/.../...',  // photo URL
  tag: { mn: 'Эрэлттэй', en: 'Popular', kr: '인기' },  // optional badge — delete if no tag
  summary: { mn: '...', en: '...', kr: '...' },
},
```

### Common edits

**Change a price** → just change `priceFrom`. To show a sale, set `priceWas` higher than `priceFrom`. To remove a sale, delete the whole `priceWas` line.

**Change a photo** → replace the `image:` URL. Best sources:
- Use Unsplash: visit https://unsplash.com → search → right-click photo → "Copy image address". The URL must start with `https://images.unsplash.com/`.
- If you have your own photo: upload it to `public/trips/` in the repo first, then use `/trips/your-photo.jpg` (note the slash).

**Add a new trip** → copy an entire `{ ... },` block, paste it below the last one, then change `id` (must be unique), `slug` (must be unique), and the content. Done.

**Delete a trip** → highlight the whole `{ ... },` block and delete it.

---

## How to edit a destination

`src/data/destinations.js`. Each entry has:

- `slug` — the URL piece. `slug: 'south-korea'` → page at `/destinations/south-korea`. Don't change after launch (breaks bookmarks).
- `name` / `intro` / `highlights` — translated text.
- `image` — page hero photo. Use a wide landscape photo (1600px+).
- `trips` — number shown on the tile. Update manually when you add trips.

---

## How to edit the interactive 3D globe (tourist sites)

`src/data/mongoliaSites.js` controls every dot and arc on the spinning globe.

**`mongoliaSites`** array — the red and gold dots on Mongolia:

```js
{
  slug: 'ulaanbaatar',                   // unique id
  name: { mn: '...', en: '...', kr: '...' },
  region: { mn: '...', en: '...', kr: '...' },   // subtitle under the name
  lat: 47.9184,                          // latitude (positive = north)
  lng: 106.9177,                         // longitude (positive = east)
  description: { mn: '...', en: '...', kr: '...' },
  isCapital: true,                       // optional — gold dot instead of red
},
```

**To add a new site:**
1. Find the lat/lng on Google Maps — right-click anywhere → coordinates copy to clipboard. **Latitude first**, then longitude.
2. Copy an existing block, paste below it, change `slug`, `name`, `region`, `lat`, `lng`, `description`.
3. Commit. The new dot appears on the globe.

**`gatewayCities`** array — the blue dots that show international flights into Ulaanbaatar (Seoul, Beijing, Tokyo, etc.). Same shape, just no `region`/`description`. Add more cities to expand the inbound arc network.

The arcs are calculated automatically: every gateway → Ulaanbaatar (blue), and Ulaanbaatar → every site (red). You don't edit them manually.

---

## How to edit the Konkuk partnership

`src/data/partners.js` → the entry with `slug: 'konkuk-glocal'`.

Editable fields:
- `description` — the "what is Konkuk" paragraph
- `relationship` — the "what MGT does with them" paragraph
- `website` — the official Konkuk URL
- `logo` — if you upload a real logo to `public/partners/konkuk.png`, change `logo: null` to `logo: '/partners/konkuk.png'`

The `partnerStrip` array at the bottom controls the row of smaller partner names on the home page. Add more later.

---

## How to add a new menu item

`src/data/nav.js`. Add a new entry to the `nav` array:

```js
{
  label: { mn: 'Шинэ хуудас', en: 'New page', kr: '새 페이지' },
  href: '/some-route'
},
```

> ⚠️ If `href` starts with `/`, it expects a **page to exist** at that route. New routes need a developer to add a page component. Use `#anchor` hrefs (like `#contact`) or external `https://...` URLs to avoid that.

---

## Hero slides (home page big carousel)

`src/data/hero.js`. Add, remove, or reorder slides. 3 slides is the sweet spot. Each slide needs:
- `image` — wide landscape photo URL
- `eyebrow` — small text above the title (e.g. "Featured · 2026 Winter")
- `title` and `subtitle` — the big text
- `ctaKey` — must be `heroCtaTrips`, `heroCtaRoute`, or `heroCtaPremium` (these are defined in `ui.js`)
- `href` — where the button goes

---

## How to add a new language

Open `src/i18n/LanguageContext.jsx` and add to `LANGS`:

```js
{ code: 'ja', label: 'JP', name: '日本語' },
```

Then every translation object in `src/data/*` needs a `ja:` key. Tedious but mechanical. The site won't break if you skip some — those bits just fall back to Mongolian.

---

## Image rules (the part most people get wrong)

✅ **Good** image URLs:
- `https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=1200&q=80`
- `/trips/my-photo.jpg` (a file you uploaded to `public/trips/` in the repo)

❌ **Bad** image URLs:
- Google search results (`https://www.google.com/url?...`) — these expire
- Pinterest URLs — they block hotlinking
- Facebook/Instagram URLs — they block hotlinking
- Anything that doesn't end in `.jpg`, `.png`, `.webp`, or `unsplash.com/photo-...`

To upload your own photos: in the GitHub repo, click into `public/` → **Add file → Upload files** → drag your photos. Then reference them as `/your-folder/photo.jpg` in the data files.

---

## Common mistakes & how to fix them

**"My edit doesn't show up on the website"** → Did you click the green Commit button? Check the repo: the latest commit should be your edit. Then check vercel.com → your project → Deployments — there should be a build running or successful.

**"The page crashed after my edit"** → You likely deleted a comma or quote. GitHub's editor shows a red squiggle. Easiest fix: click **History** at the top right of the file → find the working version → click **⋯ → Revert**.

**"The image broke"** → The URL is wrong. See "Image rules" above. Use Unsplash to test.

**"I broke a translation"** → Mongolian shows where English should be. You probably left `en:` blank. Fill in any value — even a placeholder works.

---

## Backup workflow (for big edits)

For sweeping changes, branch off main first:
1. In GitHub, click the branch dropdown (top-left of file view, says "main") → type a new name like `update-prices` → Create branch.
2. Make all your edits on that branch.
3. When ready, click **Pull requests → New pull request → Compare**. Merge when happy.

This way you can review everything before it goes live, and easily roll back.
