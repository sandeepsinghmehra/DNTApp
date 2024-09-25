import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../utils'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'react-native-image-picker';
// import { TextInput } from 'react-native-gesture-handler'


export const imageDataURL = ['https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160_640.png'];

const EditProfile = ({navigation}:any) => {

    const [selectedImage, setSelectedImage] = useState(imageDataURL[0]);
    const [imageUri, setImageUri] = useState<string | null>(null);
    console.log("imageUri: ", imageUri);

    const [name, setName] = useState("Sandy");
    const [email, setEmail] = useState("test@sandy.com");
    const [password, setPassword] = useState("random@password");
    const [country, setCountry] = useState("US");

    const handleImageSelection = () => {
        // let result = ImagePicker
        const options: ImagePicker.ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
        };

        ImagePicker.launchImageLibrary(options, (response:any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                // Handle the selected image
                setImageUri(response.assets[0].uri);
                setSelectedImage(response.assets[0].uri)
            }
        });
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
            paddingHorizontal: 22,
        }}>
            <View style={{
                marginHorizontal: 12,
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: "absolute",
                    left: 0,
                }}
                >
                <MaterialIcons 
                    name={'keyboard-arrow-left'}
                    size={24}
                    color={COLORS.black}
                />
                
                </TouchableOpacity>
                <Text style={{...FONTS.h3}}>
                Edit Profile
                </Text>
            </View>

            <ScrollView>
                <View style={{
                    alignItems: "center",
                    marginVertical: 22,
                }}>
                    <TouchableOpacity
                        onPress={handleImageSelection}
                    >
                        <Image 
                            source={{ uri: selectedImage }}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 10,
                            zIndex: 9999
                        }}>
                            <MaterialIcons
                                name={'photo-camera'}
                                size={32}
                                color={COLORS.primary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={{
                        flexDirection: "column",
                        marginBottom: 6,
                    }}>
                        <Text style={{...FONTS.h4}}>Name</Text>
                        <View style={{
                            height: 44,
                            width: "100%",
                            borderColor: COLORS.secondaryGray,
                            borderWidth: 1,
                            borderRadius: 4,
                            marginVertical: 6,
                            justifyContent: 'center',
                            paddingLeft: 8,
                        }}>
                           <TextInput
                            value={name}
                            onChangeText={value => setName(value)}
                            editable={true}
                           /> 
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default EditProfile
