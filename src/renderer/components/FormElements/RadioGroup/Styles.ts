import styled from 'styled-components';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiFormLabel from '@material-ui/core/FormLabel';
import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';

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
