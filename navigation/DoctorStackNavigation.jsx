import { createStackNavigator } from '@react-navigation/stack';
import DoctorAppointmentList from '../screens/doctor/DoctorHomeScreen';
import UserPrescriptionListScreen from '../screens/doctor/UserPrescriptionListScreen';
import AddPrescriptionScreen from '../screens/doctor/AddPrescriptionScreen';

const Stack = createStackNavigator();
function DoctorHomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={DoctorAppointmentList} />
            <Stack.Screen name="userPrescriptions" component={UserPrescriptionListScreen} />
            <Stack.Screen name="AddPrescription" component={AddPrescriptionScreen} />
        </Stack.Navigator>
    );
}

export default DoctorHomeStack
