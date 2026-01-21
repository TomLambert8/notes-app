import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNotes } from "../../src/presentation/hooks/useNotes";
import NoteList from "../components/NoteList";
import NoteModal from "../components/NoteModal";

function NotesScreen() {
	const { notes, addNote, deleteNote, updateNote } = useNotes();
	const [modalVisible, setModalVisible] = useState(false);
	const [newNote, setNewNote] = useState('');
	const [editingNote, setEditingNote] = useState(null);
	
	const handleSaveNote = async (noteText, noteId) => {
		try {
			if (noteId) {
				// Mode édition
				await updateNote(noteId, noteText);
			} else {
				// Mode création
				await addNote(noteText);
			}
			setNewNote('');
			setEditingNote(null);
			setModalVisible(false);
		} catch (error) {
			console.error('Error saving note:', error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteNote(id);
		} catch (error) {
			console.error('Error deleting note:', error);
		}
	};

	const handleEdit = (note) => {
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
			<TouchableOpacity
				style={styles.addButton}
				onPress={handleAddNew}
			>
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