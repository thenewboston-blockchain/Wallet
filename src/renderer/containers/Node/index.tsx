import {ReactNode} from 'react';
import {Redirect, Route, Switch, useHistory, useParams} from 'react-router-dom';

import MainContainer from 'renderer/components/MainContainer';
import {useNodeContext} from 'renderer/hooks';
import {formatPath} from 'renderer/utils/address';
import {NodeParams, NodeSection, SFC} from 'shared/types';

import NodeAccounts from './NodeAccounts';
import NodeBlocks from './NodeBlocks';
import NodeConfirmations from './NodeConfirmations';
import NodeInvalidBlocks from './NodeInvalidBlocks';
import NodeNodes from './NodeNodes';
import NodeOverview from './NodeOverview';
import NodeTransactions from './NodeTransactions';
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
  const {ipAddress, port, protocol} = useNodeContext();
  const history = useHistory();
  const {section} = useParams<NodeParams>();

  const basePath = '/node/:protocol/:ipAddress/:port';

  const handleTabChange = (toSection: NodeSection): void => {
    history.push(`/node/${formatPath(ipAddress, port, protocol)}/${toSection}`);
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
          <NodeOverview />
        </Route>
        <Route path={`${basePath}/${NodeSection.accounts}`} exact>
          <NodeAccounts />
        </Route>
        <Route path={`${basePath}/${NodeSection.transactions}`} exact>
          <NodeTransactions />
        </Route>
        <Route path={`${basePath}/${NodeSection.blocks}`} exact>
          <NodeBlocks />
        </Route>
        <Route path={`${basePath}/${NodeSection.confirmations}`} exact>
          <NodeConfirmations />
        </Route>
        <Route path={`${basePath}/${NodeSection.invalidBlocks}`} exact>
          <NodeInvalidBlocks />
        </Route>
        <Route path={`${basePath}/${NodeSection.nodes}`} exact>
          <NodeNodes />
        </Route>
        <Route path={`${basePath}`}>
          <Redirect to={`${basePath}/${NodeSection.overview}`} />
        </Route>
      </Switch>
    </MainContainer>
  );
};

export default Node;
