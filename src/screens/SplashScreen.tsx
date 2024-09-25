import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    GestureResponderEvent,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

// Define the types for your navigation stack
type RootStackParamList = {
    SIGNIN: undefined;
};

const SplashScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogin = (event: GestureResponderEvent) => {
        console.log("Login button pressed");
        navigation.navigate("SIGNIN");  // Navigate to the SIGNIN screen
    };

    return (
        <View style={styles.container}>
            {/* <Image source={require("../assets/images/logo.png")} style={styles.logo} /> */}
            <Image source={require("../assets/images/man.png")} style={styles.bannerImage} />
            <Text style={styles.title}>Welcome to MyERApp!</Text>
            <Text style={styles.subTitle}>
                Please select your role to personalize your expericence. Whether you are patient in need of dental care or a doctor ready to help, we have got you covered
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.loginButtonWrapper,
                        { backgroundColor: colors.primary },
                    ]}
                    onPress={handleLogin}  // Attach the press event handler here
                >
                    <Text style={styles.loginButtonText}>Start With Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: 'center',  // Ensure content is centered
    },
    logo: {
        height: 40,
        width: 140,
        marginVertical: 30,
    },
    bannerImage: {
        marginVertical: 20,
        height: 250,
        width: 231,
    },
    title: {
        fontSize: 36,
        fontFamily: fonts.SemiBold,
        paddingHorizontal: 20,
        textAlign: "center",
        color: colors.primary,
        marginTop: 40,
    },
    subTitle: {
        fontSize: 18,
        paddingHorizontal: 20,
        textAlign: "center",
        color: colors.secondary,
        fontFamily: fonts.Medium,
        marginVertical: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: colors.primary,
        width: "80%",
        height: 60,
        borderRadius: 100,
    },
    loginButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 98,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
});
