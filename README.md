# Finance Tracker API

Express + TypeScript REST API for personal finance management (income/expenses, categories, users), with JWT authentication (access + refresh token) and an admin dashboard.

## Tech stack

- **Express 5** + TypeScript
- **Prisma** (PostgreSQL) — ORM
- **jsonwebtoken** — access/refresh tokens
- **bcryptjs** — password hashing
- **zod** — request validation
- **pino** — logging
- **helmet** — security headers
- **cors** — cross-origin requests (React frontend)
- **express-rate-limit** — rate limiting
- **nodemailer** — sending password reset and monthly report emails
- **node-cron** — scheduling the monthly email report job
- **p-queue** — controlled-concurrency sending of report emails
- **Jest** + **Supertest** — tests

## Setup

### With Docker (recommended)

1. Create a `.env` file in the root (see `.env.example`). For local development, [Mailtrap](https://mailtrap.io) sandbox SMTP credentials work well for the `NODE_MAILER_*` values without sending real emails.
2. `docker compose up --build` — builds the app + Postgres, runs migrations automatically, starts the server at `http://localhost:3000`.

### Without Docker

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root with your own values (see `.env.example`), pointing at your own local Postgres instance.

3. Set up the database with Prisma:

   ```bash
   npx prisma migrate dev
   ```

4. Start the server (dev, with auto-reload):

   ```bash
   npm run dev
   ```

5. Tests:

   ```bash
   npm run test
   ```
