/**
 * @param {import('../INotesRepository').INotesRepository} repo
 */
export function makeListNotes(repo) {
  return {
    /** @returns {Promise<import('../Note').Note[]>} */
    async execute() {
      return await repo.list();
    },
  };
}

