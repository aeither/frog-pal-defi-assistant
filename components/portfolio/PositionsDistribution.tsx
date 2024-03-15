import React from 'react';

interface PositionsDistributionProps {
  byType: any;
  byChain: any;
  // byType: PositionsDistributionByType;
  // byChain: PositionsDistributionByChain;
}

const PositionsDistribution: React.FC<PositionsDistributionProps> = ({
  byType,
  byChain,
}) => {
  return (
    <div>
      <h3 className='text-lg font-bold mb-2'>Positions Distribution</h3>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <h4 className='text-sm font-bold mb-1'>By Type</h4>
          <ul>
            {Object.entries(byType).map(([type, value]) => (
              <li key={type} className='text-sm'>
                {type}: {(value as number).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-sm font-bold mb-1'>By Chain</h4>
          <ul>
            {Object.entries(byChain).map(([chain, value]) => (
              <li key={chain} className='text-sm'>
                {chain}: {(value as number).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PositionsDistribution;
