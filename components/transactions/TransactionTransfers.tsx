import React from 'react';

interface TransactionTransfersProps {
  //   transfers: Transfer[];
  transfers: any[];
}

const TransactionTransfers: React.FC<TransactionTransfersProps> = ({
  transfers,
}) => {
  return (
    <div>
      <h3 className='text-lg font-bold mb-2'>Transfers</h3>
      {transfers.map((transfer, index) => (
        <div key={index} className='mb-4'>
          <p className='text-sm mb-1'>
            Token: {transfer.fungible_info.name} (
            {transfer.fungible_info.symbol})
          </p>
          <p className='text-sm mb-1'>Quantity: {transfer.quantity.numeric}</p>
          <p className='text-sm mb-1'>Value: ${transfer.value.toFixed(2)}</p>
          <p className='text-sm mb-1'>Price: ${transfer.price.toFixed(2)}</p>
          <p className='text-sm mb-1'>Sender: {transfer.sender}</p>
          <p className='text-sm'>Recipient: {transfer.recipient}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionTransfers;
