import React, {FC} from 'react';
import * as S from './Styles';

interface AccountHeaderNicknameProps {
  nickname: string | null;
}

const AccountHeaderNickname: FC<AccountHeaderNicknameProps> = ({nickname}) => {
  return (
    <S.AccountHeaderSection>
      <S.Title>Nickname</S.Title>
      <S.Body>
        <S.MainText>{nickname || '-'}</S.MainText>
      </S.Body>
    </S.AccountHeaderSection>
  );
};

export default AccountHeaderNickname;
