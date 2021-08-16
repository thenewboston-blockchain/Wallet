import styled, {css} from 'styled-components';
import {Button} from '@renderer/components/FormElements';
import {
  ContentCopyIcon as UContentCopyIcon,
  DownloadIcon as UDownloadIcon,
  EyeIcon as UEyeIcon,
  QrcodeIcon as UQrcodeIcon,
} from '@renderer/components/Icon';
import colors from '@renderer/styles/colors';
import {b3} from '@renderer/styles/fonts';

const maxWidthText = '175px';

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  display: flex;
  margin-left: 24px;
`;

export const LeftItem = styled.div`
  margin-right: 56px;

  &:last-child {
    margin-right: 0;
  }
`;

export const LeftTitle = styled.div`
  ${b3.regular};
  color: ${colors.palette.neutral['500']};
  height: 15px;
  margin-bottom: 3px;
  max-width: ${maxWidthText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LeftBody = styled.div`
  display: flex;
  height: 20px;
`;

export const LeftMainText = styled.h3`
  max-width: ${maxWidthText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RightContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const SendCoinsButton = styled(Button)`
  margin-right: 30px;
`;

const leftIconStyle = css`
  margin-left: 6px;
`;

export const QrcodeIcon = styled(UQrcodeIcon)`
  ${leftIconStyle};
`;

export const ContentCopyIcon = styled(UContentCopyIcon)`
  ${leftIconStyle};
`;

export const EyeIcon = styled(UEyeIcon)`
  ${leftIconStyle};
`;

export const DownloadIcon = styled(UDownloadIcon)`
  ${leftIconStyle};
`;
