import { combineReducers } from 'redux';
import { landingScreenMockData } from './landing-screen/reducer';
import { addWork } from './add-work/reducer';
import { home } from './home/reducer';

export default combineReducers({
    landingScreenMockData,
    addWork,
    home

});