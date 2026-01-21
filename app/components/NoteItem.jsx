import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteItem = ({ note, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{note.text}</Text>
      <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
};

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
    boxShadowColor: '#000',
    boxShadowOffset: {
      width: 0,
      height: 2,
    },
    boxShadowOpacity: 0.25,
    boxShadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
});

export default NoteItem;
