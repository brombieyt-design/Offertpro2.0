# Offert Pro — Launch Checklist

Use this checklist before opening the app to paying customers.

## 1. Infrastructure

- [ ] **Postgres database provisioned** (Neon / Supabase / Vercel Postgres / Railway)
- [ ] `DATABASE_URL` set in production env (Vercel → Project → Settings → Environment Variables)
  - Must include `?sslmode=require` for managed Postgres providers.
  - Verify: first boot after deploy automatically creates `kv_store` table.
- [ ] **Without** `DATABASE_URL`, prod falls back to in-memory storage — data is lost on every cold start. **Do not launch in that state.**

## 2. Email (SMTP)

Quotes, invoices and payment reminders are sent via SMTP.

- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` configured
- [ ] `SMTP_FROM` set to a verified sender address (SPF/DKIM/DMARC aligned)
- [ ] Send a test quote to yourself and confirm deliverability (not spam)
- [ ] Without SMTP set, `src/lib/email.ts` falls back to `console.log` — only acceptable in dev.

Recommended providers: Resend, Postmark, SendGrid, Amazon SES.

## 3. Secrets and security

- [ ] `SEED_DEMO_DATA` is **NOT** set in production (prod starts with an empty DB)
- [ ] Verify `/api/auth/signup` succeeds on a fresh prod DB and the first signed-up user becomes admin
- [ ] `NODE_ENV=production` is set (Vercel does this automatically)
- [ ] Session cookie is `Secure`+`httpOnly`+`SameSite=Lax` (handled in `src/lib/auth.ts`)
- [ ] Passwords are hashed with scrypt + per-user salt (never stored in plaintext)

## 4. Company data / branding

Before the first customer-facing quote/invoice goes out:

- [ ] `/settings` → Företagsprofil: company name, org. nr, VAT nr, address, phone, email, website
- [ ] Upload a logo (PNG/JPG, ≤ 500 KB) and pick a primary color
- [ ] `/settings` → Betalning: bankgiro/plusgiro/IBAN/BIC so customers can pay invoices
- [ ] `/settings` → Standardvärden: default VAT rate (6/12/25), currency, quote/invoice prefixes, footer note, email signature

## 5. Domain and DNS

- [ ] Production domain pointed at Vercel (CNAME)
- [ ] `NEXT_PUBLIC_SITE_URL` matches the production domain — controls canonical URLs, sitemap, OG images.
- [ ] `/sitemap.xml`, `/robots.txt`, `/og-image.png` all reachable

## 6. PWA / service worker

- [ ] `/manifest.webmanifest`, `/icon.svg`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png` present in `/public`
- [ ] Service worker registered (see `src/components/ServiceWorkerRegistration.tsx`)

## 7. Functional smoke test on production

Run through as a real customer would:

- [ ] Sign up → log out → log in
- [ ] Create a customer
- [ ] Create a quote with line items → preview → send via email
- [ ] Download quote PDF
- [ ] Convert quote to invoice (or create invoice directly)
- [ ] Download invoice PDF
- [ ] Record a partial payment → status moves to "Delvis betald"
- [ ] Record the remaining amount → status moves to "Betald"
- [ ] Send a reminder for an overdue invoice
- [ ] Save a line item → re-use it in a new quote via `Lägg till från artiklar`
- [ ] Export quotes.csv and invoices.csv
- [ ] Open the app on a phone — sidebar collapses, all pages scroll correctly

## 8. Monitoring

- [ ] Vercel Analytics or equivalent enabled
- [ ] Error log stream watched (Vercel → Logs) for the first 48 h
- [ ] Database backups enabled by the Postgres provider

## 9. Legal / trust

- [ ] `/legal/privacy`, `/legal/terms`, `/legal/cookies` reflect the real company name and contact e-mail
- [ ] GDPR/data-protection text matches your actual processing

---

Only tick all boxes once you've verified the item on **production**, not just locally.
