import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import * as CONSTANTS from '../constants';
import * as ACTIONS from '../../redux/rootAction'

import DataBase from '../../config/database';

async function getData(booking) {
    const db = new DataBase();
    await db.initDB().then(() => db.addBooking(booking));
}

export function* AddWorkUpdateListBooking() {
    yield takeLatest(CONSTANTS.ADDWORK_POSTDATA_REQUEST, function* (action) {
        try {
            const { booking } = action;
            const result = yield call(getData, booking);
            yield put(ACTIONS.homeGetBookingListRequest());
            // yield put(ACTIONS.ResponseSingup(result.data['message']));
        } catch (e) {
            console.log(e);
        }
    });
}