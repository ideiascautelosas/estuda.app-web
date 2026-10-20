# estuda.app — landing & checkout

Marketing landing page and Stripe-powered checkout for [estuda.app](https://estuda.app). Next.js (App Router), talking directly to `backend`.

## How this fits together

- **Auth**: same phone + OTP flow as the mobile app (`POST /v1/auth/phone/start` / `/verify`) — no separate account system. The JWT is stored in `localStorage` and sent as a bearer token.
- **Checkout**: `POST /v1/billing/checkout` creates a real Stripe Checkout Session and returns its URL; this app just redirects the browser there. The plan only activates once Stripe confirms payment via the backend's `/v1/billing/stripe/webhook` — so a user who buys here and then opens the mobile app sees the same account, already upgraded.
- **Plans/pricing**: fetched live from `GET /v1/billing/plans`, so the price on this page can never drift from what Stripe actually charges.

See `backend/.env.example` for the Stripe keys (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_PREMIUM`) that have to be set on the backend for checkout to actually work.

## Getting started

```bash
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at your backend
npm install
npm run dev
```

### Optional: app store download links

You can toggle the mobile app download buttons with environment variables:

```bash
NEXT_PUBLIC_ENABLE_APP_DOWNLOAD_LINKS=true
NEXT_PUBLIC_APPLE_APP_STORE_URL=https://apps.apple.com/... 
NEXT_PUBLIC_GOOGLE_PLAY_URL=https://play.google.com/store/apps/details?id=...
```

Leave `NEXT_PUBLIC_ENABLE_APP_DOWNLOAD_LINKS=false` to hide them.

### SEO and analytics

```bash
NEXT_PUBLIC_SITE_URL=https://estuda.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

- `NEXT_PUBLIC_SITE_URL`: used for canonical URLs, sitemap and robots metadata
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: enables Google Analytics 4 after the visitor accepts analytics cookies
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: optional Google Search Console verification token

Open [http://localhost:3000](http://localhost:3000). The backend (`backend`) must be running at the URL in `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8001`).

To test a full purchase locally, forward Stripe's webhook to the backend with the Stripe CLI:

```bash
stripe listen --forward-to localhost:8001/v1/billing/stripe/webhook
```
