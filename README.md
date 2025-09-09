# Expenses Tracker (Next.js SaaS)

A minimal, production-ready SaaS for tracking personal expenses, built with **Next.js**, **TypeScript**, **Prisma**, **Tailwind CSS**, **Kinde** (auth), and **Stripe** (payments).

---

## 🧩 Problem Statement

Most people track spending across scattered spreadsheets, bank exports, or mobile apps that either overcomplicate things or lock features behind subscriptions. This project provides a **simple, privacy‑friendly, web‑based tracker** with just the essentials—**record expenses, see a clean summary, and keep your data under your account**—wrapped in a SaaS skeleton (auth, billing, protected routes) so you can **ship it as a product** or extend it for your own needs.

---

## ✨ Features

- **Email / OAuth authentication via Kinde** (secure sessions, protected routes)
- **Stripe checkout** for paid access (configured for a one‑time “lifetime” plan)
- **Record expenses** with amount, date, description, and category
- **Dashboard summary** with totals and recent activity
- **Responsive UI** with Tailwind CSS
- **Type‑safe data layer** using Prisma ORM
- **Deploy‑ready** (Vercel friendly)

> Note: This is intentionally minimal. Use the Roadmap to guide what to build next (budgets, incomes, charts, CSV import/export, etc.).

---

## 🔗 Live Demo

- **App**: [https://nextjs-expenses-tracker-saas.vercel.app](https://nextjs-expenses-tracker-saas.vercel.app)

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Auth:** Kinde
- **Payments:** Stripe (Checkout + Webhooks)
- **Database/ORM:** Prisma (PostgreSQL)
- **UI:** Tailwind CSS
- **Hosting:** Vercel

---

## 🚀 Getting Started

### 1) Prerequisites

- **Node.js** 18+ (recommended LTS)
- **Package manager:** npm, pnpm, or yarn
- **PostgreSQL** database (local or hosted—e.g., Neon, Supabase, Railway)
- **Stripe** account (for payments)
- **Kinde** account (for authentication)

### 2) Clone & install

```bash
git clone https://github.com/zntb/nextjs-expenses-tracker-saas.git
cd nextjs-expenses-tracker-saas
npm install
# or: pnpm install / yarn
```

### 3) Environment variables

Create a `.env` file in the project root and set the following (adjust to your setup):

```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"

# Kinde (see Kinde dashboard → Application → Settings)
KINDE_ISSUER_URL="https://<your-subdomain>.kinde.com"
KINDE_CLIENT_ID="..."
KINDE_CLIENT_SECRET="..."
KINDE_SITE_URL="http://localhost:3000"            # your app base URL
KINDE_REDIRECT_URL="http://localhost:3000/api/auth/callback"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000/"

# Stripe (see Stripe dashboard → Developers)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_or_test_..."
STRIPE_SECRET_KEY="sk_live_or_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."                   # for local dev/webhooks

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

> The exact variable names may differ if you customize the auth/payments integration. Cross‑check with your code before deploying.

### 4) Database setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5) Run the app

```bash
npm run dev
# open http://localhost:3000
```

### 6) Stripe webhooks (local dev)

In one terminal, run your dev server. In another, forward Stripe events:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Update the path if your webhook route differs.

---

## 📂 Project Structure (high‑level)

```text
prisma/            # Prisma schema & migrations
src/
  app/            # App Router routes, API handlers
  components/     # UI components
  lib/            # helpers, utils (e.g., auth, db)
  styles/         # global styles (if applicable)
public/           # static assets
```

> Actual folders may vary slightly; check `src/` for route & component organization.

---

## 🧪 Scripts (common)

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "postinstall": "prisma generate"
}
```

---

## 🔐 Authentication (Kinde)

1. Create a Kinde application.
2. Add allowed URLs (local & production) for login/logout/callback.
3. Configure the environment variables above.
4. Wrap protected pages with your auth guard and use the provided Kinde SDK helpers to read the user session.

Resources: [https://kinde.com/docs/](https://kinde.com/docs/)

---

## 💳 Payments (Stripe)

- Create a **Product** (e.g., _Lifetime Access_), attach a **Price** (one‑time), and use the **Price ID** when creating a Checkout session.
- Add your **webhook endpoint** in Stripe to receive checkout session updates (mark users as paid, grant access, etc.).
- Use the Stripe CLI to test events locally.

Resources: [https://stripe.com/docs](https://stripe.com/docs)

---

## 🗺️ Roadmap / Ideas

- Income tracking & budgets
- Categories management & tags
- Charts & insights (monthly breakdowns)
- CSV import/export
- Recurring expenses & reminders
- Multi‑currency & currency conversion
- Teams / shared workspaces

---

## 🧑‍💻 Contributing

Pull requests are welcome! If you plan a large change, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 🙌 Acknowledgements

- Next.js, Prisma, Tailwind CSS
- Stripe & Kinde teams and docs
- Everyone building open‑source SaaS starters
