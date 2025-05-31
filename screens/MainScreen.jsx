import { View, FlatList, ActivityIndicator } from 'react-native'
import { useEffect, useState, useContext } from 'react'

import BodyPartCard from '../components/BodyPartCard'
import AppName from '../components/AppName'
import Searchbar from '../components/Searchbar'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../context/AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainScreen = () => {
  const navigation = useNavigation()
  const { userToken, setUserToken, setUser } = useContext(AuthContext)
  const [bodyParts, setBodyParts] = useState([]);
  const [filteredBodyParts, setFilteredBodyParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchBodyParts();
  }, [])
  const fetchBodyParts = async () => {
    try {
      const url = `${process.env.API_URL}/users/body-parts`;
      const headers = {
        Authorization: `Bearer ${userToken}`
      };
      const response = await axios.get(url, { headers });
      setFilteredBodyParts(response.data)
      setBodyParts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (query) => {
    setText(query)
    if (query.trim() === "") {
      setFilteredBodyParts(bodyParts);
    } else {
      const filtered = bodyParts.filter((part) =>
        part.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBodyParts(filtered);
    }

  }
  const onPress = (partName, image) => {
    navigation.navigate('Doctors', { partName, image })
  }
  const onLogout = async() => {
    setUser(null)
    setUserToken(null)
    await AsyncStorage.removeItem("userToken")
  }
  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View>
      <AppName title="Hello" onLogout={onLogout}/>
      <Searchbar text={text} onChangeText={onSearch} />
      <FlatList
        data={filteredBodyParts}
        horizontal={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BodyPartCard imageUri={item.imageUrl} partName={item.name} onPress={onPress} />
        )}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />

    </View>
  )
}



export default MainScreen