
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './RootStackParamList/Index';
import Drawer from './DrawerNavigator';
import Details from '../screens/Details';
import Settings from '../screens/Settings';
import SplashScreen from '../screens/SplashScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import OTPVerificationScreen from '../screens/OTPVerification';
import EditProfile from '../screens/EditProfile';
import PayPalPayment from '../screens/payment/paypal_payment';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({isSignedIn}:any):any => {
  return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {isSignedIn ? (
                <>
                    <Stack.Screen name="Drawer" component={Drawer} />
                    <Stack.Screen name="Details" component={Details} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="PayPal" component={PayPalPayment} />
                </>
            )
            : (
                <>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SIGNIN" component={PhoneNumberScreen} />
                <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
            </>
            )}
        </Stack.Navigator>
    );
};

export default MainStack;