import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AppointmentTypeSelector from '../components/AppointmentTypeSelector';
import TimeSlotSelector from '../components/TimeSlotSelector';

const AppointmentBookingScreen = ({ route }) => {
  const { userToken } = useContext(AuthContext);
  const { doctorId, appointmentType } = route.params;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState(
    Array.isArray(appointmentType) ? appointmentType : [],
  );
  const [selectedType, setSelectedType] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [problemDescription, setProblemDescription] = useState('');

  const API_URL = process.env.API_URL;
  const headers = { Authorization: `Bearer ${userToken}` };

  useEffect(() => {
    if (selectedDate) {
      getAvailableSlots();
    }
  }, [selectedDate]);

  const getAvailableSlots = async () => {
    try {
      console.log("Booking appointment for doctor ID:");

      const apiUrl = `${API_URL}/api/available-slots/${doctorId}/${selectedDate}`;
      console.log(apiUrl)
      const response = await axios.get(apiUrl, { headers });
      setAvailableSlots(response.data || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      Alert.alert('Error', 'Failed to fetch available slots.');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      const formatted = moment(selectedDate).format('YYYY-MM-DD');
      console.log('Selected date:', formatted);
      setSelectedDate(formatted);
      setSelectedSlot(null);
    } else {
      console.log('Date selection canceled');
    }
  
    setShowDatePicker(false);
  };
  

  const handleBookAppointment = async () => {

    if (!selectedDate || !selectedType || !selectedSlot) {
      Alert.alert('Missing Info', 'Please select date, type, and slot.');
      return;
    }

    try {
      console.log("Booking appointment for doctor ID:", appointmentType);

      const response = await axios.post(
        `${API_URL}/user/appointments/book`,
        {
          doctorId,
          appointmentDate: selectedDate,
          appointmentTime: selectedSlot,
          appointmentType: selectedType,
          problemDescription,
        },
        { headers },
      );

      Alert.alert('Success', 'Appointment booked!');
      navigation.goBack();
    } catch (error) {
      console.error('Booking error:', error.response?.data);
      Alert.alert('Error', 'Failed to book appointment.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Book Appointment</Text>

      <View style={styles.dateRow}>
        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.inputBtn}>
          <Text style={styles.selectedText}>{selectedDate}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          minimumDate={new Date()}
          maximumDate={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}
          onChange={onChangeDate}
        />
      )}

      <AppointmentTypeSelector
        types={appointmentTypes}
        selectedTypes={selectedType}
        onChange={setSelectedType}
      />

      <TimeSlotSelector
        slots={availableSlots}
        selectedSlot={selectedSlot}
        onSelectSlot={setSelectedSlot}
      />

      <TextInput
        placeholder="Describe your problem (optional)"
        multiline
        value={problemDescription}
        onChangeText={setProblemDescription}
        style={styles.textArea}
      />

      <TouchableOpacity
        onPress={handleBookAppointment}
        style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  inputBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 16,
    color: '#fff',
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0056b3',
    marginTop: 20,
  },
  bookButtonText: { 
    color: '#FFF', 
    fontSize: 18,
    fontWeight: 'bold'
   },
});

export default AppointmentBookingScreen;
