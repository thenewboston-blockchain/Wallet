import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {ThemeProvider, StyledEngineProvider} from '@mui/material';

import App from '@renderer/containers/App';
import store from '@renderer/store';
import GlobalStyle from '@renderer/styles/components/GlobalStyle';
import ToastifyStyle from '@renderer/styles/components/ToastifyStyle';
import muiTheme from '@renderer/themes/mui';

import './fonts.css';

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <GlobalStyle />
        <ToastifyStyle />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById('root'),
);
