import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
  
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { COLORS, FONTS, images, SIZES } from "../utils";
import { useDispatch } from "react-redux";

type RootStackParamList = {
    // SIGNIN: undefined;
    OTPVerification: { mobile_number: string; countryCode: number };
};
const PhoneNumberScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
     // State to store phone number
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState<any>({
        "callingCode": "+1",
        "code": "US",
        "flag": images.us_flag,
        "item": "United States of America"
    });
    const [modalVisible, setModalVisible] = useState(false);

     const [selectedRole, setSelectedRole] = useState<"Patient" | "Doctor" | null>(null); // Role selection state

    // const renderAreasCodeModal = () => {

    //     const renderItem = ({ item }:any) => {
    //         return (
    //             <TouchableOpacity
    //                 onPress={() => {
    //                     setSelectedArea(item);
    //                     setModalVisible(false);
    //                 }}
    //                 style={{
    //                     flexDirection: 'row',
    //                     padding: 10,
    //                 }}
    //             >
    //                 <Image
    //                     source={{ uri: item.flag }}
    //                     resizeMode="contain"
    //                     style={{
    //                         height: 30,
    //                         width: 30,
    //                         marginRight: 10,
    //                     }}
    //                 />
    //                 <Text
    //                     style={{
    //                         ...FONTS.body4,
    //                         color: COLORS.white,
                        
    //                     }}
    //                 >{item.item}</Text>
    //             </TouchableOpacity>
    //         )
    //     }
    //     return (
    //         <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //         >
    //             <TouchableWithoutFeedback
    //                 onPress={() => setModalVisible(false)}
    //             >
    //                 <View 
    //                     style={{
    //                         flex: 1,
    //                         alignItems: 'center',
    //                         justifyContent: 'center',
    //                     }}
    //                 >
    //                     <View 
    //                         style={{
    //                             height: SIZES.height,
    //                             width: SIZES.width,
    //                             backgroundColor: COLORS.primary,
    //                         }}
    //                     >
    //                         {/* Close Button for modal */}
    //                         <TouchableOpacity
    //                             onPress={() => setModalVisible(false)}
    //                             style={{
    //                                 position: 'absolute',
    //                                 top: 22,
    //                                 right: 22,
    //                                 width: 42,
    //                                 height: 42,
    //                                 backgroundColor: COLORS.white,
    //                                 alignItems: "center",
    //                                 justifyContent: "center",
    //                                 borderRadius: 999,
    //                             }}
    //                         >
    //                             <Image
    //                                 // source={icons.close}
    //                                 resizeMode="contain"
    //                                 style={{
    //                                     width: 20,
    //                                     height: 20,
    //                                     tintColor: COLORS.primary
    //                                 }}
    //                             />
    //                         </TouchableOpacity>

    //                         <FlatList 
    //                             data={areas}
    //                             renderItem={renderItem}
    //                             horizontal={false}
    //                             keyExtractor={(item:any) => item.code}
    //                             style={{ padding: 20, marginBottom: 20 }}
    //                         />
    //                     </View>
    //                 </View>
    //             </TouchableWithoutFeedback>

    //         </Modal>
    //     )
    // }

     // Handle the phone number input change
     
    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
    };

     // Handle role selection
     const handleRoleSelect = (role: "Patient" | "Doctor") => {
        setSelectedRole(role);
    };

    // Dispatch the mobile number when verifying
    const handleVerifyPress = () => {
        console.log("handle Verify Pressed", phoneNumber, selectedRole);
        if (!selectedRole) {
            // alert("Please select a role");
            return;
        }
        dispatch({
            type: "OTP_REQUEST",
            payload: { mobile_number: phoneNumber, countryCode: 91, role: selectedRole }
        });

        // Navigate to the OTP verification screen
        // Navigate to the OTP verification screen and pass phoneNumber and countryCode as params
        navigation.navigate("OTPVerification", {
            mobile_number: phoneNumber,
            countryCode: 91
        });
    };
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Image
                // source={images.secureLogin}
                source={images.man}
                resizeMode="contain"
                style={styles.secureLogin}
            />
            <View>
                <Text style={{ ...FONTS.h3, textAlign: 'center'}}>
                    Enter Your Phone Number
                </Text>
                <Text style={{ ...FONTS.body4, textAlign: 'center'}}>
                    We will send you a verification code
                </Text>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.selectFlagContainer}
                        onPress={() => setModalVisible(true)}
                    >
                        <View>
                            {/* <Image
                                // source={images.man}
                                // source={icons.down}
                                resizeMode="contain"
                                style={styles.downIcon}
                            /> */}
                        </View>
                        <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                            <Image
                                source={images.us_flag}
                                resizeMode="contain"
                                style={styles.flagIcon}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                            {/* <Text style={{ color: COLORS.black, fontSize: 12 }}>+91</Text> */}
                            <Text style={{ color: COLORS.black, fontSize: 12 }}>{selectedArea?.callingCode}</Text>
                        </View>
                    </TouchableOpacity>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChangeText={handlePhoneNumberChange}
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.black}
                        keyboardType="numeric"
                    />
                </View>
                 {/* Role Selection */}
                 <View style={styles.roleContainer}>
                    <Text style={styles.roleTitle}>Choose Role</Text>
                    <View style={styles.roleOptions}>
                        <TouchableOpacity
                            style={[
                                styles.roleOption,
                                selectedRole === "Patient" && styles.selectedRole,
                            ]}
                            onPress={() => handleRoleSelect("Patient")}
                        >
                            <Text
                                style={[
                                    styles.roleText,
                                    selectedRole === "Patient" ? styles.selectedText : styles.unselectedText,
                                ]}
                            >
                                Patient
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.roleOption,
                                selectedRole === "Doctor" && styles.selectedRole,
                            ]}
                            onPress={() => handleRoleSelect("Doctor")}
                        >
                            <Text
                                style={[
                                    styles.roleText,
                                    selectedRole === "Doctor" ? styles.selectedText : styles.unselectedText,
                                ]}
                            >
                                Doctor
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[
                        styles.loginBtn,
                        selectedRole === "Doctor" && styles.selectedRole,
                    ]}
                    onPress={() => handleVerifyPress()}
                >
                    <Text style={styles.loginText}>
                        Get OTP
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
        {/* {renderAreasCodeModal()} */}
        </>
    );
};
  
export default PhoneNumberScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontFamily: fonts.SemiBold,
        paddingHorizontal: 10,
        textAlign: "center",
        color: colors.primary,
        marginTop: 20,
    },
    secureLogin: {
        width: SIZES.width * 0.8,
        height: SIZES.width * 0.8,
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: "row",
        borderColor: COLORS.gray,
        borderBottomWidth: .4,
        height: 58,
        width: SIZES.width - 32,
        alignItems: 'center',
        marginVertical: 32,
    }, 
    downIcon: {
        width: 10,
        height: 10,
        tintColor: COLORS.black
    },
    selectFlagContainer: {
        width: 90,
        height: 50,
        marginHorizontal: 5,
        flexDirection: "row",
    },
    flagIcon: {
        width: 30,
        height: 30,
    },
    input: {
        flex: 1,
        marginVertical: 10,
        height: 40,
        fontSize: 14,
        color: COLORS.black,
        fontFamily: "regular"
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        right: 16,
        left: 16,
        alignItems: 'center'
    },
    roleContainer: {
        marginVertical: 20,
        width: SIZES.width - 32,
    },
    roleTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    roleOptions: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    roleOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white, // Unselected background color
    },
    roleText: {
        fontSize: 16,
        color: COLORS.gray, // Unselected text color
    },
    selectedRole: {
        backgroundColor: COLORS.primary, // Selected background color
        borderColor: COLORS.primary,
    },
    selectedText: {
        color: COLORS.white, // Selected text color
    },
    unselectedText: {
        color: COLORS.black, // Unselected text color should be visible
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