import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

const AddUnavailableDatesScreen = () => {
    const [selectedDates, setSelectedDates] = useState({});
    const { userToken } = useContext(AuthContext);

    const toggleDate = (date) => {
        setSelectedDates((prev) => {
            const newDates = { ...prev };
            if (newDates[date]) {
                delete newDates[date];
            } else {
                newDates[date] = { selected: true, marked: true, selectedColor: '#e53935' };
            }
            return newDates;
        });
    };

    const handleSubmit = async () => {
        try {
            const formattedDates = Object.keys(selectedDates).map((dateStr) =>
                moment(dateStr).format('YYYY-MM-DD')
            );
            console.log(`${process.env.API_URL}/doctor/unavailable-dates`)

            await axios.post(
                `${process.env.API_URL}/doctor/unavailable-dates`,
                { dates: formattedDates },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            Alert.alert('Success', 'Unavailable Dates Added Successfully!');
        } catch (error) {
            console.error('Submit Error:', error);
            Alert.alert('Error', 'Failed to submit unavailable dates');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Unavailable Dates</Text>
            <Calendar
                onDayPress={(day) => toggleDate(day.dateString)}
                markedDates={selectedDates}
                minDate={moment().format('YYYY-MM-DD')} 
                theme={{
                    selectedDayBackgroundColor: '#e53935',
                    todayTextColor: '#00adf5',
                    arrowColor: '#e53935',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                }}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit Unavailable Dates</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#e53935',
        padding: 14,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddUnavailableDatesScreen;
