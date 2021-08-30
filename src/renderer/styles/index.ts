import {DefaultTheme} from 'styled-components';

import colors from './colors';
import constants from './constants';
import fonts from './fonts';
import mixins from './mixins';

const defaultTheme: DefaultTheme = {
  colors,
  constants,
  fonts,
  mixins,
};

export {colors, constants, defaultTheme, fonts, mixins};
