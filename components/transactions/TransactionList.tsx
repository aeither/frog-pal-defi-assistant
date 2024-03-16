import { ZerionTransactionType } from '@/app/actions/zerion/transactions';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HelpCircle } from 'lucide-react';
import React from 'react';
import Transaction from './Transaction';

interface TransactionProps {
  transactions: ZerionTransactionType[];
}

export const TransactionList: React.FC<TransactionProps> = ({
  transactions,
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[32px]'>
              <HelpCircle size={'18px'} />
            </TableHead>
            <TableHead className='w-[75px]'>Hash</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className='text-right'>Fee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, i) => (
            <Transaction key={i} transaction={tx} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};
