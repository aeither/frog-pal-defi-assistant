'use client';

import { Button } from '@/components/ui/button';
import { lineaGoerli, thirdwebClient, tokenAddress } from '@/lib/utils/config';
import { useEffect, useState } from 'react';
import { prepareContractCall, toWei } from 'thirdweb';
import { getContract } from 'thirdweb/contract';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';
import { Input } from '../ui/input';
import { createStreamableUI, useUIState } from 'ai/rsc';
import { useWaitForReceipt } from 'thirdweb/react';
import { AI } from '@/app/actions/ai';
import { SystemMessage } from '../llm-stocks';

const contract = getContract({
  client: thirdwebClient,
  address: tokenAddress,
  chain: lineaGoerli,
});

export function MintTokenComponent({ amount }: { amount: string }) {
  const activeAccount = useActiveAccount();
  const { mutate: sendTx, data: transactionHash } = useSendTransaction();
  const [currentAmount, setCurrentAmount] = useState(amount);
  const [, setMessages] = useUIState<typeof AI>();

  const mintToken = async () => {
    const tx = prepareContractCall({
      contract,
      // pass the method signature that you want to call
      method: 'function mintTo(address to, uint256 amount)',
      // and the params for that method
      // their types are automatically inferred based on the method signature
      params: [
        activeAccount ? activeAccount.address : '',
        toWei(currentAmount),
      ],
    });

    await sendTx(tx);
  };

  useEffect(() => {
    if (transactionHash) {
      const explorerLink = `https://goerli.lineascan.build/tx/${transactionHash.transactionHash}`;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(),
          display: (
            <SystemMessage>
              <a href={explorerLink} target='_blank' className='underline'>
                Open Explorer
              </a>
            </SystemMessage>
          ),
        },
      ]);
    }
  }, [transactionHash]);

  return (
    <>
      <div className='max-w-md mx-auto flex w-full items-center space-x-2'>
        <Input
          value={currentAmount}
          type='number'
          onChange={(e) => setCurrentAmount(e.target.value)}
          className='flex w-full'
        />
        <Button
          onClick={() => {
            mintToken();
          }}
          disabled={+currentAmount <= 0}
        >
          Mint
        </Button>
      </div>

      {/* {transactionHash && (
        <div>{`https://goerli.lineascan.build/tx/${transactionHash.transactionHash}`}</div>
      )} */}
    </>
  );
}

export default MintTokenComponent;
