import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from "../utils";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/RootStackParamList/Index";


type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Home'>;

const HomeScreen = () => {
    

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home screen</Text>
            <Text style={styles.subTitle}>
               Using Login SuccessFully 
            </Text>
            
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
    },
    title: {
        fontSize: 40,
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