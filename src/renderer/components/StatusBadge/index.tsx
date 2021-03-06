import {SFC} from 'shared/types';

import * as S from './Styles';
import {StatusBadgeType} from './Styles';

export interface StatusBadgeProps {
  status: StatusBadgeType;
}

const StatusBadge: SFC<StatusBadgeProps> = ({className, status}) => {
  return <S.Icon $type={status} className={className} />;
};

export {StatusBadgeType, S as StatusBadgeStyles};
export default StatusBadge;
