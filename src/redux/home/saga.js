import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import * as CONSTANTS from '../constants';
import * as ACTIONS from '../../redux/rootAction'
import Heartbeat from '../../../Heartbeat';

export function* HomeBookingList() {
    yield takeLatest(CONSTANTS.HOME_GET_BOOKINGLIST_REQUEST, function* (action) {
        try {
            // const result = yield call(Heartbeat.startService);
            yield put(ACTIONS.homeGetBookingListResponse([]));
            // yield put(ACTIONS.ResponseSingup(result.data['message']));
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
        } catch(e) {
            console.log(e);
        }
    });
}