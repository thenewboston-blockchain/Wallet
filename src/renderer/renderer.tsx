import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {MuiThemeProvider} from '@material-ui/core';
import 'typeface-roboto';
import 'normalize.css';

import App from '@renderer/containers/App';
import store from '@renderer/store';
import GlobalStyle from '@renderer/styles/components/GlobalStyle';
import ToastifyStyle from '@renderer/styles/components/ToastifyStyle';
import muiTheme from '@renderer/themes/mui';

import './fonts.css';
import './styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <GlobalStyle />
      <ToastifyStyle />
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
