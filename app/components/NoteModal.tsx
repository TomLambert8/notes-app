import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Note } from '../../src/domain/notes/types';

type Props = {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  newNote: string;
  setNewNote: (v: string) => void;
  onSave: (text: string, noteId?: number) => void;
  editingNote: Note | null;
};

export default function NoteModal({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  onSave,
  editingNote = null,
}: Props) {
  const isEditing = editingNote !== null;

  const handleSave = () => {
    if (newNote.trim()) {
      onSave(newNote.trim(), editingNote?.id);
      setModalVisible(false);
      setNewNote('');
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{isEditing ? 'Edit Note' : 'Add Note'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Write here..."
            placeholderTextColor="#999"
            value={newNote}
            onChangeText={setNewNote}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setNewNote('');
                setModalVisible(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: { fontSize: 16, color: '#333' },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: { fontSize: 16, color: '#fff' },
});
