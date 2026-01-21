import { SqliteNotesRepository } from '../data/sqlite/SqliteNotesRepository';
import { makeCreateNote } from '../domain/notes/usecases/CreateNote';
import { makeDeleteNote } from '../domain/notes/usecases/DeleteNote';
import { makeInitNotesDb } from '../domain/notes/usecases/InitNotesDb';
import { makeListNotes } from '../domain/notes/usecases/ListNotes';

// Lazy initialization of repository to avoid issues on web
let repo = null;

function getRepo() {
  if (!repo) {
    repo = new SqliteNotesRepository({ dbName: 'notes.db' });
  }
  return repo;
}

export const notesUseCases = {
  initDb: {
    execute: async () => {
      const repository = getRepo();
      return makeInitNotesDb(repository).execute();
    }
  },
  listNotes: {
    execute: async () => {
      const repository = getRepo();
      return makeListNotes(repository).execute();
    }
  },
  createNote: {
    execute: async (input) => {
      const repository = getRepo();
      return makeCreateNote(repository).execute(input);
    }
  },
  deleteNote: {
    execute: async (id) => {
      const repository = getRepo();
      return makeDeleteNote(repository).execute(id);
    }
  },
};

