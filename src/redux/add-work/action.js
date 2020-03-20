import * as CONSTANTS from '../constants';

export const addworkPostDataRequest = booking => ({
    type: CONSTANTS.ADDWORK_POSTDATA_REQUEST,
    listBooking: [booking]
});

export const addworkPostDataResponse = response => ({
    type: CONSTANTS.ADDWORK_POSTDATA_RESPONSE,
    response: response
});
