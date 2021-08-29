import styled from 'styled-components';

import UTab from './Tab';

export const Tab = styled(UTab)``;

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 3px; // to account for the focused state of the Tab

  & > ${Tab} + ${Tab} {
    margin-left: 24px;
  }
`;
