import {createGlobalStyle} from 'styled-components';

import colors from '../colors';
import {b1, font, h1, h2, h3, h4} from '../fonts';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    line-height: ${font.lineHeight.default};
    user-select: none;
  }
  
  body {
    ${b1.regular}
    background: ${colors.palette.neutral['075']};
    color: ${colors.primary};
    margin: auto;
  }
  
  a {
    color: ${colors.palette.blue['500']};
  }
  
  b,
  strong {
    font-weight: ${font.weight.bold};
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
      line-height: ${font.lineHeight.default};
      margin: 0;
  }
  
  h1 {
      ${h1.regular}
  }

  h2 {
      ${h2.regular}
  }

  h3 {
      ${h3.regular}
  }

  h4 {
      ${h4.regular}
  }
  
  p {
      ${b1.regular}
      margin: 0 0 20px 0;
  }
`;

export default GlobalStyle;
