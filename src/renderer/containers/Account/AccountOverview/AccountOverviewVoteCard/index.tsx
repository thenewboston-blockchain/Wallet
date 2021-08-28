import React from 'react';

import {SFC} from '@renderer/types';
import * as S from './Styles';

interface AccountOverviewVoteCardProps {}

const AccountOverviewVoteCard: SFC<AccountOverviewVoteCardProps> = ({className}) => {
  return (
    <S.Card className={className}>
      <S.VoteImage />
      <S.Header>You can now vote!</S.Header>
      <S.Description>Select 'Governance' through the side menu under 'Community' or use the link below.</S.Description>
      <div>
        <S.GoVoteButton>Go to Governance to vote</S.GoVoteButton>
      </div>
    </S.Card>
  );
};

export default AccountOverviewVoteCard;
