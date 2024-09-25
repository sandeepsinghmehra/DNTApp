import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from './Index';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// export type OTPVerificationScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

type OTPVerificationScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'OTPVerification'>,
    StackNavigationProp<MainStackParamList>
>;

export interface OTPVerificationProps {
  navigation: OTPVerificationScreenNavigationProp;
  route: {
      params: {
          mobile_number: string;
          countryCode: string;
      };
  };
}