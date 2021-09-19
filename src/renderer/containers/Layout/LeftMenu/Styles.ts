import styled from 'styled-components';
import ULink from '@renderer/components/Link';
import ULeftSubmenu from './LeftSubmenu';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 18px;
`;

export const LeftSubmenu = styled(ULeftSubmenu)`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Link = styled(ULink).attrs(() => ({textStyled: true}))`
  display: block;
  margin-left: 28px;
  margin-top: 16px;
`;
