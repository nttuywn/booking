import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as CONSTANTS from './constants'
import { landingScreenMockData } from './landing-screen/reducer';
import { addWork } from './add-work/reducer';
import { home } from './home/reducer';

const appInitialState = {
    heartBeat: false,
  };

const App = handleActions(
    {
      [CONSTANTS.SET_HEART_BEAT]: (state, { payload }) => ({
        ...state,
        heartBeat: payload,
      }),
    },
    appInitialState,
  );

export default combineReducers({
    landingScreenMockData,
    addWork,
    home,
    App

});