import type { INotesRepository } from '../types';

export function makeInitNotesDb(repo: INotesRepository) {
  return {
    async execute(): Promise<void> {
      await repo.init();
    },
  };
}
