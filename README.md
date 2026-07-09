# Finance Tracker API

Express + TypeScript REST API for personal finance management (income/expenses, categories, users), with JWT authentication (access + refresh token) and an admin dashboard.

## Tech stack

- **Express 5** + TypeScript
- **Prisma** (PostgreSQL) — ORM
- **jsonwebtoken** — access/refresh tokens
- **bcryptjs** — password hashing
- **Jest** + **Supertest** — tests

## Setup

1. Εγκατάσταση dependencies:

   ```bash
   npm install
   ```

2. Δημιούργησε ένα `.env` στο root με τις δικές σου τιμές (βλ. `.env.example`).

3. Setup της βάσης με Prisma:

   ```bash
   npx prisma migrate dev
   ```

4. Εκκίνηση server (dev, με auto-reload):

   ```bash
   npm run dev
   ```

5. Tests:

   ```bash
   npm run test
   ```
