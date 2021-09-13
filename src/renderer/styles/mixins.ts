import {css} from 'styled-components';
import {colors} from '@renderer/styles/index';

const buttonFocus = css`
  margin: 6px; // margin needed to account for the focused box shadow
  transition: box-shadow 0.1s;

  &:focus {
    box-shadow: 0 0 0 8px ${colors.palette.gray['100']};
    outline: none;
  }
`;

const mixins = {
  buttonFocus,
};

export default mixins;
