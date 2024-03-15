import React from 'react';

interface TotalPositionsProps {
  total: number;
}

const TotalPositions: React.FC<TotalPositionsProps> = ({ total }) => {
  return (
    <div className='mt-4'>
      <h3 className='text-lg font-bold mb-2'>Total Positions</h3>
      <p className='text-sm'>{total.toFixed(2)}</p>
    </div>
  );
};

export default TotalPositions;
