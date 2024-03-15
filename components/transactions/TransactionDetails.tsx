import React from 'react';

interface TransactionDetailsProps {
  sentFrom: string;
  sentTo: string;
  nonce: number;
  contractAddress: string;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  sentFrom,
  sentTo,
  nonce,
  contractAddress,
}) => {
  return (
    <div className='mb-4'>
      <h3 className='text-lg font-bold mb-2'>Transaction Details</h3>
      <p className='text-sm mb-1'>Sent From: {sentFrom}</p>
      <p className='text-sm mb-1'>Sent To: {sentTo}</p>
      <p className='text-sm mb-1'>Nonce: {nonce}</p>
      <p className='text-sm'>Contract Address: {contractAddress}</p>
    </div>
  );
};

export default TransactionDetails;
