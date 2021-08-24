import React, {FC} from 'react';
import * as S from './Styles';

interface AccountHeaderNicknameProps {
  className?: string;
  nickname: string | null;
}

const AccountHeaderNickname: FC<AccountHeaderNicknameProps> = ({className, nickname}) => {
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
