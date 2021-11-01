import styled from 'styled-components';
import {b3, colors} from 'renderer/styles';

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 3px;
  box-shadow: 0 3px 12px 1px rgba(4, 34, 53, 0.24);
  max-height: 60%;
  max-width: 440px;
  min-width: 400px;
  overflow-y: auto;
  position: fixed;
  right: 12px;
  top: 40px;
`;

export const Header = styled.div`
  align-items: baseline;
  display: flex;
  border-bottom: 1px solid ${colors.palette.gray['100']};
  justify-content: space-between;
  padding: 16px;
`;

export const HeaderLeft = styled.div`
  align-items: baseline;
  display: flex;
`;

export const CountSpan = styled.span`
  ${b3.regular};
  color: ${colors.palette.red['500']};
  margin-left: 12px;
`;

export const MarkAsReadLink = styled.span<{$isDisabled: boolean}>`
  color: ${({$isDisabled}) => ($isDisabled ? colors.palette.gray['300'] : colors.palette.blue['500'])};
  cursor: ${({$isDisabled}) => ($isDisabled ? 'default' : 'pointer')};
  text-decoration: none;

  &:hover {
    text-decoration: ${({$isDisabled}) => ($isDisabled ? 'none' : 'underline')};
  }
`;

export const EmptyContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 36px;
  font-weight: 300;
  justify-content: center;
  height: 300px;
`;
