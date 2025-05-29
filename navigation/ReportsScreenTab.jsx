import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MedicineTableScreen from "../screens/MedicineTableScreen";
import ReportScreen from "../screens/ReportScreen";

const TopTabs = createMaterialTopTabNavigator();

function ReportsScreen() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="Medicine Table" component={MedicineTableScreen} />
      <TopTabs.Screen name="Reports" component={ReportScreen} />
    </TopTabs.Navigator>
  );
}

export default ReportsScreen;