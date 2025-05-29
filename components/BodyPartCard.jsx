import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function BodyPartCard({imageUri, partName, onPress}) {
  return (
    <TouchableOpacity style={styles.card} onPress={()=>onPress(partName, imageUri)}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Text style={styles.text}>{partName}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor:'white',
    padding: 20,
    marginTop:20,
    borderColor: 'transparent',
    borderWidth: 2,
    borderRadius: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: "40%"
  },
  image: {
    height: 100,
    width: 100, 
    border:1,
    borderRadius:20,
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    textAlign:"center",
    color:"black"
  }
})