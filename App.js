import React from 'react';
import { Provider } from 'react-redux';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';
import { Provider as PaperProvider } from 'react-native-paper';
import configureStore from './src/redux/configureStore';

const store = configureStore();

const ApplicationContent = () => (
  <Layout style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Wellcome</Text>
  </Layout>
);

const App = () => (
  <Provider store={store}>
    <PaperProvider>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <ApplicationContent />
      </ApplicationProvider>
    </PaperProvider>
  </Provider>
);

export default App;