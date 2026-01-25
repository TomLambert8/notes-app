import type { INotesRepository, Note } from '../../domain/notes/types';

export class MockNotesRepository implements INotesRepository {
  notes: Note[] = [];
  private nextId = 1;

  async init(): Promise<void> {}

  async list(): Promise<Note[]> {
    return [...this.notes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async create(input: { text: string }): Promise<Note> {
    const note: Note = {
      id: this.nextId++,
      text: input.text,
      createdAt: new Date().toISOString(),
    };
    this.notes.push(note);
    return note;
  }

  async remove(id: number): Promise<boolean> {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index === -1) return false;
    this.notes.splice(index, 1);
    return true;
  }

  async update(id: number, input: { text: string }): Promise<boolean> {
    const note = this.notes.find((n) => n.id === id);
    if (!note) return false;
    note.text = input.text;
    return true;
  }

  async get(id: number): Promise<Note> {
    const note = this.notes.find((n) => n.id === id);
    if (!note) throw new Error(`Note with id ${id} not found`);
    return note;
  }

  clear(): void {
    this.notes = [];
    this.nextId = 1;
  }
}
