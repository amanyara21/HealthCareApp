import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeSlotGrid = () => {
    return (
        <>
            {Array.from({ length: 24 }, (_, i) => {
                const totalMinutes = i * 20;
                const hour = Math.floor(totalMinutes / 60) + 9;
                const minutes = totalMinutes % 60;
                const timeLabel = `${hour}:${minutes.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
                const isLunch = hour >= 13 && hour < 14;

                return (
                    <View
                        key={`${hour}:${minutes}`}
                        style={[styles.hourStrip, {
                            top: i * 60,
                            backgroundColor: isLunch ? '#FDEDEC' : '#f9f9f9'
                        }]}
                    >
                        <Text style={[styles.timeText, isLunch && { color: '#E74C3C' }]}>
                            {timeLabel} {isLunch ? ' (Lunch)' : ''}
                        </Text>
                    </View>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    hourStrip: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 60,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
});

export default TimeSlotGrid;
