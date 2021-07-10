import React, {FC, useMemo} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';
import {truncateLongText} from '@renderer/utils/accounts';

interface ComponentProps {
  className?: string;
  expanded: boolean;
  text: string;
}

const ExpandableText: FC<ComponentProps> = ({className, expanded, text}) => {
  const renderedText = useMemo<string>(() => (expanded ? text : truncateLongText(text)), [expanded, text]);

  return (
    <span
      className={clsx('ExpandableText', className, {
        'ExpandableText--expanded': expanded,
        ...bemify(className, '--expanded', expanded),
      })}
    >
      {renderedText}
    </span>
  );
};

export default ExpandableText;
