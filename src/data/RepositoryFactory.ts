import type { INotesRepository } from '../domain/notes/types';
import { ApiNotesRepository } from './api/ApiNotesRepository';
import { DrizzleNotesRepository } from './drizzle/DrizzleNotesRepository';
import { MockNotesRepository } from './mock/MockNotesRepository';

export type RepoType = 'drizzle' | 'api' | 'mock' | 'sqlserver';
export type RepoConfig = { dbName?: string; apiUrl?: string; apiKey?: string };

export class RepositoryFactory {
  static createNotesRepository(type: RepoType = 'drizzle', config: RepoConfig = {}): INotesRepository {
    switch (type) {
      case 'drizzle':
        return new DrizzleNotesRepository(config);
      case 'api':
        if (!config.apiUrl) throw new Error('apiUrl required for api repository');
        return new ApiNotesRepository({ apiUrl: config.apiUrl, apiKey: config.apiKey });
      case 'mock':
        return new MockNotesRepository();
      case 'sqlserver':
        throw new Error('SQL Server repository not implemented yet');
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }
}
