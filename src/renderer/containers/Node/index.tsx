import React, {ReactNode, useContext, useMemo} from 'react';
import {Redirect, Route, Switch, useHistory, useParams} from 'react-router-dom';

import MainContainer from '@renderer/components/MainContainer';
import {NodeContext} from '@renderer/context';
import {NodeParams, NodeSection, SFC} from '@renderer/types';
import {formatPath} from '@renderer/utils/address';

import * as S from './Styles';

const tabs: Array<{label: string; location: NodeSection}> = [
  {
    label: 'Overview',
    location: NodeSection.overview,
  },
  {
    label: 'Accounts',
    location: NodeSection.accounts,
  },
  {
    label: 'Transactions',
    location: NodeSection.transactions,
  },
  {
    label: 'Blocks',
    location: NodeSection.blocks,
  },
  {
    label: 'Confirmations',
    location: NodeSection.confirmations,
  },
  {
    label: 'Invalid Blocks',
    location: NodeSection.invalidBlocks,
  },
  {
    label: 'Nodes',
    location: NodeSection.nodes,
  },
];

const Node: SFC = ({className}) => {
  const {ipAddress, port, protocol} = useContext(NodeContext);
  const history = useHistory();
  const {section} = useParams<NodeParams>();

  const basePath = useMemo<string>(() => `/node/${formatPath(ipAddress, port, protocol)}`, [ipAddress, port, protocol]);

  const handleTabChange = (toSection: NodeSection): void => {
    history.push(`${basePath}/${toSection}`);
  };

  const renderTabs = (): ReactNode => {
    return (
      <S.Tabs onChange={handleTabChange} value={section}>
        {tabs.map(({label, location}) => (
          <S.Tab key={location} value={location}>
            {label.toUpperCase()}
          </S.Tab>
        ))}
      </S.Tabs>
    );
  };

  return (
    <MainContainer className={className}>
      <S.Header />
      <S.Hr />
      {renderTabs()}
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
