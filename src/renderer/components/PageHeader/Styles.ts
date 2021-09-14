import styled from 'styled-components';
import {Button} from '@renderer/components/FormElements';
import * as PageHeaderSectionStyles from './PageHeaderSection/Styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 16px;
`;

export const Left = styled.div`
  display: flex;
  margin-left: 24px;

  & > ${PageHeaderSectionStyles.Container} + ${PageHeaderSectionStyles.Container} {
    margin-left: 56px;
  }
`;

export const Right = styled.div`
  align-items: center;
  display: flex;
`;

export const RightButton = styled(Button)`
  margin-right: 30px;
`;
