import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AppointmentCard({ appointment, onCancel, onSeeDetails, onJoinMeet }) {
  function formatDateTime(dateStr, timeStr) {
    const fullDate = new Date(`${dateStr}T${timeStr}`);

    const formattedDate = fullDate.toLocaleDateString('en-in', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedTime = fullDate.toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return { formattedDate, formattedTime };
  }

  const { formattedDate, formattedTime } = formatDateTime(appointment.appointmentDate, appointment.appointmentTime);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Appointment at {appointment.doctor.clinicName}</Text>
      <View style={styles.topRow}>
        <Text style={styles.text}>Doctor: {appointment.doctor.name}</Text>
        <Text style={styles.text}>Date: {formattedDate}</Text>
        <Text style={styles.text}>Time: {formattedTime}</Text>
      </View>

      <View style={styles.buttonRow}>
        {appointment.appointmentType == "ONLINE" && onCancel && (
          <TouchableOpacity style={styles.detailsButton} onPress={() => onJoinMeet(appointment.appoinmentId)}>
            <Text style={styles.buttonText}>Join Meet</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonRow}>
        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel(appointment.id)}>
            <Text style={styles.buttonText}>Cancel Appointment</Text>
          </TouchableOpacity>
        )}
        {onSeeDetails && (
          <TouchableOpacity style={styles.detailsButton} onPress={() => onSeeDetails(appointment.id)}>
            <Text style={styles.buttonText}>See Details</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    color: "#374151",
  },
  topRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#4d79ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },

});
