'use client';

import {
  leaderboardAddress,
  lineaGoerli,
  thirdwebClient,
} from '@/lib/utils/config';
import { leaderboardAbi } from '@/lib/utils/leaderboardAbi';
import { getContract } from 'thirdweb/contract';
import { useReadContract } from 'thirdweb/react';

export function LeaderboardList() {
  const contract = getContract({
    client: thirdwebClient,
    address: leaderboardAddress,
    chain: lineaGoerli,
    abi: leaderboardAbi,
  });
  const { data, isLoading } = useReadContract({
    contract,
    method: 'getAll',
  });

  console.log('🚀 ~ LeaderboardList ~ data:', data);

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table-zebra table-compact table w-full'>
          <thead>
            <tr>
              <th className='text-start'>User</th>
              <th className='text-start'>Score</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data &&
              data.map((item: any, index: number) => {
                return (
                  <tr key={index} className='hover'>
                    <td>{`${item.user.slice(0, 4)}...${item.user.slice(-4)}`}</td>
                    <td>{item.score.toString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LeaderboardList;
