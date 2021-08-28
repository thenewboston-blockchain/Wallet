import styled from 'styled-components';
import UCard from '@renderer/components/Card';
import UCarousel from '@renderer/components/Carousel';
import {b2, colors, h3} from '@renderer/styles';

export const Card = styled(UCard)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
`;

export const Carousel = styled(UCarousel)`
  height: 246px;
  width: 100%;
`;

export const CarouselImageContainer = styled.div`
  align-items: center;
  display: flex;
  height: 140px;
  justify-content: center;
`;

export const EmptyStateImageContainer = styled.div`
  align-items: center;
  display: flex;
  height: 187px;
  margin-top: 16px;
  justify-content: center;
`;

export const EmptyStateText = styled.h3`
  ${h3.medium};
  margin-bottom: 16px;
  margin-top: 40px;
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
