import { ZerionTransactionType } from '@/app/actions/zerion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  formatTimeAgo,
  roundToTwoDecimals,
  truncateString,
} from '@/lib/utils/helpers';
import { Eye } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import TransactionDetails from './TransactionDetails';
import TransactionFee from './TransactionFee';
import TransactionHeader from './TransactionHeader';
import TransactionTransfers from './TransactionTransfers';

interface TransactionOverviewProps {
  transaction: ZerionTransactionType;
  hash: string;
  chain: string;
  timestamp: string;
  value: number;
  fee: number;
}

export function TransactionRow({
  transaction,
  chain,
  fee,
  hash,
  timestamp,
  value,
}: TransactionOverviewProps) {
  return (
    <>
      <TableRow key={hash}>
        <TableCell>
          <SheetDetailsButton transaction={transaction} />
          {/* <Eye size={'18px'} /> */}
        </TableCell>
        <TableCell className='font-medium'>{truncateString(hash)}</TableCell>
        <TableCell>{formatTimeAgo(timestamp)}</TableCell>
        <TableCell className='text-right'>
          {roundToTwoDecimals(value)}$
        </TableCell>
        <TableCell className='text-right'>{roundToTwoDecimals(fee)}$</TableCell>
      </TableRow>
    </>
  );
}

export function SheetDetailsButton({
  transaction,
}: {
  transaction: ZerionTransactionType;
}) {
  const { attributes, relationships } = transaction;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Eye size={'18px'} />
      </SheetTrigger>
      <SheetContent side={'bottom'}>
        <SheetHeader>
          <SheetTitle>Details</SheetTitle>
        </SheetHeader>
        <ScrollArea className='h-[calc(80vh)] w-full rounded-md border p-4'>
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
