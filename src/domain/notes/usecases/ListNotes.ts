import type { INotesRepository, Note } from '../types';

export function makeListNotes(repo: INotesRepository) {
  return {
    async execute(): Promise<Note[]> {
      return repo.list();
    },
  };
}
