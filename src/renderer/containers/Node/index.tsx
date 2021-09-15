import React, {useContext, useMemo} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import MainContainer from '@renderer/components/MainContainer';
import {NodeContext} from '@renderer/context';
import {NodeSection, SFC} from '@renderer/types';
import {formatPath} from '@renderer/utils/address';

import * as S from './Styles';

const Node: SFC = ({className}) => {
  const {ipAddress, port, protocol} = useContext(NodeContext);
  const basePath = useMemo<string>(() => `/node/${formatPath(ipAddress, port, protocol)}`, [ipAddress, port, protocol]);

  return (
    <MainContainer className={className}>
      <S.Header />
      <Switch>
        <Route path={`${basePath}/${NodeSection.overview}`} exact>
          overview
        </Route>
        <Route path={`${basePath}/${NodeSection.accounts}`} exact>
          accounts
        </Route>
        <Route path={`${basePath}/${NodeSection.transactions}`} exact>
          transactions
        </Route>
        <Route path={`${basePath}/${NodeSection.blocks}`} exact>
          blocks
        </Route>
        <Route path={`${basePath}/${NodeSection.confirmations}`} exact>
          confirmations
        </Route>
        <Route path={`${basePath}/${NodeSection.invalidBlocks}`} exact>
          invalidBlocks
        </Route>
        <Route path={`${basePath}/${NodeSection.nodes}`} exact>
          nodes
        </Route>
        <Route path={`${basePath}`}>
          <Redirect to={`${basePath}/${NodeSection.overview}`} />
        </Route>
      </Switch>
    </MainContainer>
  );
};

export default Node;
