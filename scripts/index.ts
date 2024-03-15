import { users } from '@/drizzle/schema';
import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DATABASE_URL, { prepare: false });
const db = drizzle(client);

async function main() {
  try {
    const allUsers = await db.select().from(users);
    console.log('🚀 ~ main ~ allUsers:', allUsers);
    process.exit(0);
  } catch (error) {
    console.error('Error performing migration: ', error);
    process.exit(1);
  }
}

main();
