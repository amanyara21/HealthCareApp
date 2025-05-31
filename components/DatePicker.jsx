import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ selectedDate, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);

    const onChangeDate = (event, selected) => {
        setShowPicker(Platform.OS === 'ios');
        if (selected) {
            const isoDate = selected.toISOString().split('T')[0];
            onChange(isoDate);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
                <Text style={styles.buttonText}>Date: {selectedDate || 'None'}</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={selectedDate ? new Date(selectedDate) : today}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                    maximumDate={maxDate}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    dateButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedText: {
        marginTop: 12,
        fontSize: 16,
        color: '#333',
    },
});

export default DatePicker;
