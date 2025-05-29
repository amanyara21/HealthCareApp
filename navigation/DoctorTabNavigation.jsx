import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoctorHomeStack from './DoctorStackNavigation';
import Icon from "react-native-vector-icons/Ionicons"; 
import AddUnavailableDatesScreen from '../screens/doctor/AddUnavailableDate';

const Tab = createBottomTabNavigator();

function DoctorTabNavigation() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown:false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Unavailable") {
              iconName = "close-circle-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "white", paddingBottom: 5 },
        })}>
            <Tab.Screen name="Home" component={DoctorHomeStack} />
            <Tab.Screen name="Unavailable" component={AddUnavailableDatesScreen} />
        </Tab.Navigator>
    );
}

export default DoctorTabNavigation