import styled from 'styled-components';
import UCard from '@renderer/components/Card';
import Link from '@renderer/components/Link';
import {b2, colors, h3} from '@renderer/styles';
import voteBox from './assets/VoteBox.png';

export const Card = styled(UCard)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const VoteImage = styled.img.attrs(() => ({
  src: voteBox,
}))``;

export const Header = styled.h3`
  ${h3.medium};
  color: ${colors.palette.neutral['600']};
  margin-top: 24px;
  margin-bottom: 9px;
`;

export const Description = styled.div`
  ${b2.regular};
  color: ${colors.palette.neutral['400']};
  margin-bottom: 24px;
`;

export const GoVoteButton = styled(Link)``;
