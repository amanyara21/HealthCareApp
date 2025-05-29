import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStackNavigation";
import UserTabNavigation from "./UserTabNavigation";
import DoctorTabNavigation from "./DoctorTabNavigation";
import { DoctorContext } from "../context/DoctorContext";
import AddDetail from "../screens/doctor/AddDetails";
import AdminTabNavigation from "./AdminTabNavigation";

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
  },
};

export default function AppNavigator() {
  const { loading: authLoading, user } = useContext(AuthContext);
  const { hasDetails, loading: doctorLoading } = useContext(DoctorContext);

  if (authLoading || (user?.role === 'DOCTOR' && doctorLoading)) {
    console.log(user?.role)
    return null;
  }

  return (
    <NavigationContainer theme={MyLightTheme}>
      {user ? (
        user.role === 'USER' ? (
          <UserTabNavigation />
        ) : user.role === 'DOCTOR' ? (
          hasDetails ? (
            <DoctorTabNavigation />
          ) : (
            <AddDetail />
          )
        ) : user.role === 'ADMIN' ? (
          <AdminTabNavigation />
        ) : (
          <AuthStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
  
}