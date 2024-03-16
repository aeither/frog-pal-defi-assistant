import { ZerionTransactionType } from '@/app/actions/zerion/transactions';
import React from 'react';
import { TransactionRow } from './TransactionRow';

interface TransactionProps {
  transaction: ZerionTransactionType;
}

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { attributes, relationships } = transaction;

  return (
    <TransactionRow
      transaction={transaction}
      hash={attributes.hash}
      chain={relationships.chain.data.id}
      timestamp={attributes.mined_at}
      value={attributes.transfers[0] ? attributes.transfers[0].value : 0}
      fee={attributes.fee.value}
    />
  );
};

export default Transaction;
