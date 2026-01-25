import type { INotesRepository } from '../types';

export function makeUpdateNote(repo: INotesRepository) {
  return {
    async execute(id: number, input: { text: string }): Promise<boolean> {
      if (typeof id !== 'number') {
        throw new Error('id must be a number');
      }
      if (typeof input?.text !== 'string') {
        throw new Error('text must be a string');
      }
      return repo.update(id, input);
    },
  };
}
