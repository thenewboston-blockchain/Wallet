import styled from 'styled-components';
import UIcon from 'renderer/components/Icon';
import {colors} from 'renderer/styles';

export const Container = styled.div`
  align-items: center;
  background: ${colors.white};
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
`;

export const Icon = styled(UIcon)<{$dev?: boolean}>`
  &:hover {
    color: ${({$dev}) => $dev && colors.palette.red['500']};
  }
`;

export const SectionWrapper = styled.div`
  align-items: center;
  color: ${colors.palette.gray['700']};
  display: flex;

  ${Icon} + ${Icon} {
    margin-left: 4px;
  }
`;

export const ChangeBankText = styled.span`
  color: ${colors.primary};
  cursor: pointer;
  margin-right: 12px;

  &:hover {
    text-decoration: underline;
  }
`;
