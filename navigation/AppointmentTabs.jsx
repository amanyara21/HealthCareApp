import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingAppointmentScreen from "../screens/UpcomingAppointmentScreens";
import PastAppointmentScreen from "../screens/PastAppointmentScreen";

const TopTabs = createMaterialTopTabNavigator();

function AppointmentScreen() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="Upcoming Appointments" component={UpcomingAppointmentScreen} />
      <TopTabs.Screen name="Past Appointments" component={PastAppointmentScreen} />
    </TopTabs.Navigator>
  );
}

export default AppointmentScreen;