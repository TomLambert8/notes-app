import * as SQLite from 'expo-sqlite';

const dbName = 'notes.db';
const db = SQLite.openDatabaseSync(dbName);

export const initDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // Activer les foreign keys
    await db.execAsync('PRAGMA foreign_keys = ON;');
    
    // Créer la table notes
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
    
    console.log('Database initialized successfully!');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export const getNotes = async () => {
  try {
    const notes = await db.getAllAsync('SELECT * FROM notes ORDER BY createdAt DESC');
    console.log('Retrieved notes:', notes);
    return notes;
  } catch (error) {
    console.error('Error getting notes:', error);
    throw error;
  }
};

export const addNote = async (text) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO notes (text, createdAt) VALUES (?, ?)',
      [text, new Date().toISOString()]
    );
    console.log('Note added with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const result = await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
    console.log('Note deleted, changes:', result.changes);
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

export const testDatabase = async () => {
  try {
    // Initialiser la DB
    await initDatabase();
    
    // Ajouter une note
    const noteId = await addNote('Ma première note !');
    
    // Récupérer toutes les notes
    const notes = await getNotes();
    
    // Modifier la note
    await updateNote(noteId, 'Note modifiée !');
    
    // Récupérer à nouveau
    const updatedNotes = await getNotes();
    
    console.log('Test completed successfully!');
    return updatedNotes;
  } catch (error) {
    console.error('Test failed:', error);
  }
};

export default {
  testDatabase
};