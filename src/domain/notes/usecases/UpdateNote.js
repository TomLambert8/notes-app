/**
 * @param {import('../INotesRepository').INotesRepository} repo
 */
export function makeUpdateNote(repo) {
    return {
      /** @param {number} id @param {{ text: string }} input @returns {Promise<boolean>} */
      async execute(id, input) {
        if (typeof id !== 'number') {
          throw new Error('id must be a number');
        }
        if (typeof input?.text !== 'string') {
          throw new Error('text must be a string');
        }
        return await repo.update(id, input);
      },
    };
  }