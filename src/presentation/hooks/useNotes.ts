import { useCallback, useEffect, useState } from 'react';
import { notesUseCases } from '../../composition/notesComposition';
import type { Note } from '../../domain/notes/types';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const reload = useCallback(async () => {
    try {
      const loaded = await notesUseCases.listNotes.execute();
      setNotes(loaded);
    } catch (e) {
      setError(e);
    }
  }, []);

  const addNote = useCallback(
    async (text: string) => {
      const result = await notesUseCases.createNote.execute({ text });
      await reload();
      return result;
    },
    [reload]
  );

  const deleteNote = useCallback(
    async (id: number) => {
      await notesUseCases.deleteNote.execute(id);
      await reload();
    },
    [reload]
  );

  const getNote = useCallback(async (id: number): Promise<Note> => {
    return notesUseCases.getNote.execute(id);
  }, []);

  const updateNote = useCallback(
    async (id: number, text: string) => {
      await notesUseCases.updateNote.execute(id, { text });
      await reload();
    },
    [reload]
  );

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

  return { notes, ready, error, reload, addNote, deleteNote, getNote, updateNote };
}
