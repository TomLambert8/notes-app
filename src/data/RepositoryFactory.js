import { ApiNotesRepository } from './api/ApiNotesRepository';
import { MockNotesRepository } from './mock/MockNotesRepository';
import { SqliteNotesRepository } from './sqlite/SqliteNotesRepository';

/**
 * Factory to create the appropriate repository based on configuration
 */
export class RepositoryFactory {
  /**
   * Creates a notes repository based on the provided type
   * @param {'sqlite' | 'api' | 'mock' | 'sqlserver'} type - The type of repository to create
   * @param {object} config - Configuration options for the repository
   * @returns {import('../domain/notes/INotesRepository').INotesRepository}
   */
  static createNotesRepository(type = 'sqlite', config = {}) {
    switch (type) {
      case 'sqlite':
        return new SqliteNotesRepository(config);
      
      case 'api':
        return new ApiNotesRepository(config);
      
      case 'mock':
        return new MockNotesRepository();
      
      case 'sqlserver':
        // Future: return new SqlServerNotesRepository(config);
        throw new Error('SQL Server repository not implemented yet');
      
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }
}
