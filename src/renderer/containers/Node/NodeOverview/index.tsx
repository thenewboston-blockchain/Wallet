import {Loader} from 'renderer/components/FormElements';
import {VALIDATOR_CONFIGS} from 'renderer/constants/actions';
import {useNetworkConfigFetcher} from 'renderer/hooks';
import {SFC, ValidatorConfig} from 'shared/types';
import * as S from './Styles';

const NodeOverview: SFC = ({className}) => {
  const {data: nodeConfig, loading} = useNetworkConfigFetcher<ValidatorConfig>(VALIDATOR_CONFIGS);

  return loading || !nodeConfig ? (
    <Loader />
  ) : (
    <S.Container className={className}>
      <S.Left>
        <S.TxCard>
          <S.TxLabel>Tx Fee/Per Tx</S.TxLabel>
          <S.Tx>{nodeConfig.default_transaction_fee.toLocaleString()}.0000</S.Tx>
        </S.TxCard>
        <S.NodeOverviewDetails nodeConfig={nodeConfig} />
      </S.Left>
      <S.Right>
        <S.NodeOverviewGraph />
      </S.Right>
    </S.Container>
  );
};

export default NodeOverview;
