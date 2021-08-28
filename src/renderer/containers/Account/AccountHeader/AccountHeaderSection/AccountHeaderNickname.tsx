import React from 'react';
import {SFC} from '@renderer/types';
import * as S from './Styles';

interface AccountHeaderNicknameProps {
  nickname: string | null;
}

const AccountHeaderNickname: SFC<AccountHeaderNicknameProps> = ({className, nickname}) => {
  return (
    <S.AccountHeaderSection className={className}>
      <S.Title>Nickname</S.Title>
      <S.Body>
        <S.MainText>{nickname || '-'}</S.MainText>
      </S.Body>
    </S.AccountHeaderSection>
  );
};

export default AccountHeaderNickname;
