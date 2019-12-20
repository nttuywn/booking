/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MSMSListen from './src/components/MSMSListen';

AppRegistry.registerHeadlessTask('Heartbeat', () => MSMSListen);
AppRegistry.registerComponent(appName, () => App);
