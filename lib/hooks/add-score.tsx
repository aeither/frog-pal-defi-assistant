import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  leaderboardAddress,
  leaderboardContract,
  lineaGoerli,
  thirdwebClient,
  tokenAddress,
} from '@/lib/utils/config';
import { useState } from 'react';
import { prepareContractCall, prepareTransaction, toWei } from 'thirdweb';
import { getContract } from 'thirdweb/contract';
import {
  MediaRenderer,
  useActiveAccount,
  useEstimateGas,
  useReadContract,
  useSendTransaction,
} from 'thirdweb/react';
import { upload } from 'thirdweb/storage';

export function useLeaderboard() {
  const activeAccount = useActiveAccount();
  const { mutate: sendTx, data, isSuccess } = useSendTransaction();

  const contract = getContract({
    client: thirdwebClient,
    address: leaderboardAddress,
    chain: lineaGoerli,
  });

  const callAddScore = async () => {
    const tx = prepareContractCall({
      contract: leaderboardContract,
      // pass the method signature that you want to call
      method: 'function addScore(address user, uint256 score)',
      // and the params for that method
      // their types are automatically inferred based on the method signature
      params: [activeAccount ? activeAccount.address : '', toWei('100')],
    });

    await sendTx(tx);
  };

  return { data, isSuccess, callAddScore };
}
