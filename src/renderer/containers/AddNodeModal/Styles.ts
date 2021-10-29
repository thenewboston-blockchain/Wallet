import styled from 'styled-components';
import {Select as USelect, TextField as UTextField} from 'renderer/components/FormElements';
import {colors} from 'renderer/styles';

export const FormError = styled.span`
  color: ${colors.palette.red['500']};
  display: block;
  margin-bottom: 6px;
`;

export const Select = styled(USelect)`
  margin-bottom: 6px;
`;

export const TextField = styled(UTextField)`
  margin-bottom: 6px;
`;
