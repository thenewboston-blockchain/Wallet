import styled from 'styled-components';
import {Button} from '@renderer/components/FormElements';
import * as AccountHeaderSectionStyles from './AccountHeaderSection/Styles';

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  display: flex;
  margin-left: 24px;

  & > ${AccountHeaderSectionStyles.AccountHeaderSection} + ${AccountHeaderSectionStyles.AccountHeaderSection} {
    margin-left: 56px;
  }
`;

export const RightContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const SendCoinsButton = styled(Button)`
  margin-right: 30px;
`;
