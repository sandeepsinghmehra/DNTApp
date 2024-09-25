import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import OTPVerify from 'react-native-otp-verify';

// Define constants
const CELL_COUNT: number = 6; // Change to the desired OTP length
const HASH_CODE: string = 'YOUR_HASH_CODE'; // Replace with the actual hash code

type OTPProps = {
  otp: string;
  setOtp: (params:string) => void;
}

const OTPInputFieldAndroid: React.FC<OTPProps> = ({otp, setOtp}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      OTPVerify.getHash().then((hash: string[]) => {
        OTPVerify.addListener((message: string) => {
          if (message) {
            // Extract OTP from the message and set it
            console.log("message", message, extractOTPFromMessage(message))
            setOtp(extractOTPFromMessage(message));
          }
        });
      });
    }

    return () => {
      // Clean up OTPVerify listener
      OTPVerify.removeListener();
    };
  }, []);

  // Extract OTP from the SMS message
  const extractOTPFromMessage = (message: string): string => {
    // Implement logic to extract OTP from the message
    const otpMatch = message.match(/\d{6}/); // Example regex for 6-digit OTP
    return otpMatch ? otpMatch[0] : '';
  };

  return (
    <View>
      <Text>Please enter the OTP that has been sent to your registered mobile number</Text>
      <CodeField
        value={otp}
        onChangeText={setOtp}
        cellCount={CELL_COUNT}
        rootStyle={styles.root}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusedCell]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {otp.length === CELL_COUNT && (
        <Text>Entered OTP: {otp}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { borderColor: 'gray', borderBottomWidth: 1 },
  cell: { borderColor: 'gray', borderBottomWidth: 1, padding: 10 },
  focusedCell: { borderColor: 'blue' },
});

export default OTPInputFieldAndroid;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Platform } from 'react-native';
// import { CodeField, Cursor } from 'react-native-confirmation-code-field';
// import OTPVerify from 'react-native-otp-verify';

// const CELL_COUNT:number = 6; // Change to the desired OTP length
// const HASH_CODE:string = 'YOUR_HASH_CODE'; // Replace with the actual hash code

// const OTPInputFieldAndroid = () => {
//   const [otp, setOtp] = useState('');

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       OTPVerify.getHash().then(hash => {
//         OTPVerify.addListener(hash, (message) => {
//           if (message) {
//             // Extract OTP from the message and set it
//             setOtp(extractOTPFromMessage(message));
//           }
//         });
//       });
//     }
//     return () => {
//       // Clean up OTPVerify listener
//       OTPVerify.removeListener(HASH_CODE);
//     };
//   }, []);

//   // Extract OTP from the SMS message
//   const extractOTPFromMessage = (message:any) => {
//     // Implement logic to extract OTP from the message
//   };

//   return (
//     <View>
//       <Text>Please enter the OTP that has been sent to yout registered mobile number</Text>
//       <CodeField
//         value={otp}
//         onChangeText={setOtp}
//         cellCount={CELL_COUNT}
//         rootStyle={{ borderColor: 'gray', borderBottomWidth: 1 }}
//         keyboardType="number-pad"
//         textContentType="oneTimeCode"
//         renderCell={({ index, symbol, isFocused }) => (
//           <Text
//             key={index}
//             style={[
//               { borderColor: 'gray', borderBottomWidth: 1 },
//               isFocused && { borderColor: 'blue' },
//             ]}
//           >
//             {symbol || (isFocused ? <Cursor /> : null)}
//           </Text>
//         )}
//       />
//       {otp.length === CELL_COUNT && (
//         <Text>Entered OTP: {otp}</Text>
//       )}
//     </View>
//   );
// };

// export default OTPInputFieldAndroid;