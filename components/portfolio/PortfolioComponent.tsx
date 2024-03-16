import { PortfolioType } from '@/app/actions/zerion';
import React from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import PositionChanges from './PositionChanges';
import PositionsDistribution from './PositionsDistribution';
import TotalPositions from './TotalPositions';

interface PortfolioProps {
  portfolio: PortfolioType;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const { attributes } = portfolio;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <PositionsDistribution
          byType={attributes.positions_distribution_by_type}
          byChain={attributes.positions_distribution_by_chain}
        />
        <TotalPositions total={attributes.total.positions} />
        <PositionChanges changes={attributes.changes} />
      </CardContent>

      {/* <CardFooter>
        <Button type='submit'>Confirm</Button>
      </CardFooter> */}
    </Card>
  );
};

export default Portfolio;
