import styled from 'styled-components';
import MuiRadio from '@mui/material/Radio';
import MuiFormControlLabel from '@mui/material/FormControlLabel';

export const Radio = styled(MuiRadio).attrs<{$error: boolean}>(({$error}) => ({
  color: $error ? 'secondary' : 'primary',
}))<{$error: boolean}>``;

export const FormControlLabel = styled(MuiFormControlLabel)``;
