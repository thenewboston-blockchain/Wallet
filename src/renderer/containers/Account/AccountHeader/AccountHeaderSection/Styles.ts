import styled, {css} from 'styled-components';
import {
  ContentCopyIcon as UContentCopyIcon,
  DownloadIcon as UDownloadIcon,
  EyeIcon as UEyeIcon,
  EyeOffIcon as UEyeOffIcon,
  QrcodeIcon as UQrcodeIcon,
} from '@renderer/components/Icons';
import {b3, colors} from '@renderer/styles';

const maxWidthText = '175px';

export const AccountHeaderSection = styled.div``;

export const Title = styled.div`
  ${b3.regular};
  color: ${colors.palette.neutral['500']};
  height: 15px;
  margin-bottom: 3px;
  max-width: ${maxWidthText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Body = styled.div`
  display: flex;
  height: 20px;
`;

export const MainText = styled.h3<{isSigningKey?: boolean}>`
  max-width: ${maxWidthText};
  min-width: ${({isSigningKey}) => (isSigningKey ? '165px' : null)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const iconStyle = css`
  margin-left: 6px;
`;

export const QrcodeIcon = styled(UQrcodeIcon)`
  ${iconStyle};
`;

export const ContentCopyIcon = styled(UContentCopyIcon)`
  ${iconStyle};
`;

export const EyeIcon = styled(UEyeIcon)`
  ${iconStyle};
`;

export const EyeOffIcon = styled(UEyeOffIcon)`
  ${iconStyle};
`;

export const DownloadIcon = styled(UDownloadIcon)`
  ${iconStyle};
`;
