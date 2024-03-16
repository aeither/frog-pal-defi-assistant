import React from 'react';
import Image from 'next/image';
import { TokenPosition } from '@/app/actions/zerion';

interface TokenListProps {
  positions: TokenPosition[];
}

export const TokenList: React.FC<TokenListProps> = ({ positions }) => {
  const positionsWithImages = positions.filter(
    (position) => position.attributes.fungible_info.icon?.url
  );

  return (
    <ul className='w-full flex flex-col divide-y-2'>
      {positionsWithImages.map((position) => (
        <li
          key={position.id}
          className='py-4 flex items-center justify-between'
        >
          <div className='flex items-center'>
            <Image
              src={position.attributes.fungible_info.icon!.url}
              alt={position.attributes.fungible_info.name}
              width={32}
              height={32}
              className='mr-4'
            />
            <div>
              <h3 className='text-lg font-semibold'>
                {position.attributes.fungible_info.name} (
                {position.attributes.fungible_info.symbol})
              </h3>
              <p className='text-gray-500'>
                Quantity: {position.attributes.quantity.float}
              </p>
              <p className='text-gray-500'>
                Chain: {position.relationships.chain.data.id}
              </p>
            </div>
          </div>
          <div>
            <p className='text-gray-700'>
              {position.attributes.value !== null
                ? `$${position.attributes.value.toFixed(2)}`
                : 'N/A'}
            </p>
            <p className='text-gray-500'>
              {position.attributes.price !== 0
                ? `$${position.attributes.price.toFixed(2)}`
                : 'N/A'}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TokenList;
