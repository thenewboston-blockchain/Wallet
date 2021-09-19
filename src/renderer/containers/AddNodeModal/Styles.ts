import styled from 'styled-components';
import {FormSelect as UFormSelect} from '@renderer/components/FormComponents';
import {TextField as UTextField} from '@renderer/components/FormElements';
import {colors} from '@renderer/styles';

export const FormError = styled.span`
  color: ${colors.palette.red['500']};
  display: block;
  margin-bottom: 6px;
`;

export const FormSelect = styled(UFormSelect)`
  margin-bottom: 6px;
`;

export const TextField = styled(UTextField)`
  margin-bottom: 6px;
`;
