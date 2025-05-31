import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from "react-native";
import axios from "axios";
import AppointmentCard from "../components/AppointmentCard";
import { AuthContext } from "../context/AuthContext";
import EmptyComponent from "../components/EmptyComponent";

const UpcomingAppointmentScreen = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userToken } = useContext(AuthContext);

  const fetchAppointments = async () => {
    try {
      const apiUrl = `${process.env.API_URL}/user/appointments/upcoming`;
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setAppointments(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch appointments.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const onJoinMeet = async (id) => {
    navigation.navigate('Home', {
        screen: 'Online',
        params: { id },
    });
}


  useEffect(() => {
    fetchAppointments();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };

  const onCancel = async (id) => {
    try {
      const apiUrl = `${process.env.API_URL}/user/appointments/${id}/cancel`;
      const response = await axios.put(apiUrl, null, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error canceling appointment:", error);
      Alert.alert("Error", "Failed to cancel appointment.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Appointments</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AppointmentCard appointment={item} onCancel={onCancel} onJoinMeet={onJoinMeet}/>
          )}
          ListEmptyComponent={<EmptyComponent title="No upcoming appointments."/>}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: "black",
    marginBottom: 10,
  },
});

export default UpcomingAppointmentScreen;

