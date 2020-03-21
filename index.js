/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';
import configureStore from './src/redux/configureStore';
import { setHeartBeat, addworkPostDataRequest, homeGetBookingListRequest } from './src/redux/rootAction';

const store = configureStore();

const MyHeadlessTask = async (reserve) => {
    // console.log(JSON.stringify(reserve))
    console.log( reserve.name, reserve.phone, reserve.month, reserve.day, reserve.hour, reserve.minute, reserve.status);
    // store.dispatch(addworkPostDataRequest({
    //     name: reserve.name,
    //     phone: reserve.phone,
    //     month: reserve.month,
    //     day: reserve.day,
    //     hour: reserve.hour,
    //     minute: reserve.minute,
    //     status: reserve.status,
    // }))
    store.dispatch(homeGetBookingListRequest())
    // store.dispatch(setHeartBeat(true));
    // setTimeout(() => {
    //     store.dispatch(setHeartBeat(false));
    // }, 1000);
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
