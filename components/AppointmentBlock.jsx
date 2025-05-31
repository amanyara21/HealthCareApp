import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const colors = ['#FF6F61', '#4CAF50', '#00BCD4', '#FF9800', '#9C27B0'];

const getTimePosition = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const totalMinutes = (hour - 9) * 60 + minute;
    return {
        startY: (totalMinutes / 20) * 60,
        height: 60,
    };
};

const AppointmentBlock = ({ appointment, index, onPressHandle }) => {
    const { startY, height } = getTimePosition(appointment.appointmentTime);
    const color = colors[index % colors.length];
    return (
        <TouchableOpacity style={[styles.block, { top: startY, height, backgroundColor: color }]} onPress={()=>onPressHandle(appointment.id)}>
            <Text style={styles.name}>{appointment.patient.username}</Text>
            <Text style={styles.type}>{appointment.appointmentType}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    block: {
        position: 'absolute',
        left: 80,
        right: 10,
        borderRadius: 10,
        padding: 8,
        justifyContent: 'center',
        elevation: 2,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    type: {
        fontSize: 13,
        color: '#fff',
    },
});

export default AppointmentBlock;
