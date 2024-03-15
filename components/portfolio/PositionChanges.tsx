import React from 'react';

interface PositionChangesProps {
  // changes: Changes;
  changes: any;
}

const PositionChanges: React.FC<PositionChangesProps> = ({ changes }) => {
  return (
    <div className='mt-4'>
      <h3 className='text-lg font-bold mb-2'>Position Changes (1D)</h3>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className='text-sm'>Absolute Change:</p>
          <p className='text-sm font-bold'>{changes.absolute_1d.toFixed(2)}</p>
        </div>
        <div>
          <p className='text-sm'>Percent Change:</p>
          <p className='text-sm font-bold'>{changes.percent_1d.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default PositionChanges;
