import styled from 'styled-components';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiFormLabel from '@mui/material/FormLabel';
import MuiRadio from '@mui/material/Radio';
import MuiRadioGroup from '@mui/material/RadioGroup';

export const FormControl = styled(MuiFormControl).attrs(() => ({
  component: 'fieldset',
}))``;

export const FormLabel = styled(MuiFormLabel).attrs(() => ({
  component: 'legend',
}))``;

export const RadioGroup = styled(MuiRadioGroup)`
  padding-left: 12px;
`;

export const FormControlLabel = styled(MuiFormControlLabel)``;

export const Radio = styled(MuiRadio).attrs<{$error: boolean}>(({$error}) => ({
  color: $error ? 'secondary' : 'primary',
}))<{$error: boolean}>``;
