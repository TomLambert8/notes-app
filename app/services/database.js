import * as SQLite from 'expo-sqlite';

console.log('Opening database...');
const dbName = 'notes.db';
const db = SQLite.openDatabaseSync(dbName);
console.log('Database object:', db);

// Try different query formats to test what works
try {
  console.log('Testing queries...');
  console.log('Test 1:', db.execSync('PRAGMA table_info(sqlite_master)'));
  console.log('Test 2:', db.execSync('PRAGMA database_list'));
  console.log('Test 3:', db.execSync('SELECT sqlite_version()'));
} catch (error) {
  console.error('Query test error:', error);
}

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Initializing database...');
      
      // Try creating table with explicit schema
      const schema = `
        PRAGMA foreign_keys = ON;
        
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT,
          createdAt TEXT
        );
      `;
      
      const result = db.execSync(schema);
      console.log('Schema creation result:', result);
      
      // Try inserting a test record
      try {
        const testInsert = db.execSync("INSERT INTO notes (text, createdAt) VALUES ('Test note', datetime('now'))");
        console.log('Test insert result:', testInsert);
      } catch (e) {
        console.log('Test insert skipped:', e.message);
      }
      
      resolve(true);
    } catch (error) {
      console.error('Database initialization error:', error);
      reject(error);
    }
  });
};

export const getNotes = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Getting notes...');
      const result = db.execSync('SELECT * FROM notes');
      console.log('Raw notes result:', result);
      
      // Handle both array and object result formats
      let notes = [];
      if (Array.isArray(result)) {
        notes = result.map(row => ({
          id: row[0],
          text: row[1],
          createdAt: row[2]
        }));
      } else if (result && typeof result === 'object') {
        notes = Object.values(result).map(row => ({
          id: row.id || row[0],
          text: row.text || row[1],
          createdAt: row.createdAt || row[2]
        }));
      }
      
      console.log('Processed notes:', notes);
      resolve(notes);
    } catch (error) {
      console.error('Error getting notes:', error);
      reject(error);
    }
  });
};

export const addNote = (text) => {
  return new Promise((resolve, reject) => {
    try {
      if (!text || text.trim() === '') {
        throw new Error('Note text cannot be empty');
      }
      
      const trimmedText = text.trim().replace(/'/g, "''"); // Escape single quotes
      const createdAt = new Date().toISOString();
      
      // Try direct insert
      db.execSync(`INSERT INTO notes (text, createdAt) VALUES ('${trimmedText}', '${createdAt}')`);
      
      // Get last ID using different methods
      try {
        const idResult = db.execSync('SELECT last_insert_rowid()');
        if (idResult && idResult[0]) {
          resolve(idResult[0][0]);
          return;
        }
      } catch (e) {
        console.log('Could not get last_insert_rowid, trying alternative:', e.message);
      }
      
      // Alternative: get the last inserted note
      try {
        const lastNote = db.execSync('SELECT id FROM notes ORDER BY id DESC LIMIT 1');
        if (lastNote && lastNote[0]) {
          resolve(lastNote[0][0]);
          return;
        }
      } catch (e) {
        console.log('Could not get last note:', e.message);
      }
      
      resolve(null);
    } catch (error) {
      console.error('Error adding note:', error);
      reject(error);
    }
  });
};

export const deleteNote = (id) => {
  return new Promise((resolve, reject) => {
    try {
      db.execSync(`DELETE FROM notes WHERE id = ${id}`);
      resolve();
    } catch (error) {
      console.error('Error deleting note:', error);
      reject(error);
    }
  });
};

export default {
  initDatabase,
  getNotes,
  addNote,
  deleteNote,
};