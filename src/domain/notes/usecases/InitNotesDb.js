/**
 * @param {import('../INotesRepository').INotesRepository} repo
 */
export function makeInitNotesDb(repo) {
  return {
    /** @returns {Promise<void>} */
    async execute() {
      await repo.init();
    },
  };
}

