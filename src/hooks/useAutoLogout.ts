import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

// Define the JWT structure
type JWTPayload = {
  exp: number; // expiration time
};

// const jwtDecode = jwtDecodeLib as unknown as <T>(token: string) => T;

const useAutoLogout = () => {
  const dispatch = useDispatch();

  const checkTokenExpiry = async () => {
    try {
      // Get the stored user data
      const storageData = await AsyncStorage.getItem('userData');
      
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const token = parsedData?.token;

        if (token) {
          // Decode the token
          const decodedToken = jwtDecode<JWTPayload>(token);

          // Get the current time
          const currentTime = Date.now() / 1000;

          // If token is expired, dispatch a logout action
          if (decodedToken.exp < currentTime) {
            dispatch({ type: 'LOGOUT_REQUEST'}); // Your logout action
          }
        }
      }
    } catch (error) {
      console.error('Error checking token expiry:', error);
    }
  };

  useEffect(() => {
    checkTokenExpiry();
  }, []);
};

export default useAutoLogout;
