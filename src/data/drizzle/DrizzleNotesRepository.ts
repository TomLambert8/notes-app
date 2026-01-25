import { desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import type { INotesRepository, Note } from '../../domain/notes/types';
import { notes } from './schema';

export type DrizzleNotesRepositoryConfig = { dbName?: string };

export class DrizzleNotesRepository implements INotesRepository {
  private sqliteDb: ReturnType<typeof openDatabaseSync>;
  private db: ReturnType<typeof drizzle>;

  constructor(options: DrizzleNotesRepositoryConfig = {}) {
    const dbName = options.dbName ?? 'notes.db';
    this.sqliteDb = openDatabaseSync(dbName);
    this.db = drizzle(this.sqliteDb);
  }

  async init(): Promise<void> {
    await this.sqliteDb.execAsync('PRAGMA foreign_keys = ON;');
    await this.sqliteDb.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
  }

  async list(): Promise<Note[]> {
    const rows = await this.db.select().from(notes).orderBy(desc(notes.createdAt)).all();
    return rows.map((row) => ({
      id: row.id,
      text: row.text,
      createdAt: row.createdAt,
    }));
  }

  async create(input: { text: string }): Promise<Note> {
    const createdAt = new Date().toISOString();
    const result = await this.db
      .insert(notes)
      .values({ text: input.text, createdAt })
      .returning()
      .get();
    return {
      id: result.id,
      text: result.text,
      createdAt: result.createdAt,
    };
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.db.delete(notes).where(eq(notes.id, id)).run();
    return (result.changes ?? 0) > 0;
  }

  async update(id: number, input: { text: string }): Promise<boolean> {
    const result = await this.db
      .update(notes)
      .set({ text: input.text })
      .where(eq(notes.id, id))
      .run();
    return (result.changes ?? 0) > 0;
  }

  async get(id: number): Promise<Note> {
    const row = await this.db.select().from(notes).where(eq(notes.id, id)).get();
    if (!row) {
      throw new Error(`Note with id ${id} not found`);
    }
    return {
      id: row.id,
      text: row.text,
      createdAt: row.createdAt,
    };
  }
}
