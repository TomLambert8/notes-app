export interface Note {
  id: number;
  text: string;
  createdAt: string;
}

export interface INotesRepository {
  init(): Promise<void>;
  list(): Promise<Note[]>;
  create(input: { text: string }): Promise<Note>;
  remove(id: number): Promise<boolean>;
  update(id: number, input: { text: string }): Promise<boolean>;
  get(id: number): Promise<Note>;
}
