export type DataSourceType = 'drizzle' | 'api' | 'sqlserver';

export type DataSourceOptions = {
  dbName?: string;
  apiUrl?: string;
  apiKey?: string;
};

export const dataSourceConfig: {
  type: DataSourceType;
  options: DataSourceOptions;
} = {
  type: 'drizzle',
  options: {
    dbName: 'notes.db',
  },
};
