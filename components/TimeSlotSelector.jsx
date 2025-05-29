import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimeSlotSelector = ({ slots, selectedSlot, onSelectSlot }) => {
    if (!slots || slots.length === 0) {
        return (
            <Text style={{ textAlign: 'center', color: '#888', marginBottom: 10 }}>
                No slots available
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            {slots.map((slot, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.slot, selectedSlot === slot && styles.selectedSlot]}
                    onPress={() => onSelectSlot(slot)}>
                    <Text
                        style={selectedSlot === slot ? styles.selectedText : styles.text}>
                         {slot.substring(0, 5)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 15,
        width:'100%',
    },
    slot: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
    },
    selectedSlot: {
        backgroundColor: '#007BFF',
    },
    text: { 
        color: '#000'
    },
    selectedText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
});

export default TimeSlotSelector;
