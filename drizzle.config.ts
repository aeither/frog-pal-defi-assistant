import type { Config } from 'drizzle-kit';
import { env } from './env';
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL as string,
  },
} satisfies Config;
