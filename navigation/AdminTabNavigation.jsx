import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons"; 
import AdminAddDoctor from '../screens/admin/AdminAddDoctor';
import AdminAddBodyPart from '../screens/admin/AdminAddBodyPart';

const Tab = createBottomTabNavigator();

function AdminTabNavigation() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown:false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === "Add Doctor") {
              iconName = "medkit-outline";
            } else if (route.name === "Add Body Part") {
              iconName = "body-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "white", paddingBottom: 5 },
        })}>
            <Tab.Screen name="Add Doctor" component={AdminAddDoctor} />
            <Tab.Screen name="Add Body Part" component={AdminAddBodyPart} />
        </Tab.Navigator>
    );
}

export default AdminTabNavigation;