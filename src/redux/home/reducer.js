import * as CONSTANTS from '../constants';

export const home = (state = {listBooking: []}, { type, listBooking = []}) => {
    switch (type) {
        case CONSTANTS.ADDWORK_POSTDATA_REQUEST: {
            return {
                ...state,
                listBooking: [...state.listBooking, ...listBooking]
            }
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