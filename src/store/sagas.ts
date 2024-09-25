import { all } from 'redux-saga/effects';
import { watchSignInSaga } from './auth/authSaga';


export default function* rootSaga() {
    yield all([
        watchSignInSaga(),
    ]);
}
