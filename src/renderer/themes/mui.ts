/* eslint-disable sort-keys */

import {createTheme} from '@material-ui/core';

const muiTheme = createTheme({
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
