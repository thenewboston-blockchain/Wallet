import {createGlobalStyle, css} from 'styled-components';

const GlobalStyle = createGlobalStyle(({theme}) => css`
  * {
    box-sizing: border-box;
    line-height: ${theme.fonts.lineHeight.default};
  }
`);


  `
  * {
    box-sizing: border-box;
    line-height: ${({theme}) => theme.fonts.lineHeight.default};
    user-select: none;
  }
  
  body {
    ${({theme}) => theme.fonts.mixins.b1.regular}
    background: ${({theme}) => theme.colors.palette.neutral['075']};
    color: ${({theme}) => theme.colors.primary};
    margin: auto;
  }
  
  a {
    color: ${({theme}) => theme.colors.palette.blue['500']};
  }
  
  b,
  strong {
    font-weight: ${({theme}) => theme.fonts.weight.bold};
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
      line-height: ${({theme}) => theme.fonts.lineHeight.default};
      margin: 0;
  }
  
  h1 {
      ${({theme}) => theme.fonts.mixins.h1.regular}
  }

  h2 {
      ${({theme}) => theme.fonts.mixins.h2.regular}
  }

  h3 {
      ${({theme}) => theme.fonts.mixins.h3.regular}
  }

  h4 {
      ${({theme}) => theme.fonts.mixins.h4.regular}
  }
  
  p {
      ${({theme}) => theme.fonts.mixins.b1.regular}
      margin: 0 0 20px 0;
  }
`;

export default GlobalStyle;
