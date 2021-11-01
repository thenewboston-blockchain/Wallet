import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import Account from 'renderer/containers/Account';
import Node from 'renderer/containers/Node';
import NodeCenter from 'renderer/containers/NodeCenter';

import {AccountProvider, NodeProvider} from 'renderer/context';
import {getActiveBankConfig} from 'renderer/selectors';
import {formatPathFromNode} from 'renderer/utils/address';
import {SFC} from 'shared/types';

import * as S from './Styles';

export const Layout: SFC = ({className}) => {
  const activeBankConfig = useSelector(getActiveBankConfig);

  return (
    <S.Container className={className}>
      <S.TopNav />
      <S.LeftMenu />
      <S.Right>
        <Switch>
          <Route path="/" exact>
            {activeBankConfig ? <Redirect to={`/bank/${formatPathFromNode(activeBankConfig)}/overview`} /> : null}
          </Route>
          <Route path="/main_window" exact>
            {activeBankConfig ? <Redirect to={`/bank/${formatPathFromNode(activeBankConfig)}/overview`} /> : null}
          </Route>
          <Route path="/account/:accountNumber/:section">
            <AccountProvider>
              <Account />
            </AccountProvider>
          </Route>
          <Route path="/node/:protocol/:ipAddress/:port/:section">
            <NodeProvider>
              <Node />
            </NodeProvider>
          </Route>
          <Route path="/node-center">
            <NodeCenter />
          </Route>
          <Route path="/reload" />
        </Switch>
      </S.Right>
    </S.Container>
  );
};

export default Layout;
