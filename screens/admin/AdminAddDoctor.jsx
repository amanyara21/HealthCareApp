import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AppName from '../../components/AppName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminAddDoctor = () => {
    const { userToken, setUserToken, setUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateDoctor = async () => {
        if (!name || !email || !password) {
            Alert.alert('Please fill all fields');
            return;
        }

        try {
            await axios.post(
                `${process.env.API_URL}/admin/create-doctor`,
                { name, email, password },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            Alert.alert('Doctor Created Successfully');
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            Alert.alert('Error creating doctor');
        }
    };
    const onLogout = async() => {
        await AsyncStorage.removeItem("userToken")
        setUser(null)
        setUserToken(null)
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <AppName title="Admin" onLogout={onLogout}/>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Add Doctor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#777"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#777"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleCreateDoctor}>
                        <Text style={styles.buttonText}>Create Doctor</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    form: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        marginBottom: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fafafa',
    },
    button: {
        backgroundColor: '#1e90ff',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AdminAddDoctor;
