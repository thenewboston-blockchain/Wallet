import styled from 'styled-components';
import {Loader as ULoader} from '@renderer/components/FormElements';
import {AlertIcon as UAlertIcon} from '@renderer/components/Icons';
import {colors, h4} from '@renderer/styles';

export const Container = styled.div``;

export const InsufficientFunds = styled.div`
  ${h4.medium};
  align-items: center;
  background-color: ${colors.palette.red['100']};
  border-radius: 4px;
  color: ${colors.palette.red['500']};
  display: flex;
  margin-bottom: 16px;
  padding: 12px 16px;
`;

export const AlertIcon = styled(UAlertIcon).attrs(() => ({
  size: 24,
  totalSize: 'unset',
}))`
  color: ${colors.palette.red['500']};
  margin-right: 15px;
`;

export const ErrorArea = styled.div`
  min-height: 50px;
  margin-left: 15px;
  margin-top: 6px;
`;

export const Loader = styled(ULoader).attrs(() => ({size: 14}))`
  justify-content: flex-start;
`;
