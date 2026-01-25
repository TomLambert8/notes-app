import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Note } from '../../src/domain/notes/types';

type Props = {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
};

export default function NoteItem({ note, onDelete, onEdit }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textContainer} onPress={() => onEdit(note)}>
        <Text style={styles.text}>{note.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textContainer: { flex: 1, marginRight: 10 },
  text: { fontSize: 16 },
  deleteButton: { padding: 5 },
});
