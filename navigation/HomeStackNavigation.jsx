import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import DoctorsDetails from '../screens/DoctorsDetails';
import AppointmentBookingScreen from '../screens/AppointmentScreen';
import AppointmentPrescriptionScreen from '../screens/ApointmentPrescription';
import OnlineConsultation from '../screens/OnlineConsultation';

const Stack = createStackNavigator();
function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Doctors" component={DoctorsDetails} />
            <Stack.Screen name="Appointment" component={AppointmentBookingScreen} />
            <Stack.Screen name="PrescriptionScreen" component={AppointmentPrescriptionScreen} />
            <Stack.Screen name="Online" component={OnlineConsultation} />
        </Stack.Navigator>
    );
}

export default HomeStack
