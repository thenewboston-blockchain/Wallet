import styled from 'styled-components';
import UCalculationTable, {Row as URow} from '@renderer/components/CalculationTable';
import {FormSelectDetailed as UFormSelectDetailed} from '@renderer/components/FormComponents';
import {TextField as UTextField} from '@renderer/components/FormElements';
import {colors} from '@renderer/styles';

export const ErrorSpan = styled.span`
  color: ${colors.palette.red['500']};
  display: block;

  &:last-of-type {
    margin-bottom: 6px;
  }
`;

export const FormSelectDetailed = styled(UFormSelectDetailed)`
  margin-bottom: 12px;
`;

export const TextField = styled(UTextField)`
  margin-bottom: 12px;
`;

export const CalculationTable = styled(UCalculationTable)`
  margin-top: 24px;
`;

export const Row = styled(URow)``;
