import { ZerionTransactionType } from '@/app/actions/zerion/transactions';
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
import React from 'react';
import Transaction from './Transaction';
import { HelpCircle } from 'lucide-react';

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

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';

// const invoices = [
//   {
//     invoice: 'INV001',
//     paymentStatus: 'Paid',
//     totalAmount: '$250.00',
//     paymentMethod: 'Credit Card',
//   },
//   {
//     invoice: 'INV002',
//     paymentStatus: 'Pending',
//     totalAmount: '$150.00',
//     paymentMethod: 'PayPal',
//   },
//   {
//     invoice: 'INV003',
//     paymentStatus: 'Unpaid',
//     totalAmount: '$350.00',
//     paymentMethod: 'Bank Transfer',
//   },
//   {
//     invoice: 'INV004',
//     paymentStatus: 'Paid',
//     totalAmount: '$450.00',
//     paymentMethod: 'Credit Card',
//   },
//   {
//     invoice: 'INV005',
//     paymentStatus: 'Paid',
//     totalAmount: '$550.00',
//     paymentMethod: 'PayPal',
//   },
//   {
//     invoice: 'INV006',
//     paymentStatus: 'Pending',
//     totalAmount: '$200.00',
//     paymentMethod: 'Bank Transfer',
//   },
//   {
//     invoice: 'INV007',
//     paymentStatus: 'Unpaid',
//     totalAmount: '$300.00',
//     paymentMethod: 'Credit Card',
//   },
// ];

// export function TransactionList() {
//   return (
//     <Table>
//       <TableCaption>A list of your recent invoices.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className='w-[100px]'>Invoice</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Method</TableHead>
//           <TableHead className='text-right'>Amount</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {invoices.map((invoice) => (
//           <TableRow key={invoice.invoice}>
//             <TableCell className='font-medium'>{invoice.invoice}</TableCell>
//             <TableCell>{invoice.paymentStatus}</TableCell>
//             <TableCell>{invoice.paymentMethod}</TableCell>
//             <TableCell className='text-right'>{invoice.totalAmount}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={3}>Total</TableCell>
//           <TableCell className='text-right'>$2,500.00</TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   );
// }
