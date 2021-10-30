import {SFC} from 'shared/types';
import * as S from './Styles';

export interface ProgressBarProps {
  progress: number;
  total: number;
}

const ProgressBar: SFC<ProgressBarProps> = ({className, progress, total}) => {
  return (
    <S.Container className={className}>
      <S.ProgressBar $progress={Math.min((progress / total) * 100, 100)} />
    </S.Container>
  );
};

export {S as ProgressBarStyles};
export default ProgressBar;
