# Alongway Website Spec Sheet

As of 2026-09-21. Living copy is the Claude doc "Alongway Website Spec Sheet"; this file is the repo copy for Cursor and other coding agents.

**Current phase: front end only, running locally. Do not add a backend, database, auth, or payment provider yet.**

## Overview

Alongway sells made-to-order custom totes and bags with transparent, all-in pricing, and the website is the whole sales process. A buyer should pick a style, configure it, see a per-unit price within 60 seconds, and place an order without a quote call.

- **Business:** DBA under Orange Collective LLC, sister brand to Orange Goods. Factory is HB Findo (30 days production + shipping, about 6 weeks total).
- **Buyers:** small-to-mid brands, event planners and marketing teams ordering 50-500 units on a $500-5,000 budget.
- **Offer:** curated styles defined by shape, fabric chosen separately. Base price includes main decoration, woven label, setup and shipping.
- **Positioning:** Simple, Fast, Affordable, Fully Branded. The model is Tapacho Mfg (hats) applied to bags.
- **Site goals:** 3-5% conversion on order/start forms, average order $1,500-2,500, 10-15 orders a month by month 6.

Source: `docs/00-decisions-log.md`, `docs/01-business-brief.md` (April 2026).

## Tech stack

Custom Next.js 15 App Router build in TypeScript. No backend, database, environment variables or tests yet.

| Layer | Current | Notes |
| --- | --- | --- |
| Framework | Next.js ^15.3, React 18.3 | App Router, `app/` directory |
| Language | TypeScript 5.8 | Typechecks clean as of 2026-09-21 |
| Styling | Tailwind CSS 3.4 + `app/globals.css` | PostCSS, autoprefixer |
| Fonts | Noir Pro, Jukebox Johnny (self-hosted in `public/fonts`), Termina via Adobe Typekit kit `uwz0pum` | Typekit is an external dependency tied to someone's Adobe account |
| Images | `next/image`, Unsplash allowed as a remote host | Real photos in `public/photos` |
| Data | Static TypeScript files in `data/` | No CMS, no database |
| State | Client-side only, localStorage (`lib/order-flow.ts`, `lib/email-capture.ts`) | |
| Lint | ESLint 8 + `eslint-config-next` | No test runner installed |
| Runtime | Node 22 locally | Hosting not decided; Vercel is the default fit |
| Repo | `github.com/hanaajones/alongway` | Work merged through PRs from feature branches |

Local run: `npm install && npm run dev`, then `localhost:3000`.

## Site map

24 routes, all front end only; none talk to a server.

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Homepage: hero slideshow, perks, photo carousel, testimonials | Built, real photos |
| `/collection` | Grid of all 14 bag styles | Built |
| `/collection/[slug]` | Style detail + configurator with live pricing | Built |
| `/collection/custom` | Fully custom tote pitch | Built |
| `/collection/custom/inquire` | Custom inquiry form | UI only, no submit target |
| `/shop` | Order builder; saves draft, hands off to checkout | Built, localStorage |
| `/checkout` | Contact, shipping method, order review | UI only, no payment |
| `/order-confirmation` | Reads last order from localStorage | Built |
| `/start` | Simple start-your-order form | UI only |
| `/quiz` | Bag finder quiz | Built |
| `/swatches`, `/swatches/[slug]` | Fabric library and per-fabric color palettes | Built |
| `/store` | Fabric Swatch Kit, $5 | UI only, still uses an Unsplash image |
| `/pricing` | Pricing tables | Built |
| `/how-it-works` | Process page | Built |
| `/about`, `/contact`, `/legal` | Company, contact form, legal | Contact form has a `TODO: wire to backend` |
| `/blog`, `/blog/[slug]` | Posts from `data/blog-posts.ts` | Built, static |
| `/portal` | Customer login | Fake: any submit routes to dashboard |
| `/portal/dashboard`, `/orders`, `/orders/[id]`, `/account`, `/referral` | Order tracking, account, referrals | Built on sample data in `data/portal.ts` |

Overlap to resolve: `/shop`, `/start`, and the configurator on `/collection/[slug]` are three different ways to begin an order. Main nav links to `/collection`, `/quiz`, `/swatches`, `/store`, `/start`, `/contact`, `/portal`; check nav entry points for `/shop`, `/pricing`, `/how-it-works`, `/about`, `/blog`.

## Core features

Every feature must work end to end in the browser with local state, and each names the seam where a backend plugs in later.

| Feature | File | What it does now | Backend seam (later) |
| --- | --- | --- | --- |
| Bag configurator | `components/bag-configurator.tsx` | Fabric by tier, quantity (100-2,000; 5,000+ routes to quote), decoration type, front/back ink colors with Pantone lookup, embroidery placements, add-ons, live unit price. Passes selections as URL params | Save configuration, artwork upload |
| Order builder | `components/shop-page.tsx` | Builds an `OrderDraft`, stores it in localStorage key `alongway-order-draft`, routes to `/checkout` | Create draft order |
| Checkout | `components/checkout-page.tsx` | Details, shipping method (air standard, sea economy at -$2/unit), writes `alongway-last-order`, routes to confirmation | Payment or deposit, order record, confirmation email |
| Order confirmation | `components/order-confirmation-page.tsx` | Renders the last order from localStorage | Read order by ID |
| Start-order form | `components/start-order-form.tsx` | Style, quantity, need-by, artwork ready + file input, contact, notes. Submit shows success state only | Form endpoint, file storage, CRM (HubSpot) |
| Bag quiz | `components/bag-quiz.tsx` | 4 questions (capacity, use, style, quantity) recommending a style | Optional lead capture |
| Swatch library | `app/swatches` | 18 fabrics with color palettes by tier | None |
| Store | `app/store/page.tsx` | One product, Swatch Kit at $5, fake add-to-cart | Real checkout for a physical item |
| Customer portal | `components/portal-*.tsx`, `data/portal.ts` | Login accepts anything; dashboard, orders, timeline, account with billing address, referral, all on sample orders | Auth, orders API, referral tracking |
| Chat widget | `components/chat-widget.tsx` | Canned auto-reply pointing to hello@alongway.co | Live chat or inbox |
| Email capture | `components/email-capture-modal.tsx`, `lib/email-capture.ts` | Modal + footer signup; email stored in localStorage only | Email platform list |
| Contact + custom inquiry forms | `app/contact`, `app/collection/custom/inquire` | UI only | Form endpoint |

**Front-end rule for this phase:** put every submit behind one function per feature (for example `submitOrder(draft)`), returning a promise and currently resolving locally. Wiring the backend later then changes those functions, not the components.

## Data model

All content lives in six typed files under `data/`; `OrderDraft` in `lib/order-flow.ts` ties them together. Keep these types as the contract; the future backend should return the same shapes.

| File | Type | Key fields | Count |
| --- | --- | --- | --- |
| `data/bags.ts` | `Bag` | slug, name, tagline, material, features, dimensions, size (small/medium/large), startingPrice, pricingTiers; photo sets per slug | 14 styles |
| `data/fabrics.ts` | `Fabric`, `FabricSwatch` | slug, category, tier (starter, upgrade1-3), upcharge, swatch palette | 18 fabrics |
| `data/addons.ts` | `AddOn` | id, name, description, pricePerUnit | 7 add-ons |
| `data/pantone.ts` | `pantoneMap` | Pantone Coated code to hex | Common brand colors only |
| `data/blog-posts.ts` | `BlogPost` | slug, title, category, date, excerpt, content[], CTA | Static posts |
| `data/portal.ts` | `PortalOrder` | orderNumber, bag, quantity, status, techpack and artwork dates, tracking, timeline | Sample orders |

`OrderDraft` fields: bagSlug, quantity, fabricSlug, addOnIds, brandName, primaryColor, decorationType, notes, artworkReady, shippingMethod.

Styles in code: Beach Tote, Hauler Tote, Everyday Tote, Shoulder Tote, Oversized Tote, Basic Tote, Mini Tote, The Sunday, Channel Tote (Small, Medium, Large), Big Sur Tote, Otis Tote, Camper Pouch.

Known gap: the configurator tracks more than `OrderDraft` stores (ink color counts, Pantone values, embroidery placements). Those selections are priced on the style page but not carried into checkout totals.

## Product and pricing rules

The code and the April planning docs in `docs/` disagree; the code is newer, so this spec treats the code as current until Thomas says otherwise.

| Rule | In code today | In April docs |
| --- | --- | --- |
| Styles | 14 (Beach, Hauler, Everyday, Channel, Otis, etc.) | 13 (Essential, Carry, Boat, Dopp Kit, Weekender, etc.) |
| Base price | By bag size | By style category |
| Minimum | 100 units; tiers 100 / 250 / 500 / 1,000 / 2,000; 5,000+ custom quote | 50 per style, 100 per order; tiers 50 to 1,000 |
| Standard shipping | Air, included, 2-3 weeks | Sea freight, included, 10-15 days |
| Economy option | Sea freight, -$2/unit, +30-35 days | Not mentioned |
| Default fabric | 12oz cotton canvas | 10oz standard |

Base price per unit (USD) in code:

| Size | 100 | 250 | 500 | 1,000 | 2,000 |
| --- | --- | --- | --- | --- | --- |
| Small | 7.50 | 6.50 | 5.75 | 5.25 | 4.75 |
| Medium | 11.00 | 9.50 | 8.50 | 7.75 | 7.00 |
| Large | 14.50 | 12.50 | 11.00 | 9.75 | 8.75 |

Unit price = base tier price + fabric upcharge + add-ons + decoration upcharges + shipping adjustment. A quantity between tiers uses the tier below it (350 units prices at the 250 tier).

- **Fabric upcharge per unit:** starter $0 (10-12oz canvas, denim, corduroy, nylon, camo, twill); upgrade 1 +$1.50 (14-16oz, nylon ripstop, organic cotton, Tyvek, ripstop); upgrade 2 +$2.50 (18-20oz, waxed canvas); upgrade 3 +$4.00 (24oz).
- **Screen print:** 1 front color included; +$0.35 per extra front color up to 4; back print +$0.30 per color up to 3.
- **Embroidery:** one placement included; second placement +$1.25.
- **Add-ons per unit:** Printed Straps $1.50, Exterior Pocket $1.25, Interior Organizer Pocket $1.00, Key Hook $0.75, Additional Label $0.50, Additional Decoration $2.00, Zipper Closure $1.75.
- **Included:** main decoration, interior woven label, free setup, free shipping.

Inconsistency to fix: Channel Tote ships in 24oz canvas and Otis in waxed canvas by default, but base pricing assumes a starter fabric.

## Brand and design system

Palette and fonts are confirmed and encoded in `tailwind.config.ts`. New UI must use these tokens, never raw hex values. Orange is excluded (it belongs to Orange Goods).

| Token | Hex | Role |
| --- | --- | --- |
| `blue` | #364FA0 | Primary, CTAs |
| `bone` | #EEE6D2 | Main background |
| `light-bone` | #F2ECE2 | Secondary background |
| `light-blue` | #94A6D2 | Accent, eyebrows |
| `kelly` | #3A7D44 | Accent |
| `charcoal` | #262626 | Body copy, dark sections |

- **Type:** `font-display` Termina (headlines), `font-sans` Noir Pro (body), `font-accent` Jukebox Johnny (eyebrows, uppercase, wide tracking).
- **Shape:** large radii (`rounded-[2.5rem]` cards, pill buttons), `shadow-card`, thin `charcoal/10` borders.
- **Motion:** floating circles, marquee, fade-in, icon-drop, card-pop, scroll reveal, scroll-driven bird and rotating badge. Needs a performance check and a `prefers-reduced-motion` fallback.
- **Assets:** 48 photos in `public/photos`; SVG library in `public/svg`. `public/brand-assets.jpeg` is 13 MB and should not ship.
- **Voice:** confident, plain, warm. "Pick your style. Choose your fabric. We handle the rest." No jargon, no promo-company language.
- **Tagline:** metadata says "Made to carry."; brand doc lists "Custom Bags, Made Simple." and "Made for the long way." Undecided.
- **Domain:** code uses hello@alongway.co and @alongwayco; older docs say alongway.com and @alongway.

## Deferred backend

Out of scope until the front end works end to end locally. Vendors are suggestions, not decisions.

| Need | Today | Likely approach |
| --- | --- | --- |
| Form submissions (start, contact, custom inquiry) | Success state only, data discarded | Next.js route handler to HubSpot |
| Artwork upload | File input, file goes nowhere | Object storage with signed uploads |
| Orders | localStorage | Database + orders API matching `OrderDraft` |
| Payment | None | Stripe; deposit vs full payment undecided |
| Portal auth | Any input logs in | Email magic link; account created on first order |
| Order status, techpack and artwork approval | Sample data | Admin-updated records |
| Email capture | localStorage | Email platform list |
| Chat | Canned reply; footer SMS link is a placeholder number | Shared inbox or live chat tool |
| Blog | TypeScript file | Fine as is |
| Analytics | None | GA4 + Meta Pixel |

## Build plan

**Phase 1: front end complete, running locally (active)**

- [ ] Runs clean with `npm run dev` and passes `npm run build` and `npm run lint`
- [ ] One order path: decide the roles of `/shop`, `/start` and the style-page configurator; remove or redirect the rest
- [ ] Carry ink colors, Pantone values and embroidery placements into `OrderDraft` so checkout totals match the style page
- [ ] Settle pricing rules (minimum, tiers, Channel and Otis defaults) and update `data/`
- [ ] Every submit behind a single stub function per feature
- [ ] Replace remaining Unsplash images, remove the 13 MB brand file, fix placeholder phone number and testimonial names
- [ ] Per-page titles and meta descriptions, Open Graph image, sitemap, robots
- [ ] Mobile pass on every route; keyboard and reduced-motion pass
- [ ] Legal page content reviewed

**Phase 2: backend** — forms to CRM, artwork upload, orders, payment, portal auth.

**Phase 3: launch** — domain, hosting, analytics, email sending, final QA on production.

## Open questions

- [ ] Is the code the source of truth over the April docs for styles, pricing, 100-unit minimum and air shipping?
- [ ] Which is the single order path: configurator to checkout, or the start form to a human?
- [ ] Does checkout take payment (full or deposit), or submit a request that gets invoiced?
- [ ] Is the customer portal in scope for launch, or hidden until the backend exists?
- [ ] Is the $5 swatch kit store in scope for launch?
- [ ] Primary tagline?
- [ ] Domain and handles: alongway.co and @alongwayco, confirmed and owned?
- [ ] Who owns the Adobe Typekit kit that serves Termina, and is it licensed for the production domain?
- [ ] Repo is under `hanaajones` on GitHub. Who else commits, and branch or `main`?
- [ ] New launch date? (Original mid-July 2026 target has passed.)
