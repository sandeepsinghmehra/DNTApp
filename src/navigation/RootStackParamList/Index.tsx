// Define the type for your stack's params

export type MainStackParamList = {
  Drawer: undefined;
  Splash: undefined; // or the type of params if any
  SIGNIN: undefined;
  OTPVerification: { mobile_number: string; countryCode: number };
  Home: undefined; 
  Details: undefined;
  Settings: undefined;
  EditProfile: undefined;
  Profile: undefined;
  PayPal: undefined;
  // other screens can be added here
};