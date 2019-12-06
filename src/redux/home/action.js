import * as CONSTANTS from '../constants';

export const homeGetBookingListRequest = () => ({
    type: CONSTANTS.HOME_GET_BOOKINGLIST_REQUEST
});

export const homeGetBookingListResponse = listBooking => ({
    type: CONSTANTS.HOME_GET_BOOKINGLIST_RESPONSE,
    listBooking
});