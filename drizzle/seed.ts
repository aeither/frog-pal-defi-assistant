import {
  InsertRecipient,
  InsertUser,
  recipients,
  users,
} from '@/drizzle/schema';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { loremIpsum } from 'lorem-ipsum';
import postgres from 'postgres';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
dotenv.config();

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL as string, { prepare: false });
const db = drizzle(client);

async function main() {
  try {
    // Prepare dummy data
    const dummyUsers: InsertUser[] = [];
    const dummyRecipients: InsertRecipient[] = [];

    for (let i = 0; i < 5; i++) {
      const privateKey1 = generatePrivateKey();
      const account1 = privateKeyToAccount(privateKey1);

      const privateKey2 = generatePrivateKey();
      const account2 = privateKeyToAccount(privateKey2);

      dummyUsers.push({
        id: account1.address,
        // name: `${loremIpsum({ count: 1, units: 'word' })}`,
      });

      dummyRecipients.push({
        user_id: account1.address,
        recipient: account2.address,
        name: `${loremIpsum({ count: 1, units: 'word' })}`,
      });
    }

    // Users
    const storedUsers: any = await db
      .insert(users)
      .values(dummyUsers)
      .returning();
    console.log('🚀 ~ main ~ storedUsers:', storedUsers);

    // Recipients
    const storedRecipients: any = await db
      .insert(recipients)
      .values(dummyRecipients)
      .returning();
    console.log('🚀 ~ main ~ storedRecipients:', storedRecipients);

    process.exit(0);
  } catch (error) {
    console.error('Error performing migration: ', error);
    process.exit(1);
  }
}

main();
