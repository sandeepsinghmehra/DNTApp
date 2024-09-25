import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
  
import { RouteProp, useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, images, SIZES } from "../utils";
import { useDispatch } from "react-redux";
import OTPInputFieldAndroid from "../components/otp/OtpInputFieldAndroid";
import { OTPVerificationProps } from "../navigation/RootStackParamList/VerificationPropsType";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/RootStackParamList/Index";

type OTPVerificationScreenProps = {
    navigation: StackNavigationProp<MainStackParamList, 'OTPVerification'>;
    route: RouteProp<MainStackParamList, 'OTPVerification'>;
};

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps>  = ({route, navigation}) => {
    // const navigation = useNavigation();
    const dispatch = useDispatch();

    const { mobile_number, countryCode }:any = route.params;
    console.log("Mobile Number: ", mobile_number, "Country Code: ", countryCode);
    const [otp, setOtp] = useState("");

    const handleVerifyOTPAndLogin = () => {
        console.log("Login OTP: ", otp, mobile_number)
        // Dispatch the SIGNIN_REQUEST action with username and password
        dispatch({ type: 'SIGNIN_REQUEST', payload: { mobile_number, countryCode, otp } });
    };
    console.log("OTP: ", otp);
    return (
        <>
        <View style={styles.container}>
            <Image
                // source={images.certification}
                source={images.man}
                resizeMode="contain"
                style={{
                    width: SIZES.width * 0.8,
                    height: SIZES.width * 0.8,
                    marginBottom: 16,
                }}
            />
            <View>
                <Text style={{ ...FONTS.h3, marginVertical: 12 }}>
                    Enter Verification Code
                </Text>
                <Text style={{ ...FONTS.body4, textAlign: 'center'}}>
                    We are automatically detecting SMS
                </Text>
                <Text style={{ ...FONTS.body4, textAlign: 'center'}}>
                    send to your mobile phone number
                </Text>
                <View
                    style={{
                        marginVertical: 22,
                        width: SIZES.width - 72,
                    }}
                >
                    <OTPInputFieldAndroid otp={otp} setOtp={setOtp}  />
                </View>
                <View 
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...FONTS.body4, textAlign: 'center'}}>
                        Don't receive the code ?
                    </Text>
                    <TouchableOpacity>
                        <Text style={{ ...FONTS.h4, color: COLORS.primary}}>
                            {" "}Resend Code
                        </Text>
                    </TouchableOpacity>
                </View>

                 <TouchableOpacity
                    style={[
                        styles.loginBtn
                    ]}
                    onPress={() => handleVerifyOTPAndLogin()}
                >
                    <Text style={styles.loginText}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.bottomContainer}>
                <Text 
                    style={{
                        ...FONTS.body4, 
                        textAlign: "center"
                    }}
                >
                    By continuing you agree with calorie challenge
                </Text>
                <Text 
                    style={{
                        ...FONTS.body4, 
                        // textAlign: "center",
                        textDecorationColor: COLORS.black,
                        textDecorationLine: "underline",
                    }}
                >
                    Terms of Use and Privacy policy
                </Text>
            </View> */}
        </View>
        </>
    );
};
  
export default OTPVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
        alignItems: 'center',
    },
    secureLogin: {
        width: SIZES.width * 0.8,
        height: SIZES.width * 0.8,
        marginBottom: 16,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        right: 16,
        left: 16,
        alignItems: 'center'
    },
    loginBtn: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        margin: 'auto',
        width: SIZES.width * .8,
    },
    loginText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        color: COLORS.white,
    }
});