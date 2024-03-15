import { InferInsertModel } from 'drizzle-orm';
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define the "users" table
export type InsertUser = InferInsertModel<typeof users>;
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

// Define the "recipients" table
export type InsertRecipient = InferInsertModel<typeof recipients>;
export const recipients = pgTable('recipients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  recipient: text('recipient').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  user_id: text('user_id').references(() => users.id), // Foreign key to users table
});

// Define the relations
export const usersRelations = relations(users, ({ one, many }) => ({
  recipients: many(recipients),
}));

export const recipientsRelations = relations(recipients, ({ one, many }) => ({
  user: one(users, { fields: [recipients.user_id], references: [users.id] }),
}));
