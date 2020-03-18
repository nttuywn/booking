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
import { Provider as PaperProvider } from 'react-native-paper';
import configureStore from './src/redux/configureStore';
import { setHeartBeat } from './src/redux/rootAction';
// import MSMSListen from './src/components/MSMSListen';

const store = configureStore();

const MyHeadlessTask = async () => {
    console.log('Receiving HeartBeat!');
    store.dispatch(setHeartBeat(true));
    setTimeout(() => {
        store.dispatch(setHeartBeat(false));
    }, 1000);
};

const RNRedux = () => (
    <Provider store={store}>
        <PaperProvider>
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <App />
            </ApplicationProvider>
        </PaperProvider>
    </Provider>
);

// AppRegistry.registerHeadlessTask('Heartbeat', () => MSMSListen);
AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
