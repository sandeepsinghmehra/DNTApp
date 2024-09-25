import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '../utils'
import { fonts } from '../utils/fonts'
import { colors } from '../utils/colors'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParamList } from '../navigation/RootStackParamList/Index'

type ProfileNavigationProp = StackNavigationProp<MainStackParamList, 'Profile'>;

const Profile = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<ProfileNavigationProp>();
    const storageData = AsyncStorage.getItem('userData');

    const handleLogoutPress = () => {
        dispatch({ type: 'LOGOUT_REQUEST'}); // Your logout action
        setTimeout(() => {
            navigation.navigate("SIGNIN"); 
        }, 100);
    };
    return (
        <View>
            <Text>
                Profile Page


            </Text>

            <TouchableOpacity
                style={[
                    styles.loginBtn,
                ]}
                onPress={() => handleLogoutPress()}
            >
                <Text style={styles.loginText}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

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
