import { HomeBookingList, HomeFinishJob } from './home/saga';
import { AddWorkUpdateListBooking } from './add-work/saga';
import { take, put, call, fork, spawn, cancel, actionChannel } from 'redux-saga/effects';
import { Alert } from 'react-native';

export default function* rootSaga() {
    yield spawn(HomeBookingList);
    yield spawn(HomeFinishJob);
    yield spawn(AddWorkUpdateListBooking);
}