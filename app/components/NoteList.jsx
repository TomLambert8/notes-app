import { FlatList, StyleSheet, View } from "react-native";
import { deleteNote } from "../services/database";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onNotesChange }) => {
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      // Trigger a refresh of the notes list
      if (onNotesChange) {
        onNotesChange();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteItem note={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingVertical: 10,
  },
});

export default NoteList;
