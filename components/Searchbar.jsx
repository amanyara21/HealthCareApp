import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"; 

const Searchbar = ({text, onChangeText}) => {
  return (
    <View style={styles.searchBox}>
      <Icon name="search" size={30} color="#000"/>
      <TextInput value={text} onChangeText={(text)=>{onChangeText(text)}} placeholder='Search Here'/>
    </View>
  )
}
const styles = StyleSheet.create({
  searchBox:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    marginHorizontal:20,
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:20,
    elevation:5,
  }
})
export default Searchbar