import React from 'react';
import PositionsDistribution from './PositionsDistribution';
import TotalPositions from './TotalPositions';
import PositionChanges from './PositionChanges';
import { PortfolioType } from '@/app/actions/zerion';

interface PortfolioProps {
  portfolio: PortfolioType;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const { attributes } = portfolio;

  return (
    <div className='p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Portfolio Overview</h2>
      <PositionsDistribution
        byType={attributes.positions_distribution_by_type}
        byChain={attributes.positions_distribution_by_chain}
      />
      <TotalPositions total={attributes.total.positions} />
      <PositionChanges changes={attributes.changes} />
    </div>
  );
};

export default Portfolio;
