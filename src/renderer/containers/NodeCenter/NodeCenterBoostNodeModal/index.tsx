import React, {useState} from 'react';

import Modal from '@renderer/components/Modal';
import {StatusBadgeType} from '@renderer/components/StatusBadge';
import {SFC} from '@renderer/types';
import {truncateLongText} from '@renderer/utils/accounts';
import yup from '@renderer/utils/forms/yup';

import {NodeData} from '../data';
import NodeCenterBoostNodeModalFields from './NodeCenterBoostNodeModalFields';
import * as S from './Styles';

interface ComponentProps {
  close(): void;
  nodeData: NodeData;
}

const validationSchema = yup.object().shape({
  accountNumber: yup.string().length(64, 'Account Number must be 64 characters long').required('Wallet is required'),
  form: yup.string(),
});

const NodeCenterBoostNodeModal: SFC<ComponentProps> = ({className, close, nodeData}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true);
  };

  return (
    <Modal
      className={className}
      close={close}
      header="Boost Node"
      initialValues={{}}
      onSubmit={handleSubmit}
      submitButton="Boost"
      submitting={submitting}
      validateOnMount
      validationSchema={validationSchema}
    >
      <S.Table>
        <S.Row label="Rank" value={nodeData.rank} />
        <S.Row
          label="Status"
          value={
            <S.StatusWrapper>
              <S.StatusBadge status={StatusBadgeType.active} />
              Active
            </S.StatusWrapper>
          }
        />
        <S.Row label="Network ID" value={truncateLongText(nodeData.networkId)} />
        <S.Row label="Tx Fee Rate" value={nodeData.txFeeRate} />
        <S.Row
          label="Total Boosts"
          value={
            <S.TotalBoostsContainer>
              <S.ProgressBar progress={nodeData.totalBoosts} total={300000} />
              {nodeData.totalBoosts.toLocaleString()}
            </S.TotalBoostsContainer>
          }
        />
      </S.Table>
      <NodeCenterBoostNodeModalFields submitting={submitting} />
    </Modal>
  );
};

export default NodeCenterBoostNodeModal;
