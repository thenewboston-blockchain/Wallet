import styled from 'styled-components';
import {TextField as MuiTextField} from '@material-ui/core';
import {colors} from '@renderer/styles';

const label = 'TextField__label';

export const TextField = styled(MuiTextField).attrs(() => ({
  InputLabelProps: {
    className: label,
  },
  size: 'small',
  variant: 'outlined',
}))`
  && {
    margin-top: 6px;
    width: 100%;

    .${label} {
      color: ${colors.palette.neutral['400']};
    }
  }
`;
