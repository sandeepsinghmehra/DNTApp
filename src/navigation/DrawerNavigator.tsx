import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import Settings from '../screens/Settings';
import BottomTabNavigator from './BottomTabNavigator';
import PayPalPayment from '../screens/payment/paypal_payment';

//screens import


const Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      {/* Drawer Screens here */}
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="PayPal" component={PayPalPayment} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default Drawer;