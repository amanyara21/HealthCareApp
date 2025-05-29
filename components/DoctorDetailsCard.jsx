import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const DoctorDetailsCard = ({ doctor, image, handleBooking }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.clinic}>🏥 {doctor.clinicName}</Text>
        <Text style={styles.experience}>🩺 {doctor.experience} years experience</Text>

        <View style={styles.appointmentTypeRow}>
          {doctor.appointmentTypes.map((item) => (
            <View key={item} style={styles.appointmentTypeContainer}>
              <Text style={styles.appointmentType}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBooking(doctor.id, doctor.appointmentTypes)}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  specialization: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  clinic: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
  experience: {
    fontSize: 14,
    color: "#007BFF",
    marginBottom: 10,
  },
  appointmentTypeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    gap: 8,
  },
  appointmentTypeContainer: {
    backgroundColor: "#E0F7FA",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  appointmentType: {
    fontSize: 12,
    color: "#007BFF",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0056b3",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DoctorDetailsCard;
