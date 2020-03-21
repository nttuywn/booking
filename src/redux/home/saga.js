import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import * as CONSTANTS from '../constants';
import * as ACTIONS from '../../redux/rootAction'
import Heartbeat from '../../../Heartbeat';
import store from '../configureStore';
import {NativeEventEmitter, NativeModules } from 'react-native';

export function* HomeBookingList() {
    yield takeLatest(CONSTANTS.HOME_GET_BOOKINGLIST_REQUEST, function* (action) {
        try {
            Heartbeat.startService()
            const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
            eventEmitter.addListener('newSMS', (event) => {
                store.dispatch(ACTIONS.homeGetBookingListResponse(event.listSMS))
                // console.log('-------',event.listSMS) // "someValue"
            })
        } catch (e) {
            console.log(e);
        }
    });
}

export function* HomeFinishJob() {
    yield takeLatest(CONSTANTS.HOME_FINISHJOB_REQUEST, function* (action) {
        try {
            const { booking } = action;
            // const result = yield call(getFinishiJobData, booking);
            yield put(ACTIONS.homeGetBookingListRequest());
        } catch (e) {
            console.log(e);
        }
    });
}