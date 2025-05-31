import React, { useEffect } from "react";
import { Alert, Appearance, LogBox, PermissionsAndroid, Platform } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";
import {
  initialize,
  getSdkStatus,
  requestPermission,
  SdkAvailabilityStatus
} from "react-native-health-connect";
import { DoctorProvider } from "./context/DoctorContext";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["HealthConnectClient"]);
    setupHealthConnect();
    requestMediaPermissions();
    Appearance.setColorScheme("light");
  }, []);

  const setupHealthConnect = async () => {
    try {
      const isInitialized = await initialize();
      const sdkStatus = await getSdkStatus();

      if (!isInitialized || sdkStatus !== SdkAvailabilityStatus.SDK_AVAILABLE) {
        Alert.alert(
          "Health Connect not available",
          "Please install and enable Health Connect app from Play Store."
        );
        console.warn("Health Connect is not available on this device.");
        return;
      }

      const permissions = await requestPermission([
        { recordType: "Steps", accessType: "read" },
        { recordType: "HeartRate", accessType: "read" },
        { recordType: "BodyTemperature", accessType: "read" },
        { recordType: "SleepSession", accessType: "read" },
        { recordType: "Distance", accessType: "read" },
        { recordType: "OxygenSaturation", accessType: "read" },
      ]);


      if (permissions.length === 0) {
        Alert.alert(
          "Permissions Denied",
          "You need to allow Health Connect permissions for this app to function properly. Please enable them in Settings."
        );
      }
    } catch (error) {
      console.error("Error during Health Connect setup:", error);
    }
  };

  const requestMediaPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.BODY_SENSORS
        ]);

        if (
          granted["android.permission.CAMERA"] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted["android.permission.RECORD_AUDIO"] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted["android.permission.BODY_SENSORS"] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          
        }
      } else if (Platform.OS === "ios") {
        const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
        const micStatus = await request(PERMISSIONS.IOS.MICROPHONE);

        if (cameraStatus !== RESULTS.GRANTED || micStatus !== RESULTS.GRANTED) {
          // Alert.alert("Permissions Denied", "Camera and Microphone permissions are required for video calls.");
        }
      }
    } catch (error) {
      console.warn("Error requesting media permissions:", error);
    }
  };

  return (
    <AuthProvider>
      <DoctorProvider>
        <AppNavigator />
      </DoctorProvider>
    </AuthProvider>
  );
}
