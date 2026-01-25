import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { notes } from './schema';
import { eq, desc } from 'drizzle-orm';

/**
 * @typedef {import('../../domain/notes/Note').Note} Note
 */

/**
 * Drizzle ORM implementation of the Notes repository.
 * @implements {import('../../domain/notes/INotesRepository').INotesRepository}
 */
export class DrizzleNotesRepository {
  /**
   * @param {{ dbName?: string }} [options]
   */
  constructor(options = {}) {
    this.dbName = options.dbName ?? 'notes.db';
    // Open expo-sqlite database
    this.sqliteDb = openDatabaseSync(this.dbName);
    // Create Drizzle instance using expo-sqlite database
    this.db = drizzle(this.sqliteDb);
  }

  /** @returns {Promise<void>} */
  async init() {
    // Enable foreign keys
    await this.sqliteDb.execAsync('PRAGMA foreign_keys = ON;');
    // Create table if not exists
    await this.sqliteDb.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
  }

  /** @returns {Promise<Note[]>} */
  async list() {
    const result = await this.db.select().from(notes).orderBy(desc(notes.createdAt)).all();
    return result.map(row => ({
      id: row.id,
      text: row.text,
      createdAt: row.createdAt,
    }));
  }

  /** @param {{ text: string }} input @returns {Promise<Note>} */
  async create(input) {
    const createdAt = new Date().toISOString();
    const result = await this.db.insert(notes).values({
      text: input.text,
      createdAt,
    }).returning().get();
    
    return {
      id: result.id,
      text: result.text,
      createdAt: result.createdAt,
    };
  }

  /** @param {number} id @returns {Promise<boolean>} */
  async remove(id) {
    const result = await this.db.delete(notes).where(eq(notes.id, id)).run();
    return (result.changes ?? 0) > 0;
  }

  /** @param {number} id @param {{ text: string }} input @returns {Promise<boolean>} */
  async update(id, input) {
    const result = await this.db.update(notes)
      .set({ text: input.text })
      .where(eq(notes.id, id))
      .run();
    return (result.changes ?? 0) > 0;
  }

  /** @param {number} id @returns {Promise<Note>} */
  async get(id) {
    const result = await this.db.select().from(notes).where(eq(notes.id, id)).get();
    if (!result) {
      throw new Error(`Note with id ${id} not found`);
    }
    return {
      id: result.id,
      text: result.text,
      createdAt: result.createdAt,
    };
  }
}
