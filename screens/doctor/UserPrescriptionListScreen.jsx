import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import MedicineList from '../../components/MedicineList';
import LabTests from '../../components/LabTest';

const UserPrescriptionListScreen = ({ route }) => {
    const { appointmentId } = route.params;
    const { userToken } = useContext(AuthContext);
    const [appointment, setAppointment] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchAppointmentDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.API_URL}/api/appointment/${appointmentId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            });
            setAppointment(response.data);
        } catch (error) {
            console.log('Error fetching appointment:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPrescriptions = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/doctor/prescriptions/${appointment.patient.email}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const sortedPrescriptions = response.data
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5);

            setPrescriptions(sortedPrescriptions);
        } catch (error) {
            console.log('Error fetching prescriptions:', error);
        }
    };

    useEffect(() => {
        fetchAppointmentDetails();
    }, []);

    useEffect(() => {
        if (appointment) {
            fetchPrescriptions();
        }
    }, [appointment]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {appointment?.appointmentType === 'ONLINE' && (
                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => navigation.navigate('Online', { appointmentId })}
                >
                    <Text style={styles.buttonText}>Join Online Consultation</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                    navigation.navigate('AddPrescription', {
                        appointmentId: appointmentId,
                        userId: appointment?.patient?.id,
                    })
                }
            >
                <Text style={styles.buttonText}>Add Prescription</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : prescriptions.length > 0 ? (
                <>
                    <Text style={styles.header}>Patient's Recent Prescriptions</Text>
                    <MedicineList prescriptions={prescriptions} scrollEnabled={false} />
                    <View style={{ height: 40 }} />
                    <LabTests prescriptions={prescriptions} scrollEnabled={false} />
                </>
            ) : (
                <Text style={styles.noDataText}>No prescriptions available for this patient.</Text>
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#e0f7fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796b',
    },
    subtitle: {
        fontSize: 14,
        color: '#333',
        marginVertical: 4,
    },
    details: {
        fontSize: 13,
        color: '#555',
    },
    joinButton: {
        backgroundColor: '#2196F3',
        padding: 14,
        borderRadius: 8,
        margin: 12,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 8,
        margin: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    noDataText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 40,
    },
});

export default UserPrescriptionListScreen;
