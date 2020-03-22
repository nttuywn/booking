/**
 * @format
 */

import React from 'react';
import { AppRegistry, NativeEventEmitter, NativeModules } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import store from './src/redux/configureStore';
import { homeGetBookingListResponse } from './src/redux/rootAction';

const MyHeadlessTask = async (reserve) => {
};

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
eventEmitter.addListener('newSMS', (event) => {
    store.dispatch(homeGetBookingListResponse(event.listSMS))
})

const RNRedux = () => (
    <Provider store={store}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <App />
        </ApplicationProvider>
    </Provider>
);

// AppRegistry.registerHeadlessTask('Heartbeat', () => MSMSListen);
AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
