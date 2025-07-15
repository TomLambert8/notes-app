import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddNoteModal from '../components/AddNoteModal';
import NoteList from '../components/NoteList';
import { addNote, getNotes, initDatabase } from '../services/database';

function NotesScreen() {
	const [notes, setNotes] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [newNote, setNewNote] = useState('');
	
	useEffect(() => {
		const setupDatabase = async () => {
			try {
				await initDatabase();
				loadNotes();
			} catch (error) {
				console.error('Error setting up database:', error);
			}
		};
		
		setupDatabase();
	}, []);

	const loadNotes = async () => {
		try {
			const loadedNotes = await getNotes();
			setNotes(loadedNotes);
		} catch (error) {
			console.error('Error loading notes:', error);
		}
	};
	
	const handleAddNote = async (noteText) => {
		if (noteText.trim() === '') return;
		
		try {
			await addNote(noteText);
			setNewNote('');
			setModalVisible(false);
			loadNotes();
		} catch (error) {
			console.error('Error adding note:', error);
		}
	};
	
	return (
		<View style={styles.container}>     
			<NoteList notes={notes} onNotesChange={loadNotes} />
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