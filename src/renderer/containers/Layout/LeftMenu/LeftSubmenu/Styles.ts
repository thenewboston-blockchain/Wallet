import styled from 'styled-components';
import {colors} from 'renderer/styles';

export const Container = styled.div`
  margin-bottom: 42px;
`;

export const HeaderContainer = styled.h3`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const LeftIconContainer = styled.div`
  margin-right: 12px;
  width: 16px;
`;

export const Title = styled.div`
  color: ${colors.palette.neutral['600']};
  cursor: default;
  display: block;
  flex: 1;
  user-select: none;
`;
