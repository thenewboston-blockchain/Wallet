import React from 'react';
import {SFC} from '@renderer/types';

import * as S from './Styles';
import RocketImage from './tothemoon.png';

interface NodeCenterPopoverProps {
  anchorEl: HTMLButtonElement | null;
  closePopover(): void;
  open: boolean;
}

const NodeCenterPopover: SFC<NodeCenterPopoverProps> = ({anchorEl, className, closePopover, open}) => {
  return (
    <S.Popover anchorEl={anchorEl} className={className} closePopover={closePopover} manualClose open={open}>
      <S.Pointer />
      <S.Label>Tips</S.Label>
      <S.ImageContainer>
        <S.Image src={RocketImage} />
      </S.ImageContainer>
      <S.Header>Boost a single node of your choosing</S.Header>
      <S.Text>
        The top 20 most boosted nodes will be scheduled to be a Primary Validator, so choose nodes that are trustworthy
        and have low tx fees.
      </S.Text>
      <S.Footer>
        <S.LearnMoreButton>
          Learn More
          <S.ExternalIcon />
        </S.LearnMoreButton>
      </S.Footer>
    </S.Popover>
  );
};

export default NodeCenterPopover;
