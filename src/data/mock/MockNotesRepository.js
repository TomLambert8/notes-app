/**
 * @typedef {import('../../domain/notes/Note').Note} Note
 */

/**
 * In-memory mock implementation for testing
 * @implements {import('../../domain/notes/INotesRepository').INotesRepository}
 */
export class MockNotesRepository {
  constructor() {
    /** @type {Note[]} */
    this.notes = [];
    this.nextId = 1;
  }

  /** @returns {Promise<void>} */
  async init() {
    // No initialization needed for in-memory storage
  }

  /** @returns {Promise<Note[]>} */
  async list() {
    return [...this.notes].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /** @param {{ text: string }} input @returns {Promise<Note>} */
  async create(input) {
    const note = {
      id: this.nextId++,
      text: input.text,
      createdAt: new Date().toISOString(),
    };
    this.notes.push(note);
    return note;
  }

  /** @param {number} id @returns {Promise<boolean>} */
  async remove(id) {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) return false;
    this.notes.splice(index, 1);
    return true;
  }

  /** @param {number} id @param {{ text: string }} input @returns {Promise<boolean>} */
  async update(id, input) {
    const note = this.notes.find(n => n.id === id);
    if (!note) return false;
    note.text = input.text;
    return true;
  }

  /** @param {number} id @returns {Promise<Note>} */
  async get(id) {
    const note = this.notes.find(n => n.id === id);
    if (!note) throw new Error(`Note with id ${id} not found`);
    return note;
  }

  /**
   * Helper method for testing - clear all data
   */
  clear() {
    this.notes = [];
    this.nextId = 1;
  }
}
