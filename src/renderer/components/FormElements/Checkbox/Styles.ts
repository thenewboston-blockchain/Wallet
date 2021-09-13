import styled from 'styled-components';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';

export const Checkbox = styled(MuiCheckbox).attrs<{$error: boolean}>(({$error}) => ({
  color: $error ? 'secondary' : 'primary',
}))<{$error: boolean}>``;

export const FormControlLabel = styled(MuiFormControlLabel)``;
