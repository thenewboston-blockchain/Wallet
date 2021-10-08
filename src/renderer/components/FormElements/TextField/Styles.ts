import styled from 'styled-components';
import {TextField as MuiTextField} from '@mui/material';
import {colors} from '@renderer/styles';

const label = 'TextField__label';

export const Container = styled.div``;

export const TextField = styled(MuiTextField).attrs(({multiline}) => ({
  InputLabelProps: {
    className: label,
  },
  multiline,
  rows: multiline ? 2 : undefined,
  size: 'small',
  variant: 'outlined',
}))`
  && {
    background: ${colors.white};
    margin-top: 6px;
    width: 100%;

    .${label} {
      color: ${colors.palette.neutral['400']};
    }
  }
`;
