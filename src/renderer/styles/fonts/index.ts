import font from './base';
import {d1, d2, h1, h2, h3, h4, b1, b2, b3} from './mixins';

const fonts = {
  ...font,
  mixins: {
    b1,
    b2,
    b3,
    d1,
    d2,
    h1,
    h2,
    h3,
    h4,
  },
};

export default fonts;
