import {useMemo} from 'react';
import {truncateLongText} from 'renderer/utils/accounts';
import {SFC} from 'shared/types';
import * as S from './Styles';

export interface ExpandableTextProps {
  expanded: boolean;
  text: string;
}

const ExpandableText: SFC<ExpandableTextProps> = ({className, expanded, text}) => {
  const renderedText = useMemo<string>(() => (expanded ? text : truncateLongText(text)), [expanded, text]);

  return (
    <S.Span className={className} $expanded={expanded}>
      {renderedText}
    </S.Span>
  );
};

export {S as ExpandableTextStyles};
export default ExpandableText;
