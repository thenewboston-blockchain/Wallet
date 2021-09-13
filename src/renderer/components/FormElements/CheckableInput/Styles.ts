import styled, {css} from 'styled-components';
import {
  CheckboxMarkedIcon as UCheckedCheckbox,
  CheckboxBlankOutlineIcon as UBlankCheckbox,
  RadioboxMarkedIcon as UCheckedRadio,
  RadioboxBlankIcon as UBlankRadio,
} from '@renderer/components/Icons';
import {colors} from '@renderer/styles';

interface ErrorProps {
  $error: boolean;
}

const sharedStyles = css<{$error: boolean}>`
  color: ${({$error}) => ($error ? colors.palette.red['400'] : colors.palette.gray['700'])};
  display: inline-flex;
`;

export const CheckedCheckbox = styled(UCheckedCheckbox)<ErrorProps>`
  ${sharedStyles};
`;

export const BlankCheckbox = styled(UBlankCheckbox)<ErrorProps>`
  ${sharedStyles};
`;

export const CheckedRadio = styled(UCheckedRadio)<ErrorProps>`
  ${sharedStyles};
`;

export const BlankRadio = styled(UBlankRadio)<ErrorProps>`
  ${sharedStyles};
`;

export const HiddenInput = styled.input`
  display: none;
`;
