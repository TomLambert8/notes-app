import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNotes } from '../../src/presentation/hooks/useNotes';
import NoteList from '../components/NoteList';
import NoteModal from '../components/NoteModal';

export default function NotesScreen() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<{ id: number; text: string; createdAt: string } | null>(null);

  const handleSaveNote = async (noteText: string, noteId?: number) => {
    try {
      if (noteId) {
        await updateNote(noteId, noteText);
      } else {
        await addNote(noteText);
      }
      setNewNote('');
      setEditingNote(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note: { id: number; text: string; createdAt: string }) => {
    setEditingNote(note);
    setNewNote(note.text);
    setModalVisible(true);
  };

  const handleAddNew = () => {
    setEditingNote(null);
    setNewNote('');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <NoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
