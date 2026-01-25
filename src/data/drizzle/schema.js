import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Notes table schema for Drizzle ORM
 */
export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  createdAt: text('createdAt').notNull(),
});
