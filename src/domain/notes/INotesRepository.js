/**
 * @typedef {import('./Note').Note} Note
 */

/**
 * Repository contract for Notes.
 * Domain depends on this interface, not on SQLite / AsyncStorage.
 *
 * @interface
 */
export class INotesRepository {
  /** @returns {Promise<void>} */
  async init() {
    throw new Error('Not implemented');
  }

  /** @returns {Promise<Note[]>} */
  async list() {
    throw new Error('Not implemented');
  }

  /** @param {{ text: string }} input @returns {Promise<Note>} */
  async create(input) {
    throw new Error('Not implemented');
  }

  /** @param {number} id @returns {Promise<boolean>} */
  async remove(id) {
    throw new Error('Not implemented');
  }
  /** @param {number} id @param {{ text: string }} input @returns {Promise<boolean>} */
  async update(id, input) {
    throw new Error('Not implemented');
  }
  /** @param {number} id @returns {Promise<Note>} */
  async get(id) {
    throw new Error('Not implemented');
  }

}

