import * as CONSTANTS from '../constants';

export const home = (state = {}, { type, listBooking = []}) => {
    switch (type) {
        case CONSTANTS.HOME_GET_BOOKINGLIST_REQUEST: {
            return state;
        }
        case CONSTANTS.HOME_GET_BOOKINGLIST_RESPONSE: {
            
            return {
                listBooking
            }
        }
        default:
            return state;
    }
};