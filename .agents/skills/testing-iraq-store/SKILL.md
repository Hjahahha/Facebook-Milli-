# Testing Iraq Store E-Commerce App

## Dev Server Setup

```bash
cd /home/ubuntu/repos/iraq-store
npx vite --host 0.0.0.0 --port 5174
```

Verify: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5174` should return `200`.

If `npm run dev` exits immediately, use `npx vite` directly.

## Critical: Client-Side State Constraint

This app is a React SPA with **NO backend**. All state lives in React Context (useReducer). This means:

- **Navigating via URL bar (`page.goto()`, typing URLs) resets ALL state** — login, cart, favorites, etc.
- **You MUST navigate within the SPA using clicks** (bottom nav tabs, buttons) to preserve state.
- Playwright's `page.goto()` causes full page reloads that destroy React Context state.
- The only exception: navigating to `/login` or `/admin` via URL bar is acceptable when you intentionally want to reset state (e.g., to test admin access control or re-login as a different role).

## Testing Approach

**Use browser GUI (computer tool) for all interactive tests.** Do not rely on Playwright `page.goto()` for navigation within the app. Playwright can be used for:
- Form filling (via CDP at `http://localhost:29229`)
- Preventing popups (`window.open = () => null` before WhatsApp redirect)
- Reading DOM state

## Test Flows

### Flow 1: Login
1. Navigate to `http://localhost:5174` (fresh load)
2. Click "حسابي" (Account) in bottom nav → shows login prompt
3. Click "تسجيل الدخول" → login page
4. Submit with empty fields → redirects to home with daily rewards visible
5. For admin login: click the "تسجيل كمدير" toggle (turns red) before submitting

### Flow 2: Cart & Checkout
1. Click cart icon (ShoppingCart) on product card image → badge appears on عربتي tab
2. Click عربتي tab → cart page with product, price in dinar, qty controls
3. Click "+" to increment quantity → total updates
4. Click "إتمام الطلب" → navigates to /orders with "قيد الانتظار" status

### Flow 3: Merchant Registration
1. Click حسابي → متجري → إنشاء متجر
2. Tier selection page: Standard (25,000 IQD) / Premium (99,000 IQD)
3. Premium is pre-selected with "الأكثر شعبية" badge
4. Click tier to switch, verify button text updates
5. Click متابعة → form with fields: business name, type, city, address, national ID, description
6. Submit → /merchant-success page
7. **Note:** Suppress WhatsApp popup before submit: `window.open = () => null`

### Flow 4: Admin Panel
1. Navigate to /admin without admin role → shows "غير مصرح" (access control works)
2. Login with admin toggle → home shows "لوحة الإدارة" button
3. Click لوحة الإدارة → admin dashboard with 9 tabs
4. Click through tabs: المنتجات (16 items), الفئات (10 categories), الإعلانات (3 ads)

### Flow 5: Favorites
1. Click heart icon on product card → heart fills red
2. Navigate to حسابي → مفضلاتي → favorited product appears in list

## Bottom Navigation (RTL Order)
Left to right on screen: الرئيسية, الفئات, تخفيضات, عربتي, حسابي

## Key UI Elements
- Currency format: Arabic numerals with "دينار" suffix (e.g., ٢٥٬٠٠٠ دينار)
- Admin toggle: label "تسجيل كمدير" on login page, styled div toggle
- Merchant tiers: الباقة العادية (Standard) / الباقة المميزة (Premium)
- Order status badge: "قيد الانتظار" (pending) in orange

## Devin Secrets Needed
None — this is a fully client-side app with no backend authentication.

## Common Issues
- If dev server port 5174 is occupied, check for existing Vite processes: `lsof -i :5174`
- Opening Chrome tabs via `google-chrome <URL>` may create tabs that don't load Vite's HMR properly — showing raw UTF-8 encoded Arabic text. Use the existing SPA tab instead.
- Playwright `page.goto()` to localhost:5174 subroutes might fail with 404 if Vite's SPA fallback isn't configured — always navigate to root `/` first.
