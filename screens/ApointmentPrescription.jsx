import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import MedicineList from '../components/MedicineList';
import LabTests from '../components/LabTest';

const AppointmentPrescriptionScreen = ({ route }) => {
  const { id } = route.params;
  const { userToken } = useContext(AuthContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/user/appointment/prescription/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setPrescriptions(response.data);
    } catch (error) {
      Alert.alert('Failed to fetch prescriptions', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : prescriptions.length > 0 ? (
        <>
          <Text style={styles.header}>Prescriptions</Text>
          <MedicineList prescriptions={prescriptions} scrollEnabled={false} />
          <View style={{ height: 40 }} />
          <LabTests prescriptions={prescriptions} scrollEnabled={false} />
        </>
      ) : (
        <Text style={styles.noDataText}>No prescriptions available for this patient.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f4f6f8',
      marginTop:20,
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
  },
  noDataText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginTop: 40,
  },
});

export default AppointmentPrescriptionScreen;
