import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { pick, types } from '@react-native-documents/picker';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const AddPrescriptionScreen = ({ route }) => {
    const { appointmentId, userId } = route.params;
    const { userToken } = useContext(AuthContext);
    const navigation = useNavigation();

    const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '' }]);
    const [labTests, setLabTests] = useState([{ testName: '', fileUrl: '' }]);

    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const handleLabTestChange = (index, value) => {
        const updated = [...labTests];
        updated[index].testName = value;
        setLabTests(updated);
    };

    const uploadPdf = async (index) => {
        try {
            const result = await pick({
                type: [types.pdf],
            });

            const file = result[0];

            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                type: file.type,
                name: file.name,
            });

            const response = await axios.post(`${process.env.API_URL}/upload/pdf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const updated = [...labTests];
            updated[index].fileUrl = response.data;
            setLabTests(updated);
            Alert.alert('Success', 'PDF uploaded!');
        } catch (err) {
            console.error('PDF Upload Error:', err);
            if (!DocumentPicker.isCancel(err)) {
                console.error('PDF Upload Error:', err);
                Alert.alert('Error', 'Failed to upload PDF');
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                patientId: userId,
                appointmentId,
                medicines,
                labTests,
            };
            console.log(payload)

            await axios.post(`${process.env.API_URL}/doctor/prescriptions`, payload, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            Alert.alert('Success', 'Prescription added successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Prescription Submit Error:', error);
            Alert.alert('Error', 'Failed to add prescription');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Add Prescription</Text>

            <Text style={styles.sectionTitle}>Medicines</Text>
            {medicines.map((med, index) => (
                <View key={index} style={styles.card}>
                    <TextInput
                        style={styles.input}
                        placeholder="Medicine Name"
                        value={med.name}
                        onChangeText={(text) => handleMedicineChange(index, 'name', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Dosage"
                        value={med.dosage}
                        onChangeText={(text) => handleMedicineChange(index, 'dosage', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Frequency"
                        value={med.frequency}
                        onChangeText={(text) => handleMedicineChange(index, 'frequency', text)}
                    />
                </View>
            ))}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setMedicines([...medicines, { name: '', dosage: '', frequency: '' }])}
            >
                <Text style={styles.buttonText}>+ Add Another Medicine</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Lab Tests</Text>
            {labTests.map((test, index) => (
                <View key={index} style={styles.card}>
                    <TextInput
                        style={styles.input}
                        placeholder="Lab Test Name"
                        value={test.testName}
                        onChangeText={(text) => handleLabTestChange(index, text)}
                    />
                    <TouchableOpacity style={styles.uploadButton} onPress={() => uploadPdf(index)}>
                        <Text style={styles.uploadText}>
                            {test.fileUrl ? 'PDF Uploaded ✅' : 'Upload Lab Test PDF'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setLabTests([...labTests, { testName: '', fileUrl: '' }])}
            >
                <Text style={styles.buttonText}>+ Add Another Lab Test</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit Prescription</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f4f8',
        flexGrow: 1,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
        color: '#2e7d32',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1e88e5',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    addButton: {
        backgroundColor: '#43a047',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
    },
    uploadButton: {
        backgroundColor: '#1976d2',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    uploadText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#1b5e20',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },
    submitText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default AddPrescriptionScreen;
