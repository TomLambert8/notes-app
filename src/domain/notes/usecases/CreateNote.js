/**
 * @param {import('../INotesRepository').INotesRepository} repo
 */
export function makeCreateNote(repo) {
  return {
    /**
     * @param {{ text: string }} input
     * @returns {Promise<import('../Note').Note>}
     */
    async execute(input) {
      const text = (input?.text ?? '').trim();
      if (!text) {
        throw new Error('Note text is required');
      }
      return await repo.create({ text });
    },
  };
}

