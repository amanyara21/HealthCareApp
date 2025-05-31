import React, { useState, useContext } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.accessToken) {
        setUserToken(response.data.accessToken);
        await AsyncStorage.setItem("userToken", response.data.accessToken);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      Alert.alert("Signup Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.innerContainer}>

        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    color: "#007bff",
    textAlign: "center",
    fontSize: 16,
  },
});
