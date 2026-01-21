import { SqliteNotesRepository } from '../data/sqlite/SqliteNotesRepository';
import { makeCreateNote, makeDeleteNote, makeGetNote, makeInitNotesDb, makeListNotes, makeUpdateNote } from '../domain/notes/usecases/index.js';

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
  getNote: {
    execute: async (id) => {
      const repository = getRepo();
      return makeGetNote(repository).execute(id);
    }
  },
  updateNote: {
    execute: async (id, text) => {
      const repository = getRepo();
      return makeUpdateNote(repository).execute(id, text);
    }
  }
};

