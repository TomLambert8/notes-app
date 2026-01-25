import { dataSourceConfig } from '../config/dataSource';
import { RepositoryFactory } from '../data/RepositoryFactory';
import type { INotesRepository } from '../domain/notes/types';
import {
  makeCreateNote,
  makeDeleteNote,
  makeGetNote,
  makeInitNotesDb,
  makeListNotes,
  makeUpdateNote,
} from '../domain/notes/usecases/index';

let repo: INotesRepository | null = null;

function getRepo(): INotesRepository {
  if (!repo) {
    repo = RepositoryFactory.createNotesRepository(
      dataSourceConfig.type as 'drizzle' | 'api' | 'mock',
      dataSourceConfig.options
    );
  }
  return repo;
}

export const notesUseCases = {
  initDb: { execute: () => makeInitNotesDb(getRepo()).execute() },
  listNotes: { execute: () => makeListNotes(getRepo()).execute() },
  createNote: { execute: (input: { text: string }) => makeCreateNote(getRepo()).execute(input) },
  deleteNote: { execute: (id: number) => makeDeleteNote(getRepo()).execute(id) },
  getNote: { execute: (id: number) => makeGetNote(getRepo()).execute(id) },
  updateNote: {
    execute: (id: number, input: { text: string }) =>
      makeUpdateNote(getRepo()).execute(id, input),
  },
};
