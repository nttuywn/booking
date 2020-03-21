/**
 * @format
 */

import React from 'react';
import { AppRegistry, NativeEventEmitter, NativeModules } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';
import store from './src/redux/configureStore';
import { homeGetBookingListResponse } from './src/redux/rootAction';

const MyHeadlessTask = async (reserve) => {
    // console.log(JSON.stringify(reserve))
    // console.log( reserve.name, reserve.phone, reserve.month, reserve.day, reserve.hour, reserve.minute, reserve.status);
    // store.dispatch(addworkPostDataRequest({
    //     name: reserve.name,
    //     phone: reserve.phone,
    //     month: reserve.month,
    //     day: reserve.day,
    //     hour: reserve.hour,
    //     minute: reserve.minute,
    //     status: reserve.status,
    // }))
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
        eventEmitter.addListener('newSMS', (event) => {
            store.dispatch(homeGetBookingListResponse(event.listSMS))
            // console.log('-------',event.listSMS) // "someValue"
        })
};

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
