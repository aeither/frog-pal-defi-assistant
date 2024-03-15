import React from 'react';

interface TransactionHeaderProps {
  operationType: string;
  hash: string;
  minedAt: string;
  status: string;
  chain: string;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  operationType,
  hash,
  minedAt,
  status,
  chain,
}) => {
  return (
    <div className='mb-4'>
      <h2 className='text-xl font-bold mb-2'>
        {operationType.toUpperCase()} Transaction
      </h2>
      <p className='text-sm mb-1'>Hash: {hash}</p>
      <p className='text-sm mb-1'>
        Mined At: {new Date(minedAt).toLocaleString()}
      </p>
      <p className='text-sm mb-1'>Status: {status}</p>
      <p className='text-sm'>Chain: {chain}</p>
    </div>
  );
};

export default TransactionHeader;
