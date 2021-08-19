import styled from 'styled-components';
import {ArrowLeftIcon as UArrowLeftIcon, ArrowRightIcon as UArrowRightIcon} from '@renderer/components/Icons';
import colors from '@renderer/styles/colors';

const TRANSITION_TIME = '0.3s';

export const Container = styled.div``;

interface DotProps {
  isActive: boolean;
}

export const Dot = styled.div<DotProps>`
  background-color: ${({isActive}) => (isActive ? colors.palette.blue['400'] : colors.palette.neutral['100'])};
  border-radius: 50%;
  cursor: ${({isActive}) => (!isActive ? 'pointer' : undefined)};
  height: 6px;
  transition: background-color ${TRANSITION_TIME} ease-in;
  width: 6px;
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  ${Dot} + ${Dot} {
    margin-left: 8px;
  }
`;

export const MainContent = styled.div`
  align-items: center;
  display: flex;
`;

export const SlideContainerWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

interface SlideContainerProps {
  selectedIndex: number;
}

export const SlideContainer = styled.div<SlideContainerProps>`
  display: grid;
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  left: ${({selectedIndex}) => `-${selectedIndex * 100}%`};
  position: relative;
  transition: left ${TRANSITION_TIME} linear;
`;

export const ArrowLeftIcon = styled(UArrowLeftIcon)``;

export const ArrowRightIcon = styled(UArrowRightIcon)``;
