import React from 'react';
import {SFC, ValidatorConfig} from '@renderer/types';
import * as S from './Styles';

interface NodeOverviewDetailsProps {
  nodeConfig: ValidatorConfig;
}

const NodeOverviewDetails: SFC<NodeOverviewDetailsProps> = ({className, nodeConfig}) => {
  return (
    <S.Card className={className}>
      <S.Title>Node Details</S.Title>
      <S.Table>
        <S.Row label="IP Address" value={nodeConfig.ip_address} />
        <S.Row label="Port" value={nodeConfig.port} />
        <S.Row label="Protocol" value={nodeConfig.protocol} />
        <S.Row label="Version" value={nodeConfig.version} />
        <S.Row label="Root Account File" value={nodeConfig.root_account_file} />
        <S.Row label="Root Account File Hash" value={nodeConfig.root_account_file_hash} />
        <S.Row label="Seed Block Identifier" value={nodeConfig.seed_block_identifier || '-'} />
        <S.Row label="Node Type" value={nodeConfig.node_type} />
        <S.Row label="Joined" value="Mar 1, 2020" />
      </S.Table>
    </S.Card>
  );
};

export default NodeOverviewDetails;
