import Logo from '@/assets/images/react-logo.png';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNotes } from "../src/presentation/hooks/useNotes";
export default function HomeScreen() {
    const router = useRouter();
    const loadNotes = useNotes();

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image}/>
      <Text style={styles.title}>Welcome to my first app.</Text>
      <Text style={styles.subtitle}>let's get started !</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('notes')}

      >
        <Text style={styles.btTxt}>Start</Text>
      </TouchableOpacity>
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
  button:{
    backgroundColor:'#6d071a',
    borderRadius:8,
    paddingVertical:12,
    paddingHorizontal: 35,
    margin:15,
    
  },
  btTxt:{
    color:'#FFC300',
    fontSize:18,
    fontWeight:'bold',

  },
  title:{
    color:'#333',
    fontSize:28,
    fontWeight:'bold',

  }
})