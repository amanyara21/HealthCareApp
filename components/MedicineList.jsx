import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MedicineList = ({ prescriptions, scrollEnabled }) => {
    const allMedicines = prescriptions.flatMap(prescription =>
        prescription.medicines.map(med => ({
            ...med,
            prescriptionDate: prescription.date,
            doctorName: prescription.doctor.name,
            id: `${prescription.id}-${med.name}`
        }))
    );

    const renderItem = ({ item, index }) => (
        <View style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.dosage}</Text>
            <Text style={styles.cell}>{item.frequency}</Text>
            <Text style={styles.cell}>{item.doctorName}</Text>
            <Text style={styles.cell}>{item.prescriptionDate}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={[styles.cell, styles.headerText]}>Medicine</Text>
                <Text style={[styles.cell, styles.headerText]}>Dosage</Text>
                <Text style={[styles.cell, styles.headerText]}>Frequency</Text>
                <Text style={[styles.cell, styles.headerText]}>Doctor</Text>
                <Text style={[styles.cell, styles.headerText]}>Date</Text>
            </View>

            <FlatList
                data={allMedicines}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={scrollEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#4F46E5',
        paddingVertical: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
    },
    oddRow: {
        backgroundColor: '#ffffff',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    }
});

export default MedicineList;
