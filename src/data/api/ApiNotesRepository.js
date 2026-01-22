/**
 * @typedef {import('../../domain/notes/Note').Note} Note
 */

/**
 * REST API implementation of the Notes repository.
 * This demonstrates how easy it is to swap data sources.
 * @implements {import('../../domain/notes/INotesRepository').INotesRepository}
 */
export class ApiNotesRepository {
  /**
   * @param {{ apiUrl: string, apiKey?: string }} options
   */
  constructor(options) {
    if (!options.apiUrl) {
      throw new Error('apiUrl is required for ApiNotesRepository');
    }
    this.apiUrl = options.apiUrl;
    this.apiKey = options.apiKey;
  }

  /**
   * Build headers for API requests
   * @private
   */
  _getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    return headers;
  }

  /** @returns {Promise<void>} */
  async init() {
    // For API, initialization might check connection or do nothing
    try {
      const response = await fetch(`${this.apiUrl}/health`, {
        headers: this._getHeaders(),
      });
      if (!response.ok) {
        throw new Error('API health check failed');
      }
    } catch (error) {
      console.warn('API init check failed:', error);
      // Don't throw - allow offline usage
    }
  }

  /** @returns {Promise<Note[]>} */
  async list() {
    const response = await fetch(`${this.apiUrl}/notes`, {
      headers: this._getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    return await response.json();
  }

  /** @param {{ text: string }} input @returns {Promise<Note>} */
  async create(input) {
    const response = await fetch(`${this.apiUrl}/notes`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.statusText}`);
    }
    return await response.json();
  }

  /** @param {number} id @returns {Promise<boolean>} */
  async remove(id) {
    const response = await fetch(`${this.apiUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
    return response.ok;
  }

  /** @param {number} id @param {{ text: string }} input @returns {Promise<boolean>} */
  async update(id, input) {
    const response = await fetch(`${this.apiUrl}/notes/${id}`, {
      method: 'PUT',
      headers: this._getHeaders(),
      body: JSON.stringify(input),
    });
    return response.ok;
  }

  /** @param {number} id @returns {Promise<Note>} */
  async get(id) {
    const response = await fetch(`${this.apiUrl}/notes/${id}`, {
      headers: this._getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch note: ${response.statusText}`);
    }
    return await response.json();
  }
}
