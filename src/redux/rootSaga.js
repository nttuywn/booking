// import { ApiSignUp } from './sign-up/saga';
// import { ApiBodyInformation } from './body-information/saga';
import { HomeBookingList, HomeFinishJob } from './home/saga';
import { AddWorkUpdateListBooking } from './add-work/saga';
// import * as TYPES from './constants';
import { take, put, call, fork, spawn, cancel, actionChannel } from 'redux-saga/effects';
// import * as api from '../api';
// import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

// function* authorize(user, password) {
//     try {
//         const credentials = yield call(api.authorize, user, password);
//         const { uid, token } = credentials.data
//         if (token) {
//             yield put({ type: TYPES.LOGIN_SUCCESS, uid, token });
//             yield call(Keychain.setGenericPassword, `${uid}`, token);
//         }
//         else throw { message: 'Login failed, please check your Id or password' };
//     } catch (error) {
//         yield put({ type: TYPES.LOGIN_ERROR, error })
//     }
// }

// function* loginFlow() {
//     while (true) {
//         const { user, password } = yield take(TYPES.LOGIN_REQUEST);
//         const task = yield fork(authorize, user, password)
//         const action = yield take([TYPES.LOGOUT, TYPES.LOGIN_ERROR])
//         if (action.type === TYPES.LOGOUT) {
//             yield cancel(task)
//             yield call(Keychain.resetGenericPassword);
//             yield put({ type: TYPES.LOGOUT_SUCCESS })
//             Alert.alert(null, 'Logout successfully', [{ text: 'OK' }]);
//         }

//     }
// }

function* watchError() {
    const errorChanel = yield actionChannel('LOGIN_ERROR');
    while (true) {
        const { error } = yield take(errorChanel);
        Alert.alert(null, error.message, [{ text: 'Cancel' }]);
    }
}

export default function* rootSaga() {
    // yield spawn(ApiSignUp);
    // yield spawn(loginFlow);
    yield spawn(watchError);
    // yield spawn(ApiBodyInformation);
    yield spawn(HomeBookingList);
    yield spawn(HomeFinishJob);
    yield spawn(AddWorkUpdateListBooking);
}