import type { INotesRepository, Note } from '../types';

export function makeGetNote(repo: INotesRepository) {
  return {
    async execute(id: number): Promise<Note> {
      if (typeof id !== 'number') {
        throw new Error('id must be a number');
      }
      return repo.get(id);
    },
  };
}
