import React from 'react';
import { Provider } from 'react-native-paper';
import IndexScreens from './src/index';
import { theme } from './src/core/theme';

const App = () =>
  (
    <Provider theme={theme}>
      <IndexScreens />
    </Provider>
  )

export default App;