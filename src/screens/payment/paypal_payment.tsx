//import liraries
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';

import WebView from 'react-native-webview';
import queryString from 'query-string';
import ButtonComp from '../../components/ButtonComp';
import apiClient from '../../api/axiosConfig';

const LOCAL_IP = '192.168.39.230'; // Replace this with your local IP
const FRONTEND_URL = `http://${LOCAL_IP}:8081`;  
// create a component
const PayPalPayment = () => {
    const [isLoading, setLoading] = useState(false)
    const [paypalUrl, setPaypalUrl] = useState('')
    const [accessToken, setAccessToken] = useState(null);

   
    const onPressPaypal = async () => {
        setLoading(true)
        try {
            // const token = await paypalApi.generateToken()
            const result:any = await apiClient.post('/user/generate-token');
            console.log("token: ", result.data.token);
            // const res = await paypalApi.createOrder(token)
            const response:any = await apiClient.post("/user/create-order", { amount: 12, currency: "USD", token: result.data.token })
            setAccessToken(result.data.token)
            console.log("res++++++", response.data);
            setLoading(false)
            if (!!(response?.data?.response?.links)) {
                const findUrl = response.data.response.links.find((dataItem:any) => dataItem?.rel === "approve")
                console.log("findUrl", findUrl);
                setPaypalUrl(findUrl.href)
            }


        } catch (error) {
            console.log("error", error)
            setLoading(false)

        }
    }

    console.log("accessToken: ", accessToken);
    console.log("payPal url: ", paypalUrl)

    const onUrlChange = (webviewState:any) => {
        console.log("webviewStatewebviewState", webviewState)
        // if (webviewState.url.includes(`${FRONTEND_URL}/cancel`)) {
        if (webviewState.url.includes(`dntapp://cancel`)) {
            clearPaypalState()
            return;
        }
        // if (webviewState.url.includes(`${FRONTEND_URL}/success`)) {
        if (webviewState.url.includes(`dntapp://success`)) {
            const urlValues = queryString.parseUrl(webviewState.url)
            console.log("my urls value", urlValues)
            const { token } = urlValues.query
            if (!!token) {
                paymentSucess(token)
            }

        }
    }

    const paymentSucess = async (id:any) => {
        try {
            // const res = paypalApi.capturePayment(id, accessToken)
            const response: any = await apiClient.post("/user/capture-order", {id, token: accessToken});
            console.log("capturePayment res++++", response.data.response);
            // alert("Payment sucessfull...!!!")
            clearPaypalState()
        } catch (error) {
            console.log("error raised in payment capture", error)
        }
    }


    const clearPaypalState = () => {
        setPaypalUrl('')
        setAccessToken(null)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 16 }}>

                    <ButtonComp
                        onPress={onPressPaypal}
                        disabled={false}
                        btnStyle={{ backgroundColor: '#0f4fa3', marginVertical: 16 }}
                        text="Pay"
                        isLoading={isLoading}
                    />

                    <Modal
                        visible={!!paypalUrl}
                    >
                        <TouchableOpacity
                            onPress={clearPaypalState}
                            style={{ margin: 24 }}
                        >
                            <Text >Closed</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <WebView
                                source={{ uri: paypalUrl }}
                                onNavigationStateChange={onUrlChange}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                startInLoadingState={true} 
                            />
                        </View>

                    </Modal>

                </View>
            </SafeAreaView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default PayPalPayment;