import styled from 'styled-components';
import MuiCheckbox from '@mui/material/Checkbox';
import MuiFormControlLabel from '@mui/material/FormControlLabel';

export const Checkbox = styled(MuiCheckbox).attrs<{$error: boolean}>(({$error}) => ({
  color: $error ? 'secondary' : 'primary',
}))<{$error: boolean}>``;

export const FormControlLabel = styled(MuiFormControlLabel)``;
