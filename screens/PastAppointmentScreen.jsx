import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from "react-native";
import axios from "axios";
import AppointmentCard from "../components/AppointmentCard";
import EmptyComponent from "../components/EmptyComponent";
import { AuthContext } from "../context/AuthContext";

const PastAppointmentScreen = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {

            const apiUrl = `${process.env.API_URL}/user/appointments/past`;
            const response = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${userToken}` },
            });
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            Alert.alert("Error", "Failed to fetch appointments.");
        } finally {
            setLoading(false);
        }
    };

    const onSeeDetails = async (id) => {
        navigation.navigate('Home', {
            screen: 'PrescriptionScreen',
            params: { id },
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Past Appointments</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <AppointmentCard
                            appointment={item}
                            onSeeDetails={onSeeDetails}
                        />
                    )}
                    ListEmptyComponent={<EmptyComponent title="No Past Appointments" />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        fontSize: 20,
        fontWeight: "800",
        color: "black",
        marginBottom: 10
    },
});

export default PastAppointmentScreen;
