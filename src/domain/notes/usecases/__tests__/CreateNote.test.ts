import { MockNotesRepository } from '../../../../data/mock/MockNotesRepository';
import { makeCreateNote } from '../CreateNote';

describe('CreateNote Use Case', () => {
  let repository: MockNotesRepository;
  let createNote: ReturnType<typeof makeCreateNote>;

  beforeEach(() => {
    repository = new MockNotesRepository();
    createNote = makeCreateNote(repository);
  });

  test('should create a note with valid text', async () => {
    const input = { text: 'Ma première note' };
    const result = await createNote.execute(input);
    expect(result).toHaveProperty('id');
    expect(result.text).toBe('Ma première note');
    expect(result).toHaveProperty('createdAt');
  });

  test('should throw error when text is empty', async () => {
    const input = { text: '   ' };
    await expect(createNote.execute(input)).rejects.toThrow('Note text is required');
  });

  test('should throw error when text is missing', async () => {
    const input = {};
    await expect(createNote.execute(input)).rejects.toThrow('Note text is required');
  });

  test('should trim whitespace from text', async () => {
    const input = { text: '  Test note  ' };
    const result = await createNote.execute(input);
    expect(result.text).toBe('Test note');
  });
});
