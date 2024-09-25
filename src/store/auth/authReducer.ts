interface AuthState {
    isSignedIn: boolean;
    loading: boolean;
    error: string | null;
    userData: any;  // Store user data upon successful login
}

const initialState: AuthState = {
    isSignedIn: false,
    loading: false,
    error: null,
    userData: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case 'OTP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'OTP_SUCCESS':
            return { ...state, loading: false, };
        case 'OTP_FAILURE':
            return { ...state, isSignedIn: false, loading: false, error: action.payload };
        case 'SIGNIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'SIGNIN_SUCCESS':
            return { ...state, isSignedIn: true, loading: false, userData: action.payload, error: null };
        case 'SIGNIN_FAILURE':
            return { ...state, isSignedIn: false, loading: false, error: action.payload };
        case 'LOGOUT_SUCCESS':
            return { ...state, isSignedIn: false, loading: false, error: null };
        default:
            return state;
    }
};


