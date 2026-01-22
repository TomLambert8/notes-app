/**
 * Data source configuration
 * Change this to switch between different data sources
 */
export const dataSourceConfig = {
  // Type of repository: 'sqlite', 'api', 'sqlserver'
  type: 'sqlite',
  
  // Configuration options for the selected repository
  options: {
    // SQLite options
    dbName: 'notes.db',
    
    // Future API options (when implemented)
    // apiUrl: 'https://api.example.com',
    // apiKey: 'your-api-key',
    
    // Future SQL Server options (when implemented)
    // host: 'localhost',
    // port: 1433,
    // database: 'NotesDB',
    // user: 'sa',
    // password: 'password',
  }
};
