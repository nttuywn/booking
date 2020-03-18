import { createAction, handleActions } from 'redux-actions';
import * as CONSTANTS from './constants'

export * from './landing-screen/action';
export * from './add-work/action';
export * from './home/action';

export const setHeartBeat = createAction(CONSTANTS.SET_HEART_BEAT);