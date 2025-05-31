import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import LabTests from "../components/LabTest";
import axios from "axios";

export default function ReportsImage() {

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
  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <LabTests prescriptions={prescriptions} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#374151",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 8,
  },
  detailsContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#374151",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "80%",
  },
});
