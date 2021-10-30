import styled, {css} from 'styled-components';
import {mdiContentCopy, mdiDownload, mdiEye, mdiEyeOff, mdiQrcode} from '@mdi/js';

import Icon from 'renderer/components/Icon';

const iconStyle = css`
  margin-left: 6px;
`;

export const QrcodeIcon = styled(Icon).attrs(() => ({icon: mdiQrcode}))`
  ${iconStyle};
`;

export const ContentCopyIcon = styled(Icon).attrs(() => ({icon: mdiContentCopy}))`
  ${iconStyle};
`;

export const EyeIcon = styled(Icon).attrs(() => ({icon: mdiEye}))`
  ${iconStyle};
`;

export const EyeOffIcon = styled(Icon).attrs(() => ({icon: mdiEyeOff}))`
  ${iconStyle};
`;

export const DownloadIcon = styled(Icon).attrs(() => ({icon: mdiDownload}))`
  ${iconStyle};
`;
