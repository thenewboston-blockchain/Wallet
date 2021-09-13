import styled from 'styled-components';
import MuiRadio from '@material-ui/core/Radio';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';

export const Radio = styled(MuiRadio).attrs<{$error: boolean}>(({$error}) => ({
  color: $error ? 'secondary' : 'primary',
}))<{$error: boolean}>``;

export const FormControlLabel = styled(MuiFormControlLabel)``;
