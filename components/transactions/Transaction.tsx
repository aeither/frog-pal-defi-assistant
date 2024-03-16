import React from 'react';
import TransactionHeader from './TransactionHeader';
import TransactionDetails from './TransactionDetails';
import TransactionFee from './TransactionFee';
import TransactionTransfers from './TransactionTransfers';
import { ZerionTransactionType } from '@/app/actions/zerion/transactions';
import { TransactionRow } from './TransactionRow';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
      value={attributes.transfers[0].value}
      fee={attributes.fee.value}
    />
  );
};

export default Transaction;
