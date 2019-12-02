import React from 'react';
import { Provider } from 'react-redux';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';
import { Provider as PaperProvider } from 'react-native-paper';
import configureStore from './src/redux/configureStore';
import LandingScreen from './src/containers/landing-screen';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <PaperProvider>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <LandingScreen/>
      </ApplicationProvider>
    </PaperProvider>
  </Provider>
);

export default App;