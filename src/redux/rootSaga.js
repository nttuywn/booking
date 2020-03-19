import { HomeBookingList, HomeFinishJob } from './home/saga';
import { AddWorkUpdateListBooking } from './add-work/saga';
import { take, put, call, fork, spawn, cancel, actionChannel, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

export default function* rootSaga() {
    yield all([
        spawn(HomeBookingList),
        spawn(HomeFinishJob),
        spawn(AddWorkUpdateListBooking),
    ]);
}