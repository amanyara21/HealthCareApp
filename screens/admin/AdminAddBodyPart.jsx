import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../../context/AuthContext';

const AdminAddBodyPart = () => {
  const { userToken } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!name || !image) {
      Alert.alert('Please provide a name and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'bodypart.jpg',
    });
    formData.append('name', name);

    try {
      await axios.post(`${process.env.API_URL}/admin/add-body-part`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Image uploaded and saved successfully!');
      setName('');
      setImage(null);
    } catch (error) {
      Alert.alert('Upload failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Add Body Part</Text>
        <TextInput
          style={styles.input}
          placeholder="Body Part Name"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>

        {image && (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        )}

        <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f3',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'cover',
  },
});

export default AdminAddBodyPart;
