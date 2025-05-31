import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const { setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/login`, { email, password });
      if (response.data.accessToken) {
        setUserToken(response.data.accessToken);
        await AsyncStorage.setItem("userToken", response.data.accessToken);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Invalid credentials!";
      Alert.alert("Login Failed", message);
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
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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

export default LoginScreen;
