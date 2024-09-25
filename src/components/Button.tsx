import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { COLORS, FONTS, SIZES } from "../utils";

const Button = (props: any): React.JSX.Element => {
 
    return (
        <TouchableOpacity
            style={{
                ...styles.btn, 
                ...props.style
            }}
        >
            <Text
                style={{
                  ...FONTS.body2,
                  fontFamily: "semiBold",
                  color: COLORS.white,
                }}
            >{props.title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    btn: {
        width: SIZES.width - 32,
        paddingVertical: SIZES.padding,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    }
});