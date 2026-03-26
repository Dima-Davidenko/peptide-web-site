# PeptidePro — Agent Reference

## Project Overview

PeptidePro is a pharmaceutical-grade peptide e-commerce SPA for licensed physicians. Built with React 18 + Vite 6, using React Router DOM 7 for client-side routing. All data is persisted in `localStorage` (no backend).

**Live URL:** https://peptidepro.vercel.app
**GitHub:** https://github.com/Dima-Davidenko/peptide-web-site
**Vercel project:** `peptidepro` (org: `dimadavidenkos-projects`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 6 |
| Routing | React Router DOM 7 |
| Styling | Inline styles + `src/index.css` (media queries) |
| Data | `localStorage` (no backend, no API) |
| Deployment | Vercel (CLI + GitHub integration) |

---

## File Structure

```
src/
  main.jsx          — BrowserRouter wrapper
  App.jsx           — All main site components + routing (single file)
  index.css         — Global resets + mobile media queries (≤480px)
  data.js           — INITIAL_PEPTIDES, CATEGORIES, CHAT_RESPONSES,
                      localStorage utils: getProducts, saveProducts,
                      getUsers, saveUsers, getOrders, saveOrders,
                      isAdminAuth, setAdminAuth
  admin/
    AdminLogin.jsx  — Login page (/admin/login), credentials: admin/admin
    AdminApp.jsx    — Protected admin layout with sidebar + nested routes
    AdminDashboard.jsx
    AdminProducts.jsx  — Full CRUD for products with modal
    AdminOrders.jsx    — Orders table with status management
    AdminUsers.jsx     — Users table with status/verification management
    AdminAnalytics.jsx — Revenue/orders/products charts (pure CSS bars)
vercel.json         — SPA rewrite rule: all routes → /index.html
.vercel/            — Vercel project config (projectId, orgId)
```

---

## Routes

### Main site (`/*`)
| Path | Component |
|---|---|
| `/` | HomePage (Hero + Features + Featured products + CTA) |
| `/catalog` | CatalogPage (search + category filter + product grid) |
| `/product/:id` | ProductDetailPage |
| `/about` | AboutPage |
| `/coa` | COAPage (Certificate of Analysis library) |

### Admin (`/admin/*`)
| Path | Component |
|---|---|
| `/admin/login` | AdminLogin |
| `/admin/dashboard` | AdminDashboard |
| `/admin/products` | AdminProducts |
| `/admin/orders` | AdminOrders |
| `/admin/users` | AdminUsers |
| `/admin/analytics` | AdminAnalytics |

Admin credentials (frontend only, not secure): **admin / admin**

---

## localStorage Keys

| Key | Content |
|---|---|
| `pp_products` | Product catalog array |
| `pp_users` | Registered users array |
| `pp_orders` | Orders array |
| `pp_admin_auth` | Admin session flag |

---

## Styling Approach

- All component styles are **inline** in `App.jsx`
- `src/index.css` contains only global resets, scrollbar styles, and `@media (max-width: 480px)` mobile overrides
- CSS classes (e.g. `header-nav`, `products-grid`, `auth-modal-box`) are added to elements solely for mobile CSS targeting — no CSS modules, no Tailwind
- Mobile breakpoint: **480px** (targets Samsung A56 and similar Android phones)

---

## Dev Commands

```bash
npm run dev       # start local dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

---

## Deploying to Vercel

### Method 1 — Vercel CLI (recommended, instant)

Vercel CLI is installed locally. Run from project root:

```bash
vercel --prod
```

This builds and deploys directly to production. The `peptidepro.vercel.app` alias is automatically updated.

### Method 2 — Git push (auto-deploy)

```bash
git add .
git commit -m "your message"
git push origin main
```

Vercel detects the push via GitHub integration and triggers a build. However, the production alias (`peptidepro.vercel.app`) may not update automatically if the Production Branch setting is not configured in the Vercel dashboard.

To fix the alias manually after a git push:
```bash
vercel alias <new-deployment-url> peptidepro.vercel.app
```

Or reassign via CLI:
```bash
vercel ls                  # find the latest deployment URL
vercel alias <url> peptidepro.vercel.app
```

### Vercel Dashboard

https://vercel.com/dimadavidenkos-projects/peptidepro

Go here to: check build logs, set Production Branch to `main`, manage domains, view deployment history.

### Build Settings (already configured in Vercel)

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA routing | `vercel.json` rewrites all paths to `/index.html` |
