import * as SQLite from 'expo-sqlite';

/**
 * @typedef {import('../../domain/notes/Note').Note} Note
 */

/**
 * SQLite implementation of the Notes repository.
 * @implements {import('../../domain/notes/INotesRepository').INotesRepository}
 */
export class SqliteNotesRepository {
  /**
   * @param {{ dbName?: string }} [options]
   */
  constructor(options = {}) {
    this.dbName = options.dbName ?? 'notes.db';
    this.db = SQLite.openDatabaseSync(this.dbName);
  }

  /** @returns {Promise<void>} */
  async init() {
    await this.db.execAsync('PRAGMA foreign_keys = ON;');
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `); 
  }

  /** @returns {Promise<Note[]>} */
  async list() {
    // expo-sqlite returns plain objects already
    return await this.db.getAllAsync('SELECT * FROM notes ORDER BY createdAt DESC');
  }

  /** @param {{ text: string }} input @returns {Promise<Note>} */
  async create(input) {
    const createdAt = new Date().toISOString();
    const result = await this.db.runAsync(
      'INSERT INTO notes (text, createdAt) VALUES (?, ?)',
      [input.text, createdAt],
    );
    const id = Number(result.lastInsertRowId);
    return { id, text: input.text, createdAt };
  }

  /** @param {number} id @returns {Promise<boolean>} */
  async remove(id) {
    const result = await this.db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
    return (result.changes ?? 0) > 0;
  }
}

