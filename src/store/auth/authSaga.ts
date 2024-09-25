import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import apiClient from '../../api/axiosConfig'
import axios from 'axios';

// Define the API endpoint for login
const loginApiUrl = '/user/mobile-login'; // Replace with your actual API

const verifyApiUrl = '/user/verify-otp';

// const fullUrl = axios.getUri({
//     url: loginApiUrl
// });
// console.log("Full API URL: ", fullUrl);
// Define the expected response type from the API
interface SendMobileOTPResponse {
    success: boolean;
    user?: any;  // Modify as per your API's response structure
    message?: string;
    token?: string;
}

// API call for login with credentials
const sendMobileOTPApi = async (mobile_number: string, countryCode: string, role: string) => {
    console.log("signIn api called mobile_number: ", mobile_number, " code: ", countryCode, " role: ", role);
    const response = await apiClient.post(
        loginApiUrl,
        { mobile_number, countryCode, role }, 
        { withCredentials: false } // Include credentials (cookies) with the request
    );
    // console.log("signIn APi response: ", response);
    return response.data; // Assuming API returns data in response.data
};

// API call for Verify OTP and redirect with credentials and go to home screen
const verifyMobileOTPApi = async (mobile_number: string, countryCode: string, otp: string) => {
    console.log("verifyMobile otp api called", mobile_number, otp);
    const response = await apiClient.post(
        verifyApiUrl,
        { mobile_number, countryCode, otp }, 
        { withCredentials: false } // Include credentials (cookies) with the request
    );
    // console.log("verify otp APi response: ", response);
    return response.data; // Assuming API returns data in response.data
};

function* sendMobileOTPSaga(action: { payload: { mobile_number: string, countryCode: string, role: string } }): Generator<any, void, SendMobileOTPResponse> {
    try {
        const { mobile_number, countryCode, role } = action.payload;

        // Call the signInApi with the credentials, typed as SignInResponse
        const response: SendMobileOTPResponse = yield call(sendMobileOTPApi, mobile_number, countryCode, role);
        console.log("Auth Saga response: ", response);
        if (response.success) {
            yield put({ type: 'OTP_SUCCESS', payload: response.message });
        } else {
            yield put({ type: 'OTP_FAILURE', payload: response.message });
        }
    } catch (error:any) {
        console.log("Auth Saga error: ", error);
        if (axios.isAxiosError(error)) {
            console.log("Axios error details: ", error.response?.data);
        }
        yield put({ type: 'OTP_FAILURE', payload: error.response?.message });
    }
}

function* verifySaga(action: { payload: { mobile_number: string, countryCode: string, otp: string } }): Generator<any, void, SendMobileOTPResponse> {
    try {
        const { mobile_number, countryCode, otp } = action.payload;

        // Call the signInApi with the credentials, typed as SignInResponse
        const response: SendMobileOTPResponse = yield call(verifyMobileOTPApi, mobile_number, countryCode, otp);
        console.log("Auth Saga verify response: ", response);
        if (response) {
            yield AsyncStorage.setItem('userData', JSON.stringify(response)); // Save user data
            yield put({ type: 'SIGNIN_SUCCESS' });
        }
    } catch (error:any) {
        console.log("Auth Saga error: ", error);
        if (axios.isAxiosError(error)) {
            console.log("Axios error details: ", error.response?.data);
        }
        yield put({ type: 'SIGNIN_FAILURE' });
    }
}

// Check if user data exists in AsyncStorage on app reload and update the store
function* loadUserDataSaga(): Generator<any, void, any> {
    try {
        const storedUserData = yield call(AsyncStorage.getItem, 'userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            yield put({ type: 'SIGNIN_SUCCESS', payload: userData });
        }
    } catch (error) {
        console.log('Error loading user data from storage:', error);
    }
}
function* logoutSaga(): Generator<any, void, void> {
    try {
        yield call(AsyncStorage.removeItem, 'userData'); // Clear data from storage
        yield put({ type: 'LOGOUT_SUCCESS' });
    } catch (error) {
        console.log('Error clearing user data:', error);
    }
}

export function* watchSignInSaga() {
    // @ts-expect-error
    yield takeLatest('OTP_REQUEST', sendMobileOTPSaga);
    // @ts-expect-error
    yield takeLatest('SIGNIN_REQUEST', verifySaga);
    
    yield takeLatest('LOAD_USER_DATA', loadUserDataSaga); 
    
    yield takeLatest('LOGOUT_REQUEST', logoutSaga);
}