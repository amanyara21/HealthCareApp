import React, { useEffect } from "react";
import { Alert, Appearance, LogBox } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";
import {
  initialize,
  getSdkStatus,
  requestPermission,
  SdkAvailabilityStatus
} from "react-native-health-connect";
import { DoctorProvider } from "./context/DoctorContext";

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["HealthConnectClient"]);
    setupHealthConnect();
    Appearance.setColorScheme('light')
  }, []);


  const setupHealthConnect = async () => {
    try {
      const isInitialized = await initialize();
      const sdkStatus = await getSdkStatus();

      console.log(sdkStatus)
      if (!isInitialized || sdkStatus != SdkAvailabilityStatus.SDK_AVAILABLE) {
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

      console.log("Granted permissions:", permissions);

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

  return (
    <AuthProvider>
      <DoctorProvider>
        <AppNavigator />
      </DoctorProvider>
    </AuthProvider>
  );
}
