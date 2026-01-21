import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNotes } from "../../src/presentation/hooks/useNotes";
import AddNoteModal from "../components/AddNoteModal";
import NoteList from "../components/NoteList";

function NotesScreen() {
	const { notes, addNote, deleteNote } = useNotes();
	const [modalVisible, setModalVisible] = useState(false);
	const [newNote, setNewNote] = useState('');
	
	const handleAddNote = async (noteText) => {
		try {
			await addNote(noteText);
			setNewNote('');
			setModalVisible(false);
		} catch (error) {
			console.error('Error adding note:', error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteNote(id);
		} catch (error) {
			console.error('Error deleting note:', error);
		}
	};
	
	return (
		<View style={styles.container}>
			<NoteList notes={notes} onDelete={handleDelete} />
			<TouchableOpacity
				style={styles.addButton}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.addButtonText}>+</Text>
			</TouchableOpacity>
			<AddNoteModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newNote={newNote}
				setNewNote={setNewNote}
				addNote={handleAddNote}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding:20,
	},
	image: {
		width:100,
		height:100,
		margin:15,
	},
	subtitle:{
		fontSize:16,
		color:'#666',
		textAlign:'center',

	}, 
	title:{
		color:'#333',
		fontSize:28,
		fontWeight:'bold',

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
})

export default NotesScreen;