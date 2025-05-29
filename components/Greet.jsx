import { Image, StyleSheet, Text, View } from 'react-native'

export default function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Card</Text>
    </View>
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
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    textAlign:"center"
  }
})