import type { INotesRepository, Note } from '../../domain/notes/types';

export type ApiNotesRepositoryConfig = {
  apiUrl: string;
  apiKey?: string;
};

export class ApiNotesRepository implements INotesRepository {
  private apiUrl: string;
  private apiKey?: string;

  constructor(options: ApiNotesRepositoryConfig) {
    if (!options.apiUrl) {
      throw new Error('apiUrl is required for ApiNotesRepository');
    }
    this.apiUrl = options.apiUrl;
    this.apiKey = options.apiKey;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    return headers;
  }

  async init(): Promise<void> {
    try {
      const res = await fetch(`${this.apiUrl}/health`, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('API health check failed');
    } catch (e) {
      console.warn('API init check failed:', e);
    }
  }

  async list(): Promise<Note[]> {
    const res = await fetch(`${this.apiUrl}/notes`, { headers: this.getHeaders() });
    if (!res.ok) throw new Error(`Failed to fetch notes: ${res.statusText}`);
    return res.json();
  }

  async create(input: { text: string }): Promise<Note> {
    const res = await fetch(`${this.apiUrl}/notes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to create note: ${res.statusText}`);
    return res.json();
  }

  async remove(id: number): Promise<boolean> {
    const res = await fetch(`${this.apiUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return res.ok;
  }

  async update(id: number, input: { text: string }): Promise<boolean> {
    const res = await fetch(`${this.apiUrl}/notes/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(input),
    });
    return res.ok;
  }

  async get(id: number): Promise<Note> {
    const res = await fetch(`${this.apiUrl}/notes/${id}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`Failed to fetch note: ${res.statusText}`);
    return res.json();
  }
}
