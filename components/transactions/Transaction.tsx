import React from 'react';
import TransactionHeader from './TransactionHeader';
import TransactionDetails from './TransactionDetails';
import TransactionFee from './TransactionFee';
import TransactionTransfers from './TransactionTransfers';
import { ZerionTransactionType } from '@/app/actions/zerion/transactions';

interface TransactionProps {
  transaction: ZerionTransactionType;
}

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { attributes, relationships } = transaction;

  return (
    <div className='rounded-lg shadow-md p-6'>
      <TransactionHeader
        operationType={attributes.operation_type}
        hash={attributes.hash}
        minedAt={attributes.mined_at}
        status={attributes.status}
        chain={relationships.chain.data.id}
      />
      <TransactionDetails
        sentFrom={attributes.sent_from}
        sentTo={attributes.sent_to}
        nonce={attributes.nonce}
        contractAddress={attributes.application_metadata.contract_address}
      />
      <TransactionFee fee={attributes.fee} />
      <TransactionTransfers transfers={attributes.transfers} />
    </div>
  );
};

export default Transaction;
