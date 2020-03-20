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
import { setHeartBeat, addworkPostDataRequest } from './src/redux/rootAction';

const store = configureStore();

const MyHeadlessTask = async (reserve) => {
    console.log( reserve.name, reserve.phone, reserve.date, reserve.hour, reserve.minute);
    store.dispatch(addworkPostDataRequest({
        name: reserve.name,
        phone: reserve.phone,
        date: reserve.date,
        hour: reserve.hour,
        minute: reserve.minute,
        status: false
    }))
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
