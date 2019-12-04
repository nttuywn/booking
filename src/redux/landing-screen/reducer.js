import * as CONSTANTS from '../constants';

export const landingScreenMockData = (state = {}, { type, customers }) => {
    switch (type) {
        case CONSTANTS.LANDINGS_SCREEN_GENERATE_MOCK_DATA: {
            return {
                ...state, customers,
            };
        }
        default:
            return state;
    }
};