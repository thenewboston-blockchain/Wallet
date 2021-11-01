import ExpandableText from 'renderer/components/ExpandableText';
import {SFC} from 'shared/types';
import * as S from './Styles';

export interface AccountLinkProps {
  accountNumber: string;
  expanded: boolean;
}

const AccountLink: SFC<AccountLinkProps> = ({accountNumber, className, expanded}) => {
  return (
    <S.NavLink className={className} to={`/account/${accountNumber}/overview`}>
      <ExpandableText expanded={expanded} text={accountNumber} />
    </S.NavLink>
  );
};

export {S as AccountLinkStyles};
export default AccountLink;
