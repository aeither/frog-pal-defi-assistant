'use server';

import { Button } from '@/components/ui/button';
import {
  leaderboardAddress,
  lineaGoerli,
  thirdwebClient,
  tokenAddress,
} from '@/lib/utils/config';
import { useState } from 'react';
import {
  prepareContractCall,
  prepareTransaction,
  toWei,
  sendTransaction,
} from 'thirdweb';
import { getContract } from 'thirdweb/contract';
import {
  MediaRenderer,
  useActiveAccount,
  useEstimateGas,
  useReadContract,
  useSendTransaction,
} from 'thirdweb/react';
import { upload } from 'thirdweb/storage';
import { waitForTransactionReceipt } from 'viem/actions';

export async function checkTokenSecurity(address: string) {
  const leaderboardContract = getContract({
    client: thirdwebClient,
    address: leaderboardAddress,
    chain: lineaGoerli,
  });

  const tx = prepareContractCall({
    contract: leaderboardContract,
    // pass the method signature that you want to call
    method: 'function addScore(address user, uint256 score)',
    // and the params for that method
    // their types are automatically inferred based on the method signature
    params: [activeAccount ? activeAccount.address : '', toWei('100')],
  });

  const transactionHash = await sendTransaction({
    account: transaction,
  });

  return { status: status };
}
