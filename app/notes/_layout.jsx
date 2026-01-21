import { Stack } from 'expo-router';
const NoteLayout = () => {
    return <Stack 
    screenOptions={{
        headerShown : false,
        contentStyle:{
        paddingHorizontal:10,
        paddingTop:10,
        backgroundColor:'rgb(255, 247, 192)'
      }
    }}
    
    />
}

export default NoteLayout