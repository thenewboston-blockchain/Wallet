import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {MuiThemeProvider} from '@material-ui/core';
import {ThemeProvider} from 'styled-components';
import 'typeface-roboto';
import 'normalize.css';

import App from '@renderer/containers/App';
import {useBooleanState} from '@renderer/hooks';
import store from '@renderer/store';
import {defaultTheme} from '@renderer/styles';
import GlobalStyle from '@renderer/styles/components/GlobalStyle';
import muiTheme from '@renderer/themes/mui';

import './fonts.css';
import './styles/main.scss';

const Renderer: FC = () => {
  const [isDarkMode, toggleDarkMode] = useBooleanState(false);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Renderer />, document.getElementById('root'));
