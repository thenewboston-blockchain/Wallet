import styled, {css} from 'styled-components';
import {
  ContentCopyIcon as UContentCopyIcon,
  DownloadIcon as UDownloadIcon,
  EyeIcon as UEyeIcon,
  EyeOffIcon as UEyeOffIcon,
  QrcodeIcon as UQrcodeIcon,
} from '@renderer/components/Icons';

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
