import { FlatList, StyleSheet, View } from 'react-native';
import type { Note } from '../../src/domain/notes/types';
import NoteItem from './NoteItem';

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
};

export default function NoteList({ notes, onDelete, onEdit }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  listContent: { paddingVertical: 10 },
});
