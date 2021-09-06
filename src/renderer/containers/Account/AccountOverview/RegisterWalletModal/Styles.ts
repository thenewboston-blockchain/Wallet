import styled from 'styled-components';
import {Loader as ULoader} from '@renderer/components/FormElements';

export const Container = styled.div``;

export const ErrorArea = styled.div`
  min-height: 50px;
  margin-left: 15px;
  margin-top: 6px;
`;

export const Loader = styled(ULoader).attrs(() => ({size: 14}))`
  justify-content: flex-start;
`;
