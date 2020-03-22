import * as CONSTANTS from '../constants';
import Database from '../../config/database';

const db = new Database();

export const addWork = (state = {}, { type, booking }) => {
    switch (type) {
        case CONSTANTS.ADDWORK_POSTDATA_RESPONSE: {
            return {...state};
        }
        default:
            return state;
    }
};