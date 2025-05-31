import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { DoctorContext } from '../../context/DoctorContext';
import AppointmentTypeSelector from '../../components/AppointmentTypeSelector';

const AddDetail = () => {
    const { userToken } = useContext(AuthContext);
    const { setHasDetails } = useContext(DoctorContext);

    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [experience, setExperience] = useState('');
    const [clinicName, setClinicName] = useState('');
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);
    const [selectedBodyParts, setSelectedBodyParts] = useState([]);

    useEffect(() => {
        const fetchBodyParts = async () => {
            try {
                const res = await axios.get(`${process.env.API_URL}/users/body-parts`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setBodyParts(res.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Unable to fetch body parts');
            }
        };

        fetchBodyParts();
    }, []);

    const toggleBodyPart = (partId) => {
        setSelectedBodyParts((prev) =>
            prev.includes(partId) ? prev.filter(id => id !== partId) : [...prev, partId]
        );
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name,
                specialization,
                experience: parseInt(experience),
                clinicName,
                appointmentTypes,
            };

            const doctorRes = await axios.post(`${process.env.API_URL}/doctor/add-doctor-detail`, payload, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            const doctorData = doctorRes.data;
            

            await Promise.all(
                selectedBodyParts.map(bodyPartId =>
                    axios.post(`${process.env.API_URL}/doctor/add-body-part`, {
                        doctor: { id: doctorData.id },
                        bodyPart: { id: bodyPartId }
                    }, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    })
                )
            );

            Alert.alert('Success', 'Doctor details saved successfully');
            setHasDetails(true);
            setName('');
            setSpecialization('');
            setExperience('');
            setClinicName('');
            setAppointmentTypes([]);
            setSelectedBodyParts([]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong!');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Add Doctor Details</Text>

            <TextInput style={styles.input} placeholder="Doctor Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Specialization" value={specialization} onChangeText={setSpecialization} />
            <TextInput style={styles.input} placeholder="Experience (Years)" value={experience} onChangeText={setExperience} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Clinic Name" value={clinicName} onChangeText={setClinicName} />

            <Text style={styles.label}>Select Appointment Type</Text>
            <AppointmentTypeSelector
                types={['ONLINE', 'OFFLINE']}
                selectedTypes={appointmentTypes}
                onChange={setAppointmentTypes}
                multiple={true}
            />

            <Text style={styles.label}>Select Body Parts</Text>
            <View style={styles.chipsContainer}>
                {bodyParts.map((part) => (
                    <TouchableOpacity
                        key={part.id}
                        onPress={() => toggleBodyPart(part.id)}
                        style={[
                            styles.chip,
                            selectedBodyParts.includes(part.id) && styles.selectedChip,
                        ]}
                    >
                        <Text style={selectedBodyParts.includes(part.id) ? styles.selectedText : styles.text}>
                            {part.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor:'#fff'
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        borderColor: '#ccc',
    },
    selectedChip: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },
    text: {
        color: '#000',
    },
    selectedText: {
        color: '#fff',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AddDetail;
