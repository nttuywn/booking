import { HomeBookingList, HomeFinishJob } from './home/saga';
import { AddWorkUpdateListBooking } from './add-work/saga';
import {  spawn, takeLatest, all, fork } from 'redux-saga/effects';
import * as CONSTANTS from './constants';
import * as ACTIONS from '../redux/rootAction'

// export function* HomeBookingList() {
//     try {
//         // const result = yield call(getData);
//         yield put(ACTIONS.homeGetBookingListResponse([]));
//         // yield put(ACTIONS.ResponseSingup(result.data['message']));
//     } catch (e) {
//         console.log(e);
//     }
// }

export default function* rootSaga() {
    // yield a
    // yield all [takeLatest(CONSTANTS.HOME_GET_BOOKINGLIST_REQUEST, HomeBookingList)]
    yield spawn(HomeBookingList)
    // yield spawn(HomeFinishJob);
    // yield spawn(AddWorkUpdateListBooking);
}