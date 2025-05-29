import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView , RefreshControl} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from '../../components/DatePicker';
import TimeSlotGrid from '../../components/TimeSlotGrid';
import AppointmentBlock from '../../components/AppointmentBlock';
import { useNavigation } from '@react-navigation/native';
import AppName from '../../components/AppName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorAppointmentList = () => {
    const navigation = useNavigation()
    const { userToken, setUserToken, setUser } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(getNext2Days()[0]);
    const [appointments, setAppointments] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchAppointments();
        setRefreshing(false);
    };


    useEffect(() => {
        fetchAppointments();
    }, [selectedDate]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/doctor/appointments/${selectedDate}`, {
                headers: { Authorization: `Bearer ${userToken}` },
                'Content-Type': 'application/json',

            });
            console.log(response.data)
            setAppointments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onPressHandle = (appointmentId) => {
        navigation.navigate('userPrescriptions', { appointmentId });
    }
    const onLogout = async() => {
        await AsyncStorage.removeItem("userToken")
        setUser(null)
        setUserToken(null)
    }

    return (
        <>
            <AppName title="Appointments" onLogout={onLogout}/>
            <View style={styles.container}>
                <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
                <ScrollView contentContainerStyle={{ height: 1440 }}
                refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <TimeSlotGrid />
                    {appointments && appointments.map((appointment, index) => (
                        <AppointmentBlock key={appointment.id} appointment={appointment} index={index} onPressHandle={onPressHandle} />
                    ))}
                </ScrollView>
            </View>
        </>
    );
};

const getNext2Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        days.push(date.toISOString().split('T')[0]);
    }
    return days;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
});

export default DoctorAppointmentList;
