import type { INotesRepository, Note } from '../types';

export function makeCreateNote(repo: INotesRepository) {
  return {
    async execute(input: { text?: string }): Promise<Note> {
      const text = (input?.text ?? '').trim();
      if (!text) {
        throw new Error('Note text is required');
      }
      return repo.create({ text });
    },
  };
}
