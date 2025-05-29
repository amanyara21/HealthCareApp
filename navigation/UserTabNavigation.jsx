import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStackNavigation';
import ReportsScreen from './ReportsScreenTab';
import AppointmentScreen from './AppointmentTabs';
import Icon from "react-native-vector-icons/Ionicons"; 
import HealthConnect from '../screens/HealthConnect';

const Tab = createBottomTabNavigator();

function UserTabNavigation() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown:false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "History") {
              iconName = "calendar-outline";
            } else if (route.name === "Reports") {
              iconName = "clipboard-outline";
            } else if (route.name === "Health Data") {
              iconName = "fitness-outline";
            }
  
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "white", paddingBottom: 5 },
        })}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="History" component={AppointmentScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Health Data" component={HealthConnect} />
        </Tab.Navigator>
    );
}

export default UserTabNavigation

