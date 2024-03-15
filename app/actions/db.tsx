'use server';

import { db } from '@/drizzle';
import { recipients, users } from '@/drizzle/schema';
import { and, eq } from 'drizzle-orm';

// users
export async function getAllUsers() {
  const allUsers = await db.select().from(users);
  return allUsers;
}

export async function getUser(address: string) {
  const allUsers = await db.select().from(users).where(eq(users.id, address));
  return allUsers;
}

export async function addUser(address: string) {
  await db
    .insert(users)
    .values({
      id: address,
    })
    .onConflictDoNothing();
}

// recipient
export async function getRecipientByName(name: string, address: string) {
  return await db
    .select()
    .from(recipients)
    .where(and(eq(recipients.name, name), eq(recipients.user_id, address)));
}

export async function getAllRecipientsByAddress(address: string) {
  return await db
    .select()
    .from(recipients)
    .where(eq(recipients.user_id, address));
}

export async function addRecipient(
  name: string,
  recipient: string,
  address: string
) {
  // add user, do nothing if already exist
  await addUser(address);

  await db.insert(recipients).values({
    name,
    recipient,
    user_id: address,
  });
}

export async function editRecipient(
  name: string,
  recipient: string,
  address: string
) {
  await db
    .update(recipients)
    .set({
      name,
      recipient,
    })
    .where(eq(users.id, address));
}

export async function deleteRecipient(name: string) {
  await db.delete(recipients).where(eq(recipients.name, name));
}
