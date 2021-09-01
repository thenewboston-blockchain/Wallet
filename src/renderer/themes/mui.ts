/* eslint-disable sort-keys */

import {createMuiTheme} from '@material-ui/core';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#7dabf8', // --color-blue-300
    },
    error: {
      main: '#ed5f74', // --color-red-400
    },
  },
});

export default muiTheme;
