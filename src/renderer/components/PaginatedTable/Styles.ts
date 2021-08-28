import styled from 'styled-components';
import {Switch as USwitch} from '@renderer/components/FormElements';
import UPageTable from '@renderer/components/PageTable';

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 24px 24px;
`;

export const Switch = styled(USwitch)``;

export const HeaderRight = styled.div`
  align-items: center;
  display: flex;

  ${Switch} + ${Switch} {
    margin-left: 27px;
  }
`;

export const PageTable = styled(UPageTable)`
  margin-bottom: 24px;
`;
