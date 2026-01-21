/**
 * @param {import('../INotesRepository').INotesRepository} repo
 */
export function makeGetNote(repo) {
    return {
      /** @param {number} id @returns {Promise<boolean>} */
      async execute(id) {
        if (typeof id !== 'number') {
          throw new Error('id must be a number');
        }
        return await repo.get(id);
      },
    };
  }