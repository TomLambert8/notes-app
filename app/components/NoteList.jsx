import { FlatList, StyleSheet, View } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete }) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteItem note={item} onDelete={onDelete} />
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
