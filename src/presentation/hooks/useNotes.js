import { useCallback, useEffect, useState } from 'react';
import { notesUseCases } from '../../composition/notesComposition';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    try {
      const loaded = await notesUseCases.listNotes.execute();
      setNotes(loaded);
    } catch (e) {
      setError(e);
    }
  }, []);

  const addNote = useCallback(async (text) => {
    try {
      console.log('Adding note:', text);
      const result = await notesUseCases.createNote.execute({ text });
      console.log('Note added successfully:', result);
      await reload();
    } catch (err) {
      console.error('Error in addNote:', err);
      throw err;
    }
  }, [reload]);

  const deleteNote = useCallback(async (id) => {
    await notesUseCases.deleteNote.execute(id);
    await reload();
  }, [reload]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await notesUseCases.initDb.execute();
        if (!cancelled) {
          setReady(true);
          await reload();
        }
      } catch (e) {
        if (!cancelled) setError(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  return { notes, ready, error, reload, addNote, deleteNote };
}

