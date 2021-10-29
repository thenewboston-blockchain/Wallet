/* eslint-disable sort-keys */

import {createTheme} from '@mui/material';
import {colors} from 'renderer/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.palette.blue['300'],
    },
    error: {
      main: colors.palette.red['400'],
    },
  },
});

export default muiTheme;
