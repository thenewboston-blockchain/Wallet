import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import MuiTextField from '@mui/material/TextField';
import {colors} from 'renderer/styles';

const label = 'TextField__label';

export const Container = styled(FormControl).attrs(() => ({
  fullWidth: true,
}))`
  && {
    background: ${colors.white};
    margin-top: 6px;
  }
`;

export const TextField = styled(MuiTextField).attrs(({multiline}) => ({
  InputLabelProps: {
    className: label,
  },
  multiline,
  rows: multiline ? 2 : undefined,
}))`
  && {
    .${label} {
      color: ${colors.palette.neutral['400']};
    }
  }
`;
