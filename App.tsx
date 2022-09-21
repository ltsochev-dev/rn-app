import 'react-native-gesture-handler';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import Toast from 'react-native-toast-message';
import Providers from '@src/navigation';
import {store} from '@src/store';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Providers />
      <Toast />
    </ReduxProvider>
  );
};

export default App;
