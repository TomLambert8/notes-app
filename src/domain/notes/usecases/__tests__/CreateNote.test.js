import { MockNotesRepository } from '../../../../data/mock/MockNotesRepository';
import { makeCreateNote } from '../CreateNote';

/**
 * Exemple de test unitaire utilisant le MockRepository
 * Démontre comment le principe de substitution permet de tester facilement
 */
describe('CreateNote Use Case', () => {
  let repository;
  let createNote;

  beforeEach(() => {
    // On peut facilement substituer SQLite par Mock pour les tests
    repository = new MockNotesRepository();
    createNote = makeCreateNote(repository);
  });

  test('should create a note with valid text', async () => {
    // Arrange
    const input = { text: 'Ma première note' };

    // Act
    const result = await createNote.execute(input);

    // Assert
    expect(result).toHaveProperty('id');
    expect(result.text).toBe('Ma première note');
    expect(result).toHaveProperty('createdAt');
  });

  test('should throw error when text is empty', async () => {
    // Arrange
    const input = { text: '   ' };

    // Act & Assert
    await expect(createNote.execute(input)).rejects.toThrow('Note text is required');
  });

  test('should throw error when text is missing', async () => {
    // Arrange
    const input = {};

    // Act & Assert
    await expect(createNote.execute(input)).rejects.toThrow('Note text is required');
  });

  test('should trim whitespace from text', async () => {
    // Arrange
    const input = { text: '  Test note  ' };

    // Act
    const result = await createNote.execute(input);

    // Assert
    expect(result.text).toBe('Test note');
  });
});
