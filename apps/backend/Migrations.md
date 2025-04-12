# Database migrations

> 🛑️ Set `DATABASE_URL` in the .env first!

> ⚠️ Make sure to cd into `apps/backend` before running drizzle-kit

### Push migrations
Use this when setting up your environment or after changing `schema.ts`
```bash
pnpm drizzle-kit push
```