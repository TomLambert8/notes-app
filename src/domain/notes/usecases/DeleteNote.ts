import type { INotesRepository } from '../types';

export function makeDeleteNote(repo: INotesRepository) {
  return {
    async execute(id: number): Promise<boolean> {
      if (typeof id !== 'number') {
        throw new Error('id must be a number');
      }
      return repo.remove(id);
    },
  };
}
