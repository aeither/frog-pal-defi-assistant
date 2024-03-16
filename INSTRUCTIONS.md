## Notes

- perplexity does not support actions yet. Need to use openai API

- settting up env issues:
- cloudflare wrangler took longer than expected
- supabase `postgres` lib issues

- dotenv not needed. load env vars from `.env.local` for app and `.env` required for drizzle-kit commands

- thirdweb: estimate gas requires simulate contract interaction or defining gas when sending amount

## Setup DB

Create new Postgres DB on Neon

Setup env variable `DATABASE_URL` for drizzle on Neon dashboard.

Generate `meta/_journal.json` and `.sql` file for migration.

```bash
npx drizzle-kit generate:pg
```

Migrate.

```bash
npx tsx drizzle/migrate
```

Seed the database with initial dummy data.

```bash
npx tsx drizzle/seed.ts
```

Query the db.

```bash
npx tsx scripts/index.ts
```

## Working with DB

View Table Content with Studio.

```bash
npx drizzle-kit studio
```

Override table. Run it before migration

```bash
npx drizzle-kit push:pg
```

## AI

- System prompt to route user text to the right function call
- functions config: Define AI Functions on what parameters to receive
- onFunctionCall: run code and reply with UI Component
- Modular UI Components

## Thirdweb

- hooks/add-score.tsx
- components/web3/ mint and upload
- components/leaderboard

## Zerion

- Mainnet portfolios
