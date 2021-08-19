import styled from 'styled-components';
import UCard from '@renderer/components/Card';
import UCarousel from '@renderer/components/Carousel';
import colors from '@renderer/styles/colors';
import {b2, h3} from '@renderer/styles/fonts';

export const Card = styled(UCard)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const Carousel = styled(UCarousel)`
  height: 268px;
  width: 100%;
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  height: 140px;
  justify-content: center;
`;

export const Image = styled.img`
  display: block;
`;

export const Slide = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 222px;
`;

export const Title = styled.span`
  ${h3.medium};
  margin-top: 24px;
`;

export const Text = styled.span`
  ${b2.regular};
  color: ${colors.palette.neutral['400']};
  margin-top: 8px;
`;
