import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import OTPVerificationScreen from '../screens/OTPVerification';
import { RootState } from '../store/Reducer'; // Adjust based on your store setup
// import { RootStackParamList } from './RootStackParamList/Index';
import useAutoLogout from '../hooks/useAutoLogout';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './MainStack';


// const Stack = createNativeStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  useAutoLogout();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  useEffect(() => {
    // Dispatch action to load user data from AsyncStorage
    dispatch({ type: 'LOAD_USER_DATA' });
}, [dispatch]);
  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //         {/* <Stack.Screen name="Splash" component={SplashScreen} />
    //         <Stack.Screen name="SIGNIN" component={PhoneNumberScreen} />
    //         <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} /> */}
    //     {isSignedIn ? (
    //       <>
    //         <Stack.Screen name="Home" component={HomeScreen} />
            
    //       </>
    //     ) : (
    //       <>
    //         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
    //         <Stack.Screen name="SIGNIN" component={PhoneNumberScreen} />
    //         <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <MainStack isSignedIn={isSignedIn} />
  </NavigationContainer>
  );
};

export default RootNavigator;