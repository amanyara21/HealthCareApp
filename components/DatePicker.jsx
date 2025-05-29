import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

const DatePicker = ({ selectedDate, onChange }) => {
    return (
        <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedDate} onValueChange={onChange} style={styles.picker}>
                {getNext2Days().map((date) => (
                    <Picker.Item key={date} label={date} value={date} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        width: 220,
        height: 50,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        color: '#333',
        paddingHorizontal: 10,
    },
});

export default DatePicker;
