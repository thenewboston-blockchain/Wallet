import styled, {css} from 'styled-components';
import {DropdownMenuButtonStyles} from '@renderer/components/DropdownMenuButton';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 32px;
`;

export const Left = styled.div`
  align-items: center;
  display: flex;
  margin-left: 24px;
  gap: 56px;
`;

export const Right = styled.div<{$hasDropdown: boolean}>`
  align-items: center;
  display: flex;
  gap: 16px;

  // add extra gap for dropdown
  ${({$hasDropdown}) =>
    $hasDropdown
      ? css`
          ${DropdownMenuButtonStyles.DotsVerticalIcon} {
            margin-left: 12px;
          }
        `
      : css`
          padding-right: 16px;
        `}
`;
