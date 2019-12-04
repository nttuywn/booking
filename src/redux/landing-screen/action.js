import * as CONSTANTS from '../constants';

export const generateMockData = Customers => ({
    type: CONSTANTS.LANDINGS_SCREEN_GENERATE_MOCK_DATA,
    customers: Customers
});
