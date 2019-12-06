import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import * as CONSTANTS from '../constants';
import * as ACTIONS from '../../redux/rootAction'

import DataBase from '../../config/database';
import moment from 'moment'
import { DATE_FORMAT } from '../../config/datetime-format';

async function getData() {
    const db = new DataBase();
    let data = [];
    await db.initDB().then(() => db.listTodayBooking(moment().format(DATE_FORMAT)).then(rs => data = rs));
    return data;
}

export function* HomeBookingList() {
    yield takeLatest(CONSTANTS.HOME_GET_BOOKINGLIST_REQUEST, function* (action) {
        try {
            const result = yield call(getData);
            yield put(ACTIONS.homeGetBookingListResponse(result));
            // yield put(ACTIONS.ResponseSingup(result.data['message']));
        } catch (e) {
            console.log(e);
        }
    });
}