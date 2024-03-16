import React from 'react';

interface TransactionFeeProps {
  //   fee: Fee;
  fee: any;
}

const TransactionFee: React.FC<TransactionFeeProps> = ({ fee }) => {
  return (
    <div className='mb-4'>
      <h3 className='text-lg font-bold mb-2'>Transaction Fee</h3>
      <p className='text-sm mb-1'>
        Token: {fee.fungible_info.name} ({fee.fungible_info.symbol})
      </p>
      <p className='text-sm mb-1'>Quantity: {fee.quantity.numeric}</p>
      <p className='text-sm mb-1'>
        Price: ${fee.price ? fee.price.toFixed(2) : 0}
      </p>
      <p className='text-sm'>Value: ${fee.value ? fee.value.toFixed(2) : 0}</p>
    </div>
  );
};

export default TransactionFee;
