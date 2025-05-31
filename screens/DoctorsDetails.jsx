import React, { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import EmptyComponent from "../components/EmptyComponent";
import DoctorDetailsCard from "../components/DoctorDetailsCard";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../context/AuthContext";

const DoctorsDetailsScreen = ({ route }) => {
  const { userToken } = useContext(AuthContext)
  const { partName, image } = route.params;
  const [doctors, setDoctors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDoctors();
  }, [])

  const handleBookAppointment = (doctorId, appointmentType) => {
    navigation.navigate('Appointment', { doctorId, appointmentType })
  };

  const fetchDoctors = async () => {
    try {
      const url = `${process.env.API_URL}/users/doctor/by-body-part?bodyPartName=${partName}`
      const headers = {
        Authorization: `Bearer ${userToken}`
      };
      const response = await axios.get(url, { headers });
      setDoctors(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={doctors}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DoctorDetailsCard doctor={item} image={image} handleBooking={handleBookAppointment} />
      )}
      ListEmptyComponent={<EmptyComponent title="No Doctor Available"/>}
    />

  );
};

export default DoctorsDetailsScreen;
