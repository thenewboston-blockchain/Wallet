import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import 'typeface-roboto';
import 'normalize.css';

import App from '@renderer/containers/App';
import store from '@renderer/store';

import './index.scss';
import './styles/main.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7dabf8', // --color-blue-300
    },
    error: {
      main: '#ed5f74', // --color-red-400
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
