import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Searchbar from "../components/Searchbar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import MedicineList from "../components/MedicineList";
import { ActivityIndicator } from "react-native-paper";

export default function MedicineTable() {
    const [loading, setLoading] = useState(true);
    const [prescriptions, setPrescriptions] = useState([]);
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        getMedicines();
    }, []);

    const getMedicines = async () => {
        setLoading(true);
        try {
            const apiUrl = `${process.env.API_URL}/user/prescriptions`;
            const response = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${userToken}` },
            });
            setPrescriptions(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            Alert.alert("Error", "Failed to fetch appointments.");
        } finally {
            setLoading(false);
        }
    };
    // Sample test reports data
    if(loading){
        return <ActivityIndicator/>
    }

    return (
        <View style={styles.container}>
            <Searchbar />
            <MedicineList prescriptions={prescriptions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    tableHeader: {
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: "#4F46E5",
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    headerText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    scrollContainer: {
        marginTop: 10,
    },
    tableRow: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    alternateRow: {
        backgroundColor: "#F9FAFB",
    },
    cellText: {
        fontSize: 15,
        textAlign: "center",
        color: "#374151",
    },
});
